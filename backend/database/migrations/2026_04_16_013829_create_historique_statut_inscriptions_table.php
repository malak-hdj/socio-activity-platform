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
        Schema::create('historique_statut_inscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_inscription')->constrained('inscriptions')->onDelete('cascade');
            $table->enum('ancien_statut', ['en_attente', 'confirmee', 'annulee', 'rejetee'])->nullable();
            $table->enum('nouveau_statut', ['en_attente', 'confirmee', 'annulee', 'rejetee'])->nullable();
            $table->text('raison')->nullable();
            $table->foreignId('modifie_par')->nullable()->constrained('utilisateur')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historique_statut_inscriptions');
    }
};
