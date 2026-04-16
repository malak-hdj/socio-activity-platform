<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    public function index()
    {
        $inscriptions = Inscription::with('activite')->paginate(15);
        return response()->json($inscriptions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_activite' => 'required|exists:activite,id',
        ]);

        $inscription = Inscription::create([
            'id_utilisateur' => auth()->id(),
            'id_activite' => $validated['id_activite'],
            'statut' => 'EN_ATTENTE',
        ]);

        return response()->json($inscription, 201);
    }

    public function show(string $id)
    {
        $inscription = Inscription::with('activite')->findOrFail($id);
        return response()->json($inscription);
    }

    public function update(Request $request, string $id)
    {
        $inscription = Inscription::findOrFail($id);
        $inscription->update($request->all());
        return response()->json($inscription);
    }

    public function destroy(string $id)
    {
        Inscription::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
