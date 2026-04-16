<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Inscription;
use App\Models\Models\Participation;
use App\Models\Models\Document;
use App\Models\Models\Sondage;
use App\Models\Models\Idee;
use App\Models\Models\NoteOfficiel;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats()
    {
        $userId = auth()->id();
        
        return response()->json([
            'total_inscriptions' => Inscription::where('id_utilisateur', $userId)->count(),
            'participations' => Participation::where('id_utilisateur', $userId)->count(),
            'documents_verifies' => Document::where('id_utilisateur', $userId)
                ->where('valide', true)->count(),
            'documents_manquants' => Document::where('id_utilisateur', $userId)
                ->where('valide', false)->count(),
        ]);
    }

    public function participationHistory()
    {
        $participations = Participation::where('id_utilisateur', auth()->id())
            ->with('sessionSite.session.activite')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($participations);
    }

    public function documentsStatus()
    {
        $documents = Document::where('id_utilisateur', auth()->id())
            ->with('activite')
            ->orderBy('date_upload', 'desc')
            ->get();
        return response()->json($documents);
    }

    public function surveys()
    {
        $surveys = Sondage::where('date_fin', '>=', now())
            ->orWhere('date_fin', '=', null)
            ->get();
        return response()->json($surveys);
    }

    public function ideas()
    {
        $ideas = Idee::where('statut', '!=', 'ARCHIVEE')
            ->orderBy('date_soumission', 'desc')
            ->limit(50)
            ->get();
        return response()->json($ideas);
    }

    public function submitIdea(Request $request)
    {
        $validated = $request->validate([
            'contenu' => 'required|string',
            'categorie' => 'required|in:ACTIVITES,SERVICES,COMMUNICATION,WORKPLACE,WELLBEING',
        ]);

        $idea = Idee::create([
            'id_utilisateur' => auth()->id(),
            ...$validated,
        ]);

        return response()->json($idea, 201);
    }

    public function announcements()
    {
        $announcements = NoteOfficiel::where('publie', true)
            ->orderBy('date_publication', 'desc')
            ->limit(10)
            ->get();
        return response()->json($announcements);
    }
}
