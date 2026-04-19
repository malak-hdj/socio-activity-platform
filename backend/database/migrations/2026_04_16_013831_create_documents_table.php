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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('id_activite')->nullable()->constrained('activites')->onDelete('set null');
            $table->foreignId('id_inscription')->nullable()->constrained('inscriptions')->onDelete('set null');
            $table->foreignId('id_document_requis')->nullable()->constrained('document_requis')->onDelete('set null');
            $table->string('nom_fichier');
            $table->string('chemin_fichier');
            $table->string('type_mime');
            $table->integer('taille_octets');
            $table->enum('statut', ['en_attente', 'valide', 'rejete', 'expire'])->default('en_attente');
            $table->text('motif_rejet')->nullable();
            $table->timestamp('date_validation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
