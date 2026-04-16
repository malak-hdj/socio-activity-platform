<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activites', function (Blueprint $table) {
            $table->id();
            $table->string('titre')->nullable();
            $table->text('description')->nullable();
            $table->string('categorie')->nullable();
            $table->integer('anciennete_minimale')->nullable();
            $table->integer('delai_confirmation')->nullable();
            $table->integer('delai_upload_documents')->nullable();
            $table->boolean('transport_pris_en_charge')->default(false);
            $table->boolean('restauration_prise_en_charge')->default(false);
            $table->boolean('telefax_requis')->default(false);
            $table->string('statut')->nullable();
            $table->boolean('tirage')->default(false);
            $table->string('niveau_demande')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activites');
    }
};
