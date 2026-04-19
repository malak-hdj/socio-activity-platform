<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Idee;
use Illuminate\Http\Request;

class IdeeController extends Controller
{
    // Lister les idées
    public function index(Request $request)
    {
        $query = Idee::with('utilisateur');

        if ($request->categorie) {
            $query->where('categorie', $request->categorie);
        }

        if ($request->statut) {
            $query->where('statut', $request->statut);
        }

        $idees = $query->orderBy('likes', 'desc')->get();
        return response()->json($idees);
    }

    // Soumettre une idée
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie' => 'required|in:activite,site,processus,autre',
            'justification' => 'sometimes|string',
        ]);

        $idee = Idee::create([
            'id_utilisateur' => $request->user()->id,
            'titre' => $request->titre,
            'description' => $request->description,
            'justification' => $request->justification,
            'categorie' => $request->categorie,
            'statut' => 'soumise',
        ]);

        return response()->json($idee, 201);
    }

    // Afficher une idée
    public function show($id)
    {
        $idee = Idee::with('utilisateur')->findOrFail($id);
        return response()->json($idee);
    }

    // Mettre à jour une idée
    public function update(Request $request, $id)
    {
        $idee = Idee::findOrFail($id);

        if ($idee->id_utilisateur !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $idee->update($request->only(['titre', 'description', 'justification']));

        return response()->json($idee);
    }

    // Supprimer une idée
    public function destroy(Request $request, $id)
    {
        $idee = Idee::findOrFail($id);

        if ($idee->id_utilisateur !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $idee->delete();

        return response()->json(['message' => 'Idée supprimée']);
    }

    // Liker une idée
    public function liker($id)
    {
        $idee = Idee::findOrFail($id);
        $idee->increment('likes');

        return response()->json(['message' => 'Idée likée', 'likes' => $idee->likes]);
    }

    // Changer le statut d'une idée (Admin only)
    public function changerStatut(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $request->validate([
            'statut' => 'required|in:soumise,en_cours_examen,acceptee,rejetee',
            'commentaires_admin' => 'sometimes|string',
        ]);

        $idee = Idee::findOrFail($id);
        $idee->update($request->only(['statut', 'commentaires_admin']));

        return response()->json($idee);
    }
}
