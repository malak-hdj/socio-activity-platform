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
        Schema::create('participations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('id_activite')->constrained('activites')->onDelete('cascade');
            $table->enum('statut', ['en_attente', 'participee', 'annulee', 'excusee'])->default('en_attente');
            $table->timestamp('date_participation')->nullable();
            $table->text('feedback')->nullable();
            $table->integer('notation')->nullable(); // 1-5 stars
            $table->text('observations')->nullable();
            $table->timestamps();
            $table->unique(['id_utilisateur', 'id_activite']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participations');
    }
};
