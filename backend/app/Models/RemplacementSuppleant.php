<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RemplacementSuppleant extends Model
{
    use HasFactory;

    protected $table = 'remplacements_suppleants';
    protected $guarded = [];

    protected $fillable = [
        'user_titulaire_id',
        'user_remplacant_id',
        'activite_id',
        'date_remplacement',
        'raison',
        'statut',
    ];

    protected $casts = [
        'date_remplacement' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function titulaire()
    {
        return $this->belongsTo(User::class, 'user_titulaire_id');
    }

    public function remplacant()
    {
        return $this->belongsTo(User::class, 'user_remplacant_id');
    }

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }
}