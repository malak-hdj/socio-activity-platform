<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    protected $table = 'activites';
    public $timestamps = true;

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

    protected $casts = [
        'transport_pris_en_charge' => 'boolean',
        'restauration_prise_en_charge' => 'boolean',
        'telefax_requis' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // HasMany Relations
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

    public function choixSites()
    {
        return $this->hasMany(ChoixSite::class, 'id_activite');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'id_activite');
    }

    public function participations()
    {
        return $this->hasMany(Participation::class, 'id_activite');
    }

    public function certificats()
    {
        return $this->hasMany(Certificat::class, 'id_activite');
    }

    public function sondages()
    {
        return $this->hasMany(Sondage::class, 'id_activite');
    }

    public function resultatTirages()
    {
        return $this->hasMany(ResultatTirage::class, 'id_activite');
    }
}


