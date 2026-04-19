<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sondage extends Model
{
    use HasFactory;

    protected $table = 'sondages';
    protected $guarded = [];

    protected $fillable = [
        'activite_id',
        'titre',
        'description',
        'date_debut',
        'date_fin',
        'statut',
    ];

    protected $casts = [
        'date_debut' => 'datetime',
        'date_fin' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }

    public function reponses()
    {
        return $this->hasMany(ReponseSondage::class);
    }
}