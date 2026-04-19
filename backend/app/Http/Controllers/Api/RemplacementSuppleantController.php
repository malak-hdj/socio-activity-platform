<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RemplacementSuppleant;
use Illuminate\Http\Request;

class RemplacementSuppleantController extends Controller
{
    // Lister les remplacements
    public function index()
    {
        $remplacements = RemplacementSuppleant::with(['titulaire', 'remplacant', 'activite'])->get();
        return response()->json($remplacements);
    }

    // Créer un remplacement
    public function store(Request $request)
    {
        $request->validate([
            'id_utilisateur_titulaire' => 'required|exists:utilisateur,id',
            'id_utilisateur_remplacant' => 'required|exists:utilisateur,id',
            'id_activite' => 'required|exists:activites,id',
            'raison' => 'required|in:retrait_titulaire,promotion_suppleant,autre',
            'motif' => 'sometimes|string',
        ]);

        $remplacement = RemplacementSuppleant::create($request->all());

        return response()->json($remplacement, 201);
    }

    // Afficher un remplacement
    public function show($id)
    {
        $remplacement = RemplacementSuppleant::with(['titulaire', 'remplacant', 'activite'])->findOrFail($id);
        return response()->json($remplacement);
    }

    // Mettre à jour un remplacement
    public function update(Request $request, $id)
    {
        $request->validate([
            'raison' => 'sometimes|in:retrait_titulaire,promotion_suppleant,autre',
            'confirme' => 'sometimes|boolean',
        ]);

        $remplacement = RemplacementSuppleant::findOrFail($id);
        $remplacement->update($request->only(['raison', 'motif', 'confirme']));

        return response()->json($remplacement);
    }

    // Supprimer un remplacement
    public function destroy($id)
    {
        $remplacement = RemplacementSuppleant::findOrFail($id);
        $remplacement->delete();

        return response()->json(['message' => 'Remplacement supprimé']);
    }

    // Confirmer un remplacement
    public function confirmer($id)
    {
        $remplacement = RemplacementSuppleant::findOrFail($id);
        $remplacement->update([
            'confirme' => true,
            'date_remplacement' => now(),
        ]);

        return response()->json(['message' => 'Remplacement confirmé', 'remplacement' => $remplacement]);
    }

    // Obtenir les remplacements d'une activité
    public function parActivite($activiteId)
    {
        $remplacements = RemplacementSuppleant::where('id_activite', $activiteId)
            ->with(['titulaire', 'remplacant'])
            ->get();

        return response()->json($remplacements);
    }
}
