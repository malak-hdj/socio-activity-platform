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
        Schema::create('choix_sites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('id_activite')->constrained('activites')->onDelete('cascade');
            $table->integer('rang')->nullable(); // Classement 1, 2, 3
            $table->foreignId('id_site_choisi')->nullable()->constrained('sites')->onDelete('set null');
            $table->enum('statut', ['en_attente', 'attribuee', 'refusee'])->default('en_attente');
            $table->text('preferences')->nullable(); // JSON des choix classés
            $table->date('date_choix')->nullable();
            $table->timestamps();
            $table->unique(['id_utilisateur', 'id_activite']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('choix_sites');
    }
};
