<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultatTirage extends Model
{
    use HasFactory;

    protected $table = 'resultats_tirages';
    protected $guarded = [];

    protected $fillable = [
        'tirage_au_sort_id',
        'user_id',
        'activite_id',
        'position',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function tirage()
    {
        return $this->belongsTo(TirageAuSort::class, 'tirage_au_sort_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }
}