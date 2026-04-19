<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resultat_tirages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_tirage_au_sort')->constrained('tirage_au_sorts')->onDelete('cascade');
            $table->foreignId('id_utilisateur')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('id_activite')->constrained('activites')->onDelete('cascade');
            $table->enum('statut', ['gagnant', 'suppleant', 'perdant', 'retire'])->default('perdant');
            $table->integer('numero_tirage')->nullable(); // Numéro d'ordre du tirage
            $table->boolean('confirme')->default(false);
            $table->timestamp('date_confirmation')->nullable();
            $table->timestamps();
            $table->unique(['id_tirage_au_sort', 'id_utilisateur']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resultat_tirages');
    }
};
