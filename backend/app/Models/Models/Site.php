<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    protected $table = 'site';
    public $timestamps = false;

    protected $fillable = [
        'id_activite',
        'site',
        'nb_suppliants',
    ];
}
