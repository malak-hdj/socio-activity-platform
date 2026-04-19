<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    public function index()
    {
        $activites = Activite::all();
        return response()->json($activites);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:200',
            'description' => 'nullable|string',
            'categorie' => 'required|in:SPORT,FAMILLE,SEJOUR,NATURE,SPIRITUEL,VOYAGE,LOISIR',
            'statut' => 'required|in:OPEN,COMING_SOON,FULL,TERMINEE,ANNULEE',
        ]);

        $activite = Activite::create($validated);
        return response()->json($activite, 201);
    }

    public function show(string $id)
    {
        $activite = Activite::findOrFail($id);
        return response()->json($activite);
    }

    public function showBySlug(string $slug)
    {
        try {
            $activite = Activite::where('slug', $slug)
                ->orWhere('titre', 'like', '%' . $slug . '%')
                ->firstOrFail();
            
            return response()->json($activite);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Activité non trouvée'], 404);
        }
    }

    public function showByCategorie(string $categorie)
    {
        try {
            $activites = Activite::where('categorie', strtoupper($categorie))
                ->where('statut', '!=', 'ANNULEE')
                ->get();
            
            if ($activites->isEmpty()) {
                return response()->json(['message' => 'Aucune activité trouvée pour cette catégorie'], 404);
            }

            return response()->json($activites);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        $activite = Activite::findOrFail($id);
        $validated = $request->validate([
            'titre' => 'sometimes|string|max:200',
            'statut' => 'sometimes|in:OPEN,COMING_SOON,FULL,TERMINEE,ANNULEE',
        ]);

        $activite->update($validated);
        return response()->json($activite);
    }

    public function destroy(string $id)
    {
        $activite = Activite::findOrFail($id);
        $activite->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
