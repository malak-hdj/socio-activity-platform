<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ReponseSondage;
use Illuminate\Http\Request;

class ReponseSondageController extends Controller
{
    // Répondre à un sondage
    public function store(Request $request, $sondageId)
    {
        $request->validate([
            'reponse' => 'required',
        ]);

        $reponse = ReponseSondage::create([
            'id_sondage' => $sondageId,
            'id_utilisateur' => $request->user()?->id,
            'reponse' => json_encode($request->reponse),
        ]);

        return response()->json($reponse, 201);
    }

    // Obtenir les réponses d'un sondage
    public function sondage($sondageId)
    {
        $reponses = ReponseSondage::where('id_sondage', $sondageId)->get();
        return response()->json($reponses);
    }

    // Obtenir les réponses d'un utilisateur
    public function utilisateur(Request $request)
    {
        $reponses = ReponseSondage::where('id_utilisateur', $request->user()->id)->get();
        return response()->json($reponses);
    }

    // Mettre à jour une réponse
    public function update(Request $request, $id)
    {
        $request->validate([
            'reponse' => 'required',
        ]);

        $reponse = ReponseSondage::findOrFail($id);
        $reponse->update(['reponse' => json_encode($request->reponse)]);

        return response()->json($reponse);
    }

    // Supprimer une réponse
    public function destroy($id)
    {
        $reponse = ReponseSondage::findOrFail($id);
        $reponse->delete();

        return response()->json(['message' => 'Réponse supprimée']);
    }
}
