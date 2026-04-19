<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NoteOfficiel;
use Illuminate\Http\Request;

class NoteOfficielController extends Controller
{
    // Lister les notes officielles
    public function index(Request $request)
    {
        $query = NoteOfficiel::query();

        if ($request->user()->role === 'user') {
            $query->where('visible_employes', true);
        } else {
            $query->where('visible_admin', true);
        }

        $notes = $query->orderBy('created_at', 'desc')->get();
        return response()->json($notes);
    }

    // Créer une note officielle (Admin only)
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $request->validate([
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
            'categorie' => 'required|in:general,inscriptions,tirage,participation,documents,autre',
            'type' => 'required|in:information,avertissement,erreur,succes',
            'visible_employes' => 'sometimes|boolean',
            'visible_admin' => 'sometimes|boolean',
        ]);

        $note = NoteOfficiel::create([
            'id_utilisateur' => $request->user()->id,
            'titre' => $request->titre,
            'contenu' => $request->contenu,
            'categorie' => $request->categorie,
            'type' => $request->type,
            'visible_employes' => $request->visible_employes ?? true,
            'visible_admin' => $request->visible_admin ?? true,
            'date_effet' => $request->date_effet ?? now(),
        ]);

        return response()->json($note, 201);
    }

    // Afficher une note
    public function show($id)
    {
        $note = NoteOfficiel::findOrFail($id);
        return response()->json($note);
    }

    // Mettre à jour une note (Admin only)
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $request->validate([
            'titre' => 'sometimes|string|max:255',
            'contenu' => 'sometimes|string',
            'categorie' => 'sometimes|in:general,inscriptions,tirage,participation,documents,autre',
        ]);

        $note = NoteOfficiel::findOrFail($id);
        $note->update($request->only(['titre', 'contenu', 'categorie', 'type', 'visible_employes', 'visible_admin']));

        return response()->json($note);
    }

    // Supprimer une note (Admin only)
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $note = NoteOfficiel::findOrFail($id);
        $note->delete();

        return response()->json(['message' => 'Note supprimée']);
    }

    // Obtenir les notes par catégorie
    public function parCategorie($categorie)
    {
        $notes = NoteOfficiel::where('categorie', $categorie)
            ->where('visible_employes', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notes);
    }
}
