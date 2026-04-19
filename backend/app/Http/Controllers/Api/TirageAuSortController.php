<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TirageAuSort;
use App\Models\ResultatTirage;
use App\Models\Inscription;
use Illuminate\Http\Request;

class TirageAuSortController extends Controller
{
    // Lancer un tirage au sort
    public function lancer(Request $request, $activiteId)
    {
        $request->validate([
            'nombre_places' => 'required|integer|min:1',
        ]);

        // Créer l'enregistrement du tirage
        $tirage = TirageAuSort::create([
            'id_activite' => $activiteId,
            'nombre_places' => $request->nombre_places,
            'statut' => 'en_cours',
            'date_tirage' => now(),
            'double_tirage' => $request->double_tirage ?? false,
        ]);

        // Récupérer les inscriptions confirmées
        $inscriptions = Inscription::where('id_activite', $activiteId)
            ->where('statut', 'confirmee')
            ->get();

        $tirage->update(['nombre_participants' => count($inscriptions)]);

        // Effectuer le tirage au sort (aléatoire)
        $gagnants = $inscriptions->random(min($request->nombre_places, count($inscriptions)));
        $suppleants = $inscriptions->whereNotIn('id', $gagnants->pluck('id'))->take($request->nombre_places);

        // Créer les résultats
        foreach ($gagnants as $index => $inscription) {
            ResultatTirage::create([
                'id_tirage_au_sort' => $tirage->id,
                'id_utilisateur' => $inscription->id_utilisateur,
                'id_activite' => $activiteId,
                'statut' => 'gagnant',
                'numero_tirage' => $index + 1,
            ]);
        }

        foreach ($suppleants as $index => $inscription) {
            ResultatTirage::create([
                'id_tirage_au_sort' => $tirage->id,
                'id_utilisateur' => $inscription->id_utilisateur,
                'id_activite' => $activiteId,
                'statut' => 'suppleant',
                'numero_tirage' => $index + 1,
            ]);
        }

        return response()->json([
            'message' => 'Tirage lancé avec succès',
            'tirage' => $tirage,
            'nb_gagnants' => count($gagnants),
            'nb_suppleants' => count($suppleants),
        ]);
    }

    // Confirmer les résultats du tirage
    public function confirmerGagnants(Request $request, $activiteId)
    {
        $tirage = TirageAuSort::where('id_activite', $activiteId)->latest()->first();

        if (!$tirage) {
            return response()->json(['error' => 'Aucun tirage trouvé'], 404);
        }

        // Marquer tous les résultats comme confirmés
        ResultatTirage::where('id_tirage_au_sort', $tirage->id)
            ->whereIn('statut', ['gagnant', 'suppleant'])
            ->update(['confirme' => true, 'date_confirmation' => now()]);

        $tirage->update([
            'statut' => 'valide',
            'date_validation' => now(),
        ]);

        return response()->json([
            'message' => 'Tirage confirmé',
            'tirage' => $tirage,
        ]);
    }

    // Obtenir les tirages d'une activité
    public function index($activiteId = null)
    {
        $query = TirageAuSort::with(['resultats']);

        if ($activiteId) {
            $query->where('id_activite', $activiteId);
        }

        $tirages = $query->get();
        return response()->json($tirages);
    }
}
