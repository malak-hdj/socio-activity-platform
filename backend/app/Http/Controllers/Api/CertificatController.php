<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificat;
use Illuminate\Http\Request;

class CertificatController extends Controller
{
    // Lister les certificats
    public function index(Request $request)
    {
        $query = Certificat::with(['utilisateur', 'activite']);

        if ($request->user()->role === 'user') {
            $query->where('id_utilisateur', $request->user()->id);
        }

        $certificats = $query->get();
        return response()->json($certificats);
    }

    // Créer un certificat
    public function store(Request $request)
    {
        $request->validate([
            'id_utilisateur' => 'required|exists:utilisateur,id',
            'id_activite' => 'required|exists:activites,id',
            'numero_certificat' => 'required|unique:certificats',
            'contenu' => 'sometimes|string',
        ]);

        $certificat = Certificat::create([
            'id_utilisateur' => $request->id_utilisateur,
            'id_activite' => $request->id_activite,
            'numero_certificat' => $request->numero_certificat,
            'date_emission' => now(),
            'contenu' => $request->contenu,
            'statut' => 'genere',
        ]);

        return response()->json($certificat, 201);
    }

    // Afficher un certificat
    public function show($id)
    {
        $certificat = Certificat::with(['utilisateur', 'activite'])->findOrFail($id);
        return response()->json($certificat);
    }

    // Mettre à jour un certificat
    public function update(Request $request, $id)
    {
        $request->validate([
            'statut' => 'sometimes|in:genere,signe,archive,valide',
            'chemin_fichier' => 'sometimes|string',
        ]);

        $certificat = Certificat::findOrFail($id);
        $certificat->update($request->only(['statut', 'chemin_fichier']));

        return response()->json($certificat);
    }

    // Supprimer un certificat
    public function destroy($id)
    {
        $certificat = Certificat::findOrFail($id);
        $certificat->delete();

        return response()->json(['message' => 'Certificat supprimé']);
    }

    // Obtenir les certificats d'un utilisateur
    public function parUtilisateur($userId)
    {
        $certificats = Certificat::where('id_utilisateur', $userId)
            ->with('activite')
            ->get();

        return response()->json($certificats);
    }

    // Générer un certificat (marqué comme généré)
    public function generer(Request $request, $id)
    {
        $certificat = Certificat::findOrFail($id);
        $certificat->update(['statut' => 'genere']);

        return response()->json(['message' => 'Certificat généré', 'certificat' => $certificat]);
    }
}
