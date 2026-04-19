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
        Schema::create('certificats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('id_activite')->constrained('activites')->onDelete('cascade');
            $table->string('numero_certificat')->unique();
            $table->date('date_emission');
            $table->text('contenu')->nullable();
            $table->string('chemin_fichier')->nullable();
            $table->enum('statut', ['genere', 'signe', 'archive', 'valide'])->default('genere');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificats');
    }
};
