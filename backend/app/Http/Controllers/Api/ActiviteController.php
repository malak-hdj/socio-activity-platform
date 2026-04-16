<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Activite;
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
