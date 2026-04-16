<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentRequis extends Model
{
    protected $table = 'document_requis';
    public $timestamps = false;

    protected $fillable = [
        'id_activite',
        'type_document',
        'description',
        'obligatoire',
        'template_url',
    ];
}
