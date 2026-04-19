<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoriqueStatutInscription extends Model
{
    use HasFactory;

    protected $table = 'historiques_statuts_inscriptions';
    protected $guarded = [];

    protected $fillable = [
        'inscription_id',
        'ancien_statut',
        'nouveau_statut',
        'modifier_par_id',
        'raison',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function modifier()
    {
        return $this->belongsTo(User::class, 'modifier_par_id');
    }
}