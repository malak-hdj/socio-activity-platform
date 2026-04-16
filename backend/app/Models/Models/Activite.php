<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    protected $table = 'activites';
    public $timestamps = false;

    protected $fillable = [
        'titre',
        'description',
        'categorie',
        'anciennete_minimale',
        'delai_confirmation',
        'delai_upload_documents',
        'transport_pris_en_charge',
        'restauration_prise_en_charge',
        'telefax_requis',
        'statut',
        'tirage',
        'niveau_demande',
    ];

    // Relations
    public function sites()
    {
        return $this->hasMany(Site::class, 'id_activite');
    }

    public function sessions()
    {
        return $this->hasMany(Session::class, 'id_activite');
    }

    public function documentsRequis()
    {
        return $this->hasMany(DocumentRequis::class, 'id_activite');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'id_activite');
    }

    public function tirages()
    {
        return $this->hasMany(TirageAuSort::class, 'id_activite');
    }
}
