<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'utilisateur';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'matricule',
        'numero_securite_soc',
        'mot_de_passe',
        'adresse',
        'actif',
        'role',
    ];

    protected $hidden = [
        'mot_de_passe',
    ];

    protected function casts(): array
    {
        return [
            'actif' => 'boolean',
            'date_creation_compte' => 'datetime',
            'mot_de_passe' => 'hashed',
        ];
    }

    // Relations
    public function inscriptions()
    {
        return $this->hasMany(Models\Inscription::class, 'id_utilisateur');
    }

    public function documents()
    {
        return $this->hasMany(Models\Document::class, 'id_utilisateur');
    }

    public function participations()
    {
        return $this->hasMany(Models\Participation::class, 'id_utilisateur');
    }

    public function idees()
    {
        return $this->hasMany(Models\Idee::class, 'id_utilisateur');
    }

    public function notifications()
    {
        return $this->hasMany(Models\Notification::class, 'id_utilisateur');
    }
}

