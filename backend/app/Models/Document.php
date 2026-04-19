<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $table = 'documents';
    protected $guarded = [];

    protected $fillable = [
        'user_id',
        'activite_id',
        'inscription_id',
        'document_requis_id',
        'chemin_fichier',
        'nom_original',
        'type_mime',
        'statut',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function documentRequis()
    {
        return $this->belongsTo(DocumentRequis::class);
    }
}