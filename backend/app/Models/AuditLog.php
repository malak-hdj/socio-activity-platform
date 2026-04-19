<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    protected $table = 'audit_logs';
    protected $guarded = [];

    protected $fillable = [
        'user_id',
        'action',
        'model',
        'model_id',
        'ancienne_valeur',
        'nouvelle_valeur',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}