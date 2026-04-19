<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificat extends Model
{
    use HasFactory;

    protected $table = 'certificats';
    protected $guarded = [];

    protected $fillable = [
        'user_id',
        'activite_id',
        'numero_certificat',
        'date_emission',
        'chemin_fichier',
        'statut',
    ];

    protected $casts = [
        'date_emission' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }
}