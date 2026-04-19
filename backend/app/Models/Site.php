<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Site extends Model
{
    protected $fillable = [
        'nom',
        'adresse',
        'ville',
        'wilaya',
        'capacite',
        'description',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function sessionSites(): HasMany
    {
        return $this->hasMany(SessionSite::class, 'id_site');
    }

    public function choixSites(): HasMany
    {
        return $this->hasMany(ChoixSite::class, 'id_site_choisi');
    }
}
