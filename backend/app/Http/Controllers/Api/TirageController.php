<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResultatTirage;
use App\Models\TirageAuSort;
use App\Models\Activite;
use App\Models\Inscription;
use Illuminate\Http\Request;

class TirageController extends Controller
{
    /**
     * Lance un tirage au sort pour une activité
     */
    public function lancer(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_activite' => 'required|exists:activites,id',
                'nombre_gagants' => 'required|integer|min:1',
            ]);

            $activite = Activite::findOrFail($validated['id_activite']);
            
            // Vérifier que l'activité a le tirage activé
            if (!$activite->tirage) {
                return response()->json([
                    'message' => 'Le tirage n\'est pas activé pour cette activité'
                ], 422);
            }

            // Créer le tirage
            $tirage = TirageAuSort::create([
                'id_activite' => $validated['id_activite'],
                'date_tirage' => now(),
                'nombre_gagnants' => $validated['nombre_gagants'],
                'statut' => 'en_cours',
            ]);

            // Récupérer les inscriptions confirmées
            $inscriptions = Inscription::where('id_activite', $validated['id_activite'])
                ->where('statut', 'confirmee')
                ->inRandomOrder()
                ->limit($validated['nombre_gagants'])
                ->get();

            // Créer les résultats
            foreach ($inscriptions as $inscription) {
                ResultatTirage::create([
                    'id_tirage' => $tirage->id,
                    'id_inscription' => $inscription->id,
                    'id_utilisateur' => $inscription->id_utilisateur,
                    'statut' => 'gagnant',
                ]);
            }

            return response()->json([
                'message' => 'Tirage lancé avec succès',
                'tirage' => $tirage->load('resultats'),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du tirage: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupère les résultats du tirage
     */
    public function resultats(Request $request, $tirageId)
    {
        try {
            $tirage = TirageAuSort::with('resultats.utilisateur')
                ->findOrFail($tirageId);

            return response()->json([
                'tirage' => $tirage,
                'resultats' => $tirage->resultats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Tirage non trouvé: ' . $e->getMessage()
            ], 404);
        }
    }

    /**
     * Confirme les gagnants du tirage
     */
    public function confirmerGagnants(Request $request, $tirageId)
    {
        try {
            $tirage = TirageAuSort::findOrFail($tirageId);

            // Vérifier que le tirage est en cours
            if ($tirage->statut !== 'en_cours') {
                return response()->json([
                    'message' => 'Le tirage n\'est pas en cours'
                ], 422);
            }

            // Mettre à jour le statut du tirage
            $tirage->update([
                'statut' => 'confirme',
                'date_confirmation' => now(),
            ]);

            // Mettre à jour les résultats
            ResultatTirage::where('id_tirage', $tirageId)
                ->update(['statut' => 'confirme']);

            return response()->json([
                'message' => 'Gagnants confirmés avec succès',
                'tirage' => $tirage->fresh(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la confirmation: ' . $e->getMessage()
            ], 500);
        }
    }
}

