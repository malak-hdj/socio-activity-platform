<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sondage;
use Illuminate\Http\Request;

class SondageController extends Controller
{
    // Lister les sondages
    public function index()
    {
        $sondages = Sondage::with('activite')->get();
        return response()->json($sondages);
    }

    // Créer un sondage (Admin only)
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'required|in:choix_multiples,choix_unique,texte_libre,evaluation',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'options' => 'sometimes|array',
        ]);

        $sondage = Sondage::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'id_activite' => $request->id_activite,
            'type' => $request->type,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'anonyme' => $request->anonyme ?? true,
            'options' => json_encode($request->options ?? []),
        ]);

        return response()->json($sondage, 201);
    }

    // Afficher un sondage
    public function show($id)
    {
        $sondage = Sondage::with(['activite', 'reponses'])->findOrFail($id);
        return response()->json($sondage);
    }

    // Mettre à jour un sondage
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $sondage = Sondage::findOrFail($id);
        $sondage->update($request->only(['titre', 'description', 'date_fin']));

        return response()->json($sondage);
    }

    // Supprimer un sondage
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $sondage = Sondage::findOrFail($id);
        $sondage->delete();

        return response()->json(['message' => 'Sondage supprimé']);
    }

    // Obtenir les sondages en cours
    public function enCours()
    {
        $sondages = Sondage::where('date_debut', '<=', now())
            ->where('date_fin', '>=', now())
            ->with('activite')
            ->get();

        return response()->json($sondages);
    }
}
