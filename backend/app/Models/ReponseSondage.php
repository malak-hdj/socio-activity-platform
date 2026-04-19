<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReponseSondage extends Model
{
    use HasFactory;

    protected $table = 'reponses_sondages';
    protected $guarded = [];

    protected $fillable = [
        'sondage_id',
        'user_id',
        'reponse_text',
        'note',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function sondage()
    {
        return $this->belongsTo(Sondage::class);
    }

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}