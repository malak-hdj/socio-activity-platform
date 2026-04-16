# Script pour créer tous les Models Laravel
cd "c:\Users\HP\Desktop\socio-activity-platform\backend"

# Créer les Models avec -m (migration) et -c (controller) flags
php artisan make:model Models/Activite -m
php artisan make:model Models/DocumentRequis -m
php artisan make:model Models/Site -m
php artisan make:model Models/Session -m
php artisan make:model Models/SessionSite -m
php artisan make:model Models/Inscription -m
php artisan make:model Models/HistoriqueStatutInscription -m
php artisan make:model Models/ChoixSite -m
php artisan make:model Models/TirageAuSort -m
php artisan make:model Models/ResultatTirage -m
php artisan make:model Models/RemplacementSuppleant -m
php artisan make:model Models/Document -m
php artisan make:model Models/Participation -m
php artisan make:model Models/Certificat -m
php artisan make:model Models/NoteOfficiel -m
php artisan make:model Models/Sondage -m
php artisan make:model Models/ReponseSondage -m
php artisan make:model Models/Idee -m
php artisan make:model Models/Notification -m
php artisan make:model Models/AuditLog -m

# Créer les Controllers
php artisan make:controller Api/AuthController
php artisan make:controller Api/ActiviteController --resource
php artisan make:controller Api/InscriptionController --resource
php artisan make:controller Api/UserController --resource
php artisan make:controller Api/TirageController
php artisan make:controller Api/DocumentController --resource
php artisan make:controller Api/DashboardController
