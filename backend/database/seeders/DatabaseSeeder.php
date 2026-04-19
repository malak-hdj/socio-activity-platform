<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un utilisateur admin
        User::firstOrCreate(
            ['email' => 'admin@sonatrach.dz'],
            [
                'nom' => 'Admin',
                'prenom' => 'Sonatrach',
                'matricule' => 'ADM001',
                'numero_securite_soc' => '12345678901234',
                'mot_de_passe' => Hash::make('password123'),
                'adresse' => '1 Avenue de l\'Indépendance, Alger',
                'role' => 'admin',
                'actif' => true,
                'date_creation_compte' => now(),
            ]
        );

        // Créer 50 employés fictifs avec le factory
        User::factory(50)->create();
    }
}

