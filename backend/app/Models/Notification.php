<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';
    protected $guarded = [];

    protected $fillable = [
        'user_id',
        'titre',
        'message',
        'type',
        'lue',
        'date_lecture',
    ];

    protected $casts = [
        'lue' => 'boolean',
        'date_lecture' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}