<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteOfficiel extends Model
{
    use HasFactory;

    protected $table = 'notes_officiels';
    protected $guarded = [];

    protected $fillable = [
        'user_id',
        'titre',
        'contenu',
        'date_note',
        'priorite',
        'statut',
    ];

    protected $casts = [
        'date_note' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}