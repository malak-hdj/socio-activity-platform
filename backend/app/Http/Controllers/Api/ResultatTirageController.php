<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResultatTirage;
use App\Models\TirageAuSort;
use Illuminate\Http\Request;

class ResultatTirageController extends Controller
{
    // Lister les résultats de tirage
    public function index()
    {
        $resultats = ResultatTirage::with(['tirage', 'utilisateur', 'activite'])->get();
        return response()->json($resultats);
    }

    // Créer un résultat de tirage (utilisé lors du tirage)
    public function store(Request $request)
    {
        $request->validate([
            'id_tirage_au_sort' => 'required|exists:tirage_au_sorts,id',
            'id_utilisateur' => 'required|exists:utilisateur,id',
            'id_activite' => 'required|exists:activites,id',
            'statut' => 'required|in:gagnant,suppleant,perdant,retire',
        ]);

        $resultat = ResultatTirage::create($request->all());

        return response()->json($resultat, 201);
    }

    // Afficher un résultat de tirage
    public function show($id)
    {
        $resultat = ResultatTirage::with(['tirage', 'utilisateur', 'activite'])->findOrFail($id);
        return response()->json($resultat);
    }

    // Mettre à jour un résultat
    public function update(Request $request, $id)
    {
        $request->validate([
            'statut' => 'sometimes|in:gagnant,suppleant,perdant,retire',
            'confirme' => 'sometimes|boolean',
        ]);

        $resultat = ResultatTirage::findOrFail($id);
        $resultat->update($request->only(['statut', 'confirme', 'date_confirmation']));

        return response()->json($resultat);
    }

    // Supprimer un résultat
    public function destroy($id)
    {
        $resultat = ResultatTirage::findOrFail($id);
        $resultat->delete();

        return response()->json(['message' => 'Résultat supprimé']);
    }

    // Confirmer un résultat (utilisateur accepte/refuse)
    public function confirmer(Request $request, $id)
    {
        $resultat = ResultatTirage::findOrFail($id);
        $resultat->update([
            'confirme' => true,
            'date_confirmation' => now(),
        ]);

        return response()->json(['message' => 'Résultat confirmé', 'resultat' => $resultat]);
    }

    // Obtenir les résultats pour une activité
    public function parActivite($activiteId)
    {
        $resultats = ResultatTirage::where('id_activite', $activiteId)
            ->with(['utilisateur', 'tirage'])
            ->get();

        return response()->json($resultats);
    }
}
