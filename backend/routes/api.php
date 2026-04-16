<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ActiviteController;
use App\Http\Controllers\Api\InscriptionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TirageController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes d'authentification (publiques)
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

// Routes protégées (nécessite authentification)
Route::middleware('auth:sanctum')->group(function () {
    
    // Activités
    Route::apiResource('activites', ActiviteController::class);
    Route::get('/activites/slug/{slug}', [ActiviteController::class, 'showBySlug']);
    Route::get('/activites/categorie/{categorie}', [ActiviteController::class, 'showByCategorie']);
    
    // Inscriptions
    Route::apiResource('inscriptions', InscriptionController::class);
    Route::get('/inscriptions/utilisateur/{userId}', [InscriptionController::class, 'userInscriptions']);
    Route::post('/inscriptions/{id}/confirmer', [InscriptionController::class, 'confirmer']);
    Route::post('/inscriptions/{id}/annuler', [InscriptionController::class, 'annuler']);
    
    // Utilisateurs
    Route::apiResource('users', UserController::class);
    Route::get('/users/me/profile', [UserController::class, 'profile']);
    Route::put('/users/me/profile', [UserController::class, 'updateProfile']);
    
    // Tirage au sort (Admin only)
    Route::prefix('tirage')->group(function () {
        Route::post('/lancer/{activiteId}', [TirageController::class, 'lancer']);
        Route::get('/resultats/{activiteId}', [TirageController::class, 'resultats']);
        Route::post('/confirmer-gagnants/{activiteId}', [TirageController::class, 'confirmerGagnants']);
    });
    
    // Documents
    Route::apiResource('documents', DocumentController::class);
    Route::post('/documents/upload', [DocumentController::class, 'upload']);
    Route::get('/documents/activite/{activiteId}', [DocumentController::class, 'getByActivite']);
    Route::post('/documents/{id}/valider', [DocumentController::class, 'valider']); // Admin only
    
    // Dashboard
    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'getStats']);
        Route::get('/participation-history', [DashboardController::class, 'participationHistory']);
        Route::get('/documents-status', [DashboardController::class, 'documentsStatus']);
        Route::get('/surveys', [DashboardController::class, 'surveys']);
        Route::get('/ideas', [DashboardController::class, 'ideas']);
        Route::post('/ideas', [DashboardController::class, 'submitIdea']);
        Route::get('/announcements', [DashboardController::class, 'announcements']);
    });
    
});

// Route de santé (pour vérifier que l'API est active)
Route::get('/health', function () {
    return response()->json(['status' => 'API is running', 'timestamp' => now()]);
});
