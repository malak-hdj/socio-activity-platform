<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $table = 'session';
    public $timestamps = false;

    protected $fillable = [
        'id_activite',
        'date_debut',
        'date_fin',
        'date_tirage',
        'lieu_tirage',
    ];
}
