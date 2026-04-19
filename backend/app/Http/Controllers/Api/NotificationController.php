<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // Lister les notifications de l'utilisateur
    public function index(Request $request)
    {
        $notifications = Notification::where('id_utilisateur', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }

    // Créer une notification
    public static function creer($idUtilisateur, $titre, $message, $type = 'info', $lien = null)
    {
        return Notification::create([
            'id_utilisateur' => $idUtilisateur,
            'titre' => $titre,
            'message' => $message,
            'type' => $type,
            'lien' => $lien,
            'lu' => false,
        ]);
    }

    // Obtenir les notifications non lues
    public function nonLues(Request $request)
    {
        $notifications = Notification::where('id_utilisateur', $request->user()->id)
            ->where('lu', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }

    // Marquer une notification comme lue
    public function lue(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);

        if ($notification->id_utilisateur !== $request->user()->id) {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $notification->update([
            'lu' => true,
            'date_lecture' => now(),
        ]);

        return response()->json($notification);
    }

    // Marquer toutes les notifications comme lues
    public function toutesLues(Request $request)
    {
        Notification::where('id_utilisateur', $request->user()->id)
            ->where('lu', false)
            ->update(['lu' => true, 'date_lecture' => now()]);

        return response()->json(['message' => 'Toutes les notifications marquées comme lues']);
    }

    // Supprimer une notification
    public function destroy(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);

        if ($notification->id_utilisateur !== $request->user()->id) {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $notification->delete();

        return response()->json(['message' => 'Notification supprimée']);
    }

    // Supprimer toutes les notifications
    public function toutesSupprimer(Request $request)
    {
        Notification::where('id_utilisateur', $request->user()->id)->delete();

        return response()->json(['message' => 'Toutes les notifications supprimées']);
    }

    // Envoyer une notification en masse (Admin only)
    public function enMasse(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $request->validate([
            'titre' => 'required|string',
            'message' => 'required|string',
            'type' => 'required|in:info,warning,success,error,reminder',
            'utilisateurs_ids' => 'required|array',
        ]);

        $count = 0;
        foreach ($request->utilisateurs_ids as $userId) {
            $this->creer($userId, $request->titre, $request->message, $request->type);
            $count++;
        }

        return response()->json(['message' => "$count notifications envoyées"]);
    }
}
