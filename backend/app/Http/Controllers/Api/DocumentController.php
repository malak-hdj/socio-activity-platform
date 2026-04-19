<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::with('utilisateur', 'activite')->paginate(20);
        return response()->json($documents);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_activite' => 'required|exists:activites,id',
            'id_document_requis' => 'nullable|exists:document_requis,id',
            'nom_fichier' => 'required|string|max:255',
            'type_document' => 'required|string|max:100',
        ]);

        $document = Document::create([
            'id_utilisateur' => auth()->id(),
            ...$validated,
            'chemin_fichier' => 'documents/' . auth()->id() . '/' . $validated['nom_fichier'],
        ]);

        return response()->json($document, 201);
    }

    public function show(string $id)
    {
        $document = Document::with('utilisateur', 'activite')->findOrFail($id);
        return response()->json($document);
    }

    public function upload(Request $request)
    {
        try {
            $validated = $request->validate([
                'file' => 'required|file|max:10240',
                'id_activite' => 'required|exists:activites,id',
                'id_document_requis' => 'nullable|exists:document_requis,id',
            ]);

            $file = $request->file('file');
            $path = 'documents/' . auth()->id() . '/' . time() . '_' . $file->getClientOriginalName();
            $file->storeAs('documents/' . auth()->id(), time() . '_' . $file->getClientOriginalName());

            $document = Document::create([
                'id_utilisateur' => auth()->id(),
                'id_activite' => $validated['id_activite'],
                'id_document_requis' => $validated['id_document_requis'],
                'nom_fichier' => $file->getClientOriginalName(),
                'type_document' => $file->getClientMimeType(),
                'chemin_fichier' => $path,
                'statut' => 'en_attente',
            ]);

            return response()->json([
                'message' => 'Document uploadé avec succès',
                'document' => $document,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function getByActivite($activiteId)
    {
        try {
            $documents = Document::where('id_activite', $activiteId)
                ->with('utilisateur')
                ->get();

            return response()->json($documents);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function valider(Request $request, $documentId)
    {
        try {
            $validated = $request->validate([
                'statut' => 'required|in:approuve,rejete',
                'observations' => 'nullable|string',
            ]);

            $document = Document::findOrFail($documentId);
            $document->update([
                'statut' => $validated['statut'],
                'observations' => $validated['observations'] ?? null,
                'date_validation' => now(),
                'valide_par' => auth()->id(),
            ]);

            return response()->json([
                'message' => 'Document validé',
                'document' => $document,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        $document = Document::findOrFail($id);
        $document->update($request->all());
        return response()->json($document);
    }

    public function destroy(string $id)
    {
        Document::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
