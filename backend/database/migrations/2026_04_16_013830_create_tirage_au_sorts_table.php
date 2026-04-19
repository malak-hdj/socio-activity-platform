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
        Schema::create('tirage_au_sorts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_activite')->constrained('activites')->onDelete('cascade');
            $table->integer('nombre_places')->nullable();
            $table->integer('nombre_participants')->nullable();
            $table->enum('statut', ['planifie', 'en_cours', 'termine', 'valide'])->default('planifie');
            $table->timestamp('date_tirage')->nullable();
            $table->timestamp('date_validation')->nullable();
            $table->boolean('double_tirage')->default(false);
            $table->text('observations')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tirage_au_sorts');
    }
};
