<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistoriqueStatutInscription;
use Illuminate\Http\Request;

class HistoriqueStatutInscriptionController extends Controller
{
    // Lister l'historique d'une inscription
    public function index(Request $request, $inscriptionId)
    {
        $historique = HistoriqueStatutInscription::where('id_inscription', $inscriptionId)
            ->with('modifier')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($historique);
    }

    // Ajouter une entrée d'historique
    public function store(Request $request)
    {
        $request->validate([
            'id_inscription' => 'required|exists:inscriptions,id',
            'ancien_statut' => 'sometimes|in:en_attente,confirmee,annulee,rejetee',
            'nouveau_statut' => 'required|in:en_attente,confirmee,annulee,rejetee',
            'raison' => 'sometimes|string',
        ]);

        $historique = HistoriqueStatutInscription::create([
            'id_inscription' => $request->id_inscription,
            'ancien_statut' => $request->ancien_statut,
            'nouveau_statut' => $request->nouveau_statut,
            'raison' => $request->raison,
            'modifie_par' => $request->user()?->id,
        ]);

        return response()->json($historique, 201);
    }

    // Obtenir l'historique par utilisateur et activité
    public function parUtilisateurActivite($userId, $activiteId)
    {
        $historique = HistoriqueStatutInscription::whereHas('inscription', function ($query) use ($userId, $activiteId) {
            $query->where('id_utilisateur', $userId)
                  ->where('id_activite', $activiteId);
        })->orderBy('created_at', 'desc')->get();

        return response()->json($historique);
    }
}
