<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Document;
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
            'id_activite' => 'required|exists:activite,id',
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
