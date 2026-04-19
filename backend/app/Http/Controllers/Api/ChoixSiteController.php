<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChoixSite;
use App\Models\Site;
use App\Models\Activite;
use Illuminate\Http\Request;

class ChoixSiteController extends Controller
{
    // Lister les choix de sites d'un utilisateur
    public function index(Request $request)
    {
        $choix = ChoixSite::where('id_utilisateur', $request->user()->id)->get();
        return response()->json($choix);
    }

    // Créer un choix de site
    public function store(Request $request)
    {
        $request->validate([
            'id_activite' => 'required|exists:activites,id',
            'preferences' => 'required|array',
        ]);

        $choix = ChoixSite::create([
            'id_utilisateur' => $request->user()->id,
            'id_activite' => $request->id_activite,
            'preferences' => json_encode($request->preferences),
            'statut' => 'en_attente',
            'date_choix' => now(),
        ]);

        return response()->json($choix, 201);
    }

    // Afficher un choix de site
    public function show($id)
    {
        $choix = ChoixSite::findOrFail($id);
        return response()->json($choix);
    }

    // Mettre à jour un choix de site
    public function update(Request $request, $id)
    {
        $request->validate([
            'preferences' => 'sometimes|array',
            'statut' => 'sometimes|in:en_attente,attribuee,refusee',
        ]);

        $choix = ChoixSite::findOrFail($id);
        $choix->update($request->only(['preferences', 'statut']));

        return response()->json($choix);
    }

    // Supprimer un choix de site
    public function destroy($id)
    {
        $choix = ChoixSite::findOrFail($id);
        $choix->delete();

        return response()->json(['message' => 'Choix supprimé']);
    }

    // Obtenir les sites disponibles pour une activité
    public function sitesDisponibles($activiteId)
    {
        $sites = Site::whereHas('sessionSites', function ($query) use ($activiteId) {
            $query->where('id_session', function ($subquery) {
                $subquery->selectRaw('id')->from('sessions')->where('id_activite', $activiteId);
            });
        })->get();

        return response()->json($sites);
    }
}
