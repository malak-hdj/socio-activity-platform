<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Models\Activite;
use App\Models\Models\Site;
use App\Models\Models\Session;
use App\Models\Models\DocumentRequis;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un utilisateur admin (s'il n'existe pas)
        User::firstOrCreate(
            ['email' => 'admin@sonatrach.dz'],
            [
                'nom' => 'Admin',
                'prenom' => 'Sonatrach',
                'matricule' => 'ADM001',
                'mot_de_passe' => Hash::make('password123'),
                'role' => 'ADMIN',
                'actif' => true,
            ]
        );

        // Créer des utilisateurs employés
        for ($i = 1; $i <= 5; $i++) {
            User::firstOrCreate(
                ['email' => "employe$i@sonatrach.dz"],
                [
                    'nom' => "Employé",
                    'prenom' => "Test $i",
                    'matricule' => "EMP00$i",
                    'mot_de_passe' => Hash::make('password123'),
                    'role' => 'EMPLOYE',
                    'actif' => true,
                ]
            );
        }

        // Créer les activités s'il n'y en a pas
        if (Activite::count() < 5) {
            $activites = [
                [
                    'titre' => 'Running',
                    'description' => 'Course à pied annuelle pour les employés Sonatrach',
                    'categorie' => 'SPORT',
                    'statut' => 'OPEN',
                    'tirage' => true,
                    'niveau_demande' => 'HIGH',
                ],
                [
                    'titre' => 'Summer Camp',
                    'description' => 'Camp d\'été pour les enfants des employés',
                    'categorie' => 'FAMILLE',
                    'statut' => 'OPEN',
                    'tirage' => true,
                    'niveau_demande' => 'HIGH',
                ],
                [
                    'titre' => 'Bungalow Stay',
                    'description' => 'Séjour au bungalow bord de mer',
                    'categorie' => 'SEJOUR',
                    'statut' => 'OPEN',
                    'tirage' => true,
                    'niveau_demande' => 'MEDIUM',
                ],
                [
                    'titre' => 'Camping',
                    'description' => 'Camping en pleine nature',
                    'categorie' => 'NATURE',
                    'statut' => 'OPEN',
                    'tirage' => true,
                    'niveau_demande' => 'LOW',
                ],
                [
                    'titre' => 'Omra',
                    'description' => 'Petit pèlerinage à La Mecque',
                    'categorie' => 'SPIRITUEL',
                    'statut' => 'COMING_SOON',
                    'tirage' => true,
                    'niveau_demande' => 'HIGH',
                ],
            ];

            foreach ($activites as $activiteData) {
                $activite = Activite::create($activiteData);

                // Ajouter des sites
                Site::create([
                    'id_activite' => $activite->id,
                    'site' => 'Alger',
                    'nb_suppliants' => 2,
                ]);

                Site::create([
                    'id_activite' => $activite->id,
                    'site' => 'Oran',
                    'nb_suppliants' => 2,
                ]);

                // Ajouter une session
                Session::create([
                    'id_activite' => $activite->id,
                    'date_debut' => now()->addMonths(2),
                    'date_fin' => now()->addMonths(2)->addDays(5),
                    'date_tirage' => now()->addMonths(1),
                ]);

                // Ajouter des documents requis
                DocumentRequis::create([
                    'id_activite' => $activite->id,
                    'type_document' => 'Certificat médical',
                    'description' => 'Certificat d\'aptitude sportive de moins de 3 mois',
                    'obligatoire' => true,
                ]);

                DocumentRequis::create([
                    'id_activite' => $activite->id,
                    'type_document' => 'Pièce d\'identité',
                    'description' => 'CNI ou passeport valide',
                    'obligatoire' => true,
                ]);
            }
        }
    }
}

