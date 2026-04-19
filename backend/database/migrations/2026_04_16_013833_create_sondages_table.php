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
        Schema::create('sondages', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->foreignId('id_activite')->nullable()->constrained('activites')->onDelete('set null');
            $table->enum('type', ['choix_multiples', 'choix_unique', 'texte_libre', 'evaluation'])->default('choix_multiples');
            $table->timestamp('date_debut');
            $table->timestamp('date_fin');
            $table->integer('nb_reponses')->default(0);
            $table->boolean('anonyme')->default(true);
            $table->text('options')->nullable(); // JSON
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sondages');
    }
};
