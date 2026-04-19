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
        Schema::create('remplacement_suppleants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur_titulaire')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('id_utilisateur_remplacant')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('id_activite')->constrained('activites')->onDelete('cascade');
            $table->enum('raison', ['retrait_titulaire', 'promotion_suppleant', 'autre'])->default('autre');
            $table->text('motif')->nullable();
            $table->timestamp('date_remplacement')->nullable();
            $table->boolean('confirme')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remplacement_suppleants');
    }
};
