<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $table = 'inscriptions';

    protected $fillable = [
        'id_utilisateur',
        'id_activite',
        'statut',
        'date_inscription',
        'date_confirmation',
        'observations',
    ];

    protected $casts = [
        'date_inscription' => 'datetime',
        'date_confirmation' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
        return $this->belongsTo(User::class, 'id_utilisateur');
