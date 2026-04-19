<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $table = 'sessions';
    protected $guarded = [];

    protected $fillable = [
        'activite_id',
        'date',
        'heure_debut',
        'heure_fin',
        'lieu',
        'capacite',
        'description',
    ];

    protected $casts = [
        'date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }

    public function sessionSites()
    {
        return $this->hasMany(SessionSite::class);
    }
}