<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
    use HasFactory;

    protected $table = 'participations';
    protected $guarded = [];

    protected $fillable = [
        'user_id',
        'activite_id',
        'date_participation',
        'heures_participees',
        'statut',
    ];

    protected $casts = [
        'date_participation' => 'date',
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