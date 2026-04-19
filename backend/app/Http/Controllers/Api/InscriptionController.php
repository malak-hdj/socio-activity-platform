<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
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
            'id_activite' => 'required|exists:activites,id',
        ]);

        $inscription = Inscription::create([
            'id_utilisateur' => auth()->id(),
            'id_activite' => $validated['id_activite'],
            'statut' => 'en_attente',
        ]);

        return response()->json($inscription, 201);
    }

    public function show(string $id)
    {
        $inscription = Inscription::with('activite')->findOrFail($id);
        return response()->json($inscription);
    }

    public function userInscriptions()
    {
        try {
            $inscriptions = Inscription::where('id_utilisateur', auth()->id())
                ->with('activite')
                ->orderByDesc('date_inscription')
                ->get();

            return response()->json($inscriptions);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function confirmer(Request $request, $inscriptionId)
    {
        try {
            $inscription = Inscription::findOrFail($inscriptionId);

            if ($inscription->statut === 'confirmee') {
                return response()->json(['message' => 'Inscription déjà confirmée'], 422);
            }

            $inscription->update([
                'statut' => 'confirmee',
                'date_confirmation' => now(),
            ]);

            return response()->json([
                'message' => 'Inscription confirmée',
                'inscription' => $inscription,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function annuler(Request $request, $inscriptionId)
    {
        try {
            $inscription = Inscription::findOrFail($inscriptionId);

            if ($inscription->statut === 'annulee') {
                return response()->json(['message' => 'Inscription déjà annulée'], 422);
            }

            $inscription->update([
                'statut' => 'annulee',
            ]);

            return response()->json([
                'message' => 'Inscription annulée',
                'inscription' => $inscription,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
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
