<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentRequis extends Model
{
    use HasFactory;

    protected $table = 'documents_requis';
    protected $guarded = [];

    protected $fillable = [
        'activite_id',
        'nom',
        'description',
        'obligatoire',
    ];

    protected $casts = [
        'obligatoire' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}