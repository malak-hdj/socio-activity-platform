<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionSite extends Model
{
    use HasFactory;

    protected $table = 'sessions_sites';
    protected $guarded = [];

    protected $fillable = [
        'session_id',
        'site_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}