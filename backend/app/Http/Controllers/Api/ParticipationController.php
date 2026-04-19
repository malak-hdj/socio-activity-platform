<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participation;
use Illuminate\Http\Request;

class ParticipationController extends Controller
{
    // Lister les participations
    public function index(Request $request)
    {
        $query = Participation::with(['utilisateur', 'activite']);

        if ($request->user()->role === 'user') {
            $query->where('id_utilisateur', $request->user()->id);
        }

        $participations = $query->get();
        return response()->json($participations);
    }

    // Enregistrer une participation
    public function store(Request $request)
    {
        $request->validate([
            'id_activite' => 'required|exists:activites,id',
            'statut' => 'required|in:en_attente,participee,annulee,excusee',
            'feedback' => 'sometimes|string',
            'notation' => 'sometimes|integer|min:1|max:5',
        ]);

        $participation = Participation::firstOrCreate(
            ['id_utilisateur' => $request->user()->id, 'id_activite' => $request->id_activite],
            $request->all() + ['id_utilisateur' => $request->user()->id]
        );

        return response()->json($participation, 201);
    }

    // Mettre à jour une participation
    public function update(Request $request, $id)
    {
        $request->validate([
            'statut' => 'sometimes|in:en_attente,participee,annulee,excusee',
            'feedback' => 'sometimes|string',
            'notation' => 'sometimes|integer|min:1|max:5',
        ]);

        $participation = Participation::findOrFail($id);
        $participation->update($request->only(['statut', 'feedback', 'notation', 'observations']));

        return response()->json($participation);
    }

    // Supprimer une participation
    public function destroy($id)
    {
        $participation = Participation::findOrFail($id);
        $participation->delete();

        return response()->json(['message' => 'Participation supprimée']);
    }

    // Obtenir les participations d'un utilisateur
    public function parUtilisateur($userId)
    {
        $participations = Participation::where('id_utilisateur', $userId)
            ->with('activite')
            ->get();

        return response()->json($participations);
    }

    // Obtenir les participations à une activité
    public function parActivite($activiteId)
    {
        $participations = Participation::where('id_activite', $activiteId)
            ->with('utilisateur')
            ->get();

        return response()->json($participations);
    }
}
