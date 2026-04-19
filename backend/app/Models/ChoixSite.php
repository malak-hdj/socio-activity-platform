<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChoixSite extends Model
{
    protected $fillable = [
        'id_utilisateur',
        'id_activite',
        'rang',
        'id_site_choisi',
        'statut',
        'preferences',
        'date_choix',
    ];

    protected $casts = [
        'date_choix' => 'date',
        'preferences' => 'json',
    ];

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_utilisateur');
    }

    public function activite(): BelongsTo
    {
        return $this->belongsTo(Activite::class, 'id_activite');
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class, 'id_site_choisi');
    }
}
