<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TirageAuSort extends Model
{
    use HasFactory;

    protected $table = 'tirages_au_sort';
    protected $guarded = [];

    protected $fillable = [
        'activite_id',
        'date_tirage',
        'nombre_gagnants',
        'description',
        'statut',
    ];

    protected $casts = [
        'date_tirage' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }

    public function resultatTirages()
    {
        return $this->hasMany(ResultatTirage::class);
    }
}