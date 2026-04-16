<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login utilisateur
     */
    public function login(Request $request)
    {
        $request->validate([
            'matricule' => 'required|string',
            'mot_de_passe' => 'required|string',
        ]);

        $user = User::where('matricule', $request->matricule)->first();

        if (!$user || !Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'matricule' => ['Identifiants invalides.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Register nouvel utilisateur
     */
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:utilisateur',
            'matricule' => 'required|unique:utilisateur',
            'mot_de_passe' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'matricule' => $request->matricule,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'role' => 'EMPLOYE',
            'actif' => true,
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Logout utilisateur
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    /**
     * Récupérer les infos de l'utilisateur connecté
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}

