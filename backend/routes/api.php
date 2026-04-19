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
use App\Http\Controllers\Api\ChoixSiteController;
use App\Http\Controllers\Api\ResultatTirageController;
use App\Http\Controllers\Api\TirageAuSortController;
use App\Http\Controllers\Api\HistoriqueStatutInscriptionController;
use App\Http\Controllers\Api\ParticipationController;
use App\Http\Controllers\Api\CertificatController;
use App\Http\Controllers\Api\RemplacementSuppleantController;
use App\Http\Controllers\Api\NoteOfficielController;
use App\Http\Controllers\Api\AuditLogController;
use App\Http\Controllers\Api\SondageController;
use App\Http\Controllers\Api\ReponseSondageController;
use App\Http\Controllers\Api\IdeeController;
use App\Http\Controllers\Api\NotificationController;

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
        Route::post('/lancer/{activiteId}', [TirageAuSortController::class, 'lancer']);
        Route::get('/resultats/{activiteId}', [TirageAuSortController::class, 'index']);
        Route::post('/confirmer-gagnants/{activiteId}', [TirageAuSortController::class, 'confirmerGagnants']);
    });

    // Choix de sites
    Route::apiResource('choix-sites', ChoixSiteController::class);
    Route::get('/choix-sites/activite/{activiteId}', [ChoixSiteController::class, 'sitesDisponibles']);

    // Résultats de tirage
    Route::apiResource('resultat-tirages', ResultatTirageController::class);
    Route::get('/resultat-tirages/activite/{activiteId}', [ResultatTirageController::class, 'parActivite']);
    Route::post('/resultat-tirages/{id}/confirmer', [ResultatTirageController::class, 'confirmer']);

    // Historique des statuts d'inscription
    Route::prefix('historique-statuts')->group(function () {
        Route::get('/inscription/{inscriptionId}', [HistoriqueStatutInscriptionController::class, 'index']);
        Route::post('/', [HistoriqueStatutInscriptionController::class, 'store']);
        Route::get('/utilisateur/{userId}/activite/{activiteId}', [HistoriqueStatutInscriptionController::class, 'parUtilisateurActivite']);
    });

    // Participations
    Route::apiResource('participations', ParticipationController::class);
    Route::get('/participations/utilisateur/{userId}', [ParticipationController::class, 'parUtilisateur']);
    Route::get('/participations/activite/{activiteId}', [ParticipationController::class, 'parActivite']);

    // Certificats
    Route::apiResource('certificats', CertificatController::class);
    Route::get('/certificats/utilisateur/{userId}', [CertificatController::class, 'parUtilisateur']);
    Route::post('/certificats/{id}/generer', [CertificatController::class, 'generer']);

    // Remplacements de suppléants
    Route::apiResource('remplacements-suppleants', RemplacementSuppleantController::class);
    Route::post('/remplacements-suppleants/{id}/confirmer', [RemplacementSuppleantController::class, 'confirmer']);
    Route::get('/remplacements-suppleants/activite/{activiteId}', [RemplacementSuppleantController::class, 'parActivite']);

    // Notes officielles
    Route::apiResource('notes-officielles', NoteOfficielController::class);
    Route::get('/notes-officielles/categorie/{categorie}', [NoteOfficielController::class, 'parCategorie']);

    // Audit logs (Admin only)
    Route::middleware('admin')->prefix('audit-logs')->group(function () {
        Route::get('/', [AuditLogController::class, 'index']);
        Route::get('/{id}', [AuditLogController::class, 'show']);
        Route::get('/modele/{modele}/{idModele}', [AuditLogController::class, 'parModele']);
        Route::get('/utilisateur/{userId}', [AuditLogController::class, 'parUtilisateur']);
    });

    // Sondages
    Route::apiResource('sondages', SondageController::class);
    Route::get('/sondages/en-cours', [SondageController::class, 'enCours']);

    // Réponses aux sondages
    Route::post('/sondages/{sondageId}/repondre', [ReponseSondageController::class, 'store']);
    Route::get('/sondages/{sondageId}/reponses', [ReponseSondageController::class, 'sondage']);
    Route::get('/mes-reponses', [ReponseSondageController::class, 'utilisateur']);
    Route::put('/reponses-sondages/{id}', [ReponseSondageController::class, 'update']);
    Route::delete('/reponses-sondages/{id}', [ReponseSondageController::class, 'destroy']);

    // Idées
    Route::apiResource('idees', IdeeController::class);
    Route::post('/idees/{id}/liker', [IdeeController::class, 'liker']);
    Route::post('/idees/{id}/changer-statut', [IdeeController::class, 'changerStatut']);

    // Notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/non-lues', [NotificationController::class, 'nonLues']);
        Route::post('/{id}/lue', [NotificationController::class, 'lue']);
        Route::post('/marquer-tout-lu', [NotificationController::class, 'toutesLues']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
        Route::delete('/', [NotificationController::class, 'toutesSupprimer']);
        Route::post('/en-masse', [NotificationController::class, 'enMasse']);
    });
    
});

// Route de santé (pour vérifier que l'API est active)
Route::get('/health', function () {
    return response()->json(['status' => 'API is running', 'timestamp' => now()]);
});
