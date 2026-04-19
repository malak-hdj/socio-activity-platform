<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditLogController extends Controller
{
    // Lister les logs d'audit (Admin only)
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $query = AuditLog::with('utilisateur')->orderBy('date_action', 'desc');

        if ($request->filtre_model) {
            $query->where('modele', $request->filtre_model);
        }

        if ($request->filtre_action) {
            $query->where('action', $request->filtre_action);
        }

        if ($request->filtre_utilisateur) {
            $query->where('id_utilisateur', $request->filtre_utilisateur);
        }

        $logs = $query->paginate(50);
        return response()->json($logs);
    }

    // Créer un log d'audit
    public static function log($action, $modele, $idModele, $ancienneValeur = null, $nouvelleValeur = null, $utilisateur = null)
    {
        return AuditLog::create([
            'id_utilisateur' => $utilisateur?->id,
            'action' => $action,
            'modele' => $modele,
            'id_modele' => $idModele,
            'ancienne_valeur' => json_encode($ancienneValeur),
            'nouvelle_valeur' => json_encode($nouvelleValeur),
            'date_action' => now(),
        ]);
    }

    // Afficher un log
    public function show(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $log = AuditLog::with('utilisateur')->findOrFail($id);
        return response()->json($log);
    }

    // Obtenir les logs pour un modèle spécifique
    public function parModele(Request $request, $modele, $idModele)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $logs = AuditLog::where('modele', $modele)
            ->where('id_modele', $idModele)
            ->orderBy('date_action', 'desc')
            ->get();

        return response()->json($logs);
    }

    // Obtenir les logs d'un utilisateur
    public function parUtilisateur(Request $request, $userId)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $logs = AuditLog::where('id_utilisateur', $userId)
            ->orderBy('date_action', 'desc')
            ->paginate(50);

        return response()->json($logs);
    }
}
