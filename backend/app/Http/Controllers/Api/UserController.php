<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(20);
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:utilisateur',
            'matricule' => 'required|unique:utilisateur',
        ]);

        $user = User::create($validated);
        return response()->json($user, 201);
    }

    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function profile()
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json(['message' => 'Non authentifié'], 401);
            }

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json(['message' => 'Non authentifié'], 401);
            }

            $validated = $request->validate([
                'nom' => 'sometimes|string|max:100',
                'prenom' => 'sometimes|string|max:100',
                'email' => 'sometimes|email|unique:utilisateur,email,' . $user->id,
                'adresse' => 'sometimes|string|max:255',
                'numero_securite_soc' => 'sometimes|string|max:50',
            ]);

            $user->update($validated);

            return response()->json([
                'message' => 'Profil mis à jour',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy(string $id)
    {
        User::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
