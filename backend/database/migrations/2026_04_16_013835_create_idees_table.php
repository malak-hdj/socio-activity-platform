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
        Schema::create('idees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->constrained('utilisateur')->onDelete('cascade');
            $table->string('titre');
            $table->text('description');
            $table->text('justification')->nullable();
            $table->enum('categorie', ['activite', 'site', 'processus', 'autre'])->default('autre');
            $table->enum('statut', ['soumise', 'en_cours_examen', 'acceptee', 'rejetee'])->default('soumise');
            $table->integer('likes')->default(0);
            $table->text('commentaires_admin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('idees');
    }
};
