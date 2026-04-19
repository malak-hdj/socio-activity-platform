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
        Schema::create('session_sites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_session')->constrained('sessions')->onDelete('cascade');
            $table->foreignId('id_site')->constrained('sites')->onDelete('cascade');
            $table->timestamp('date_debut')->nullable();
            $table->timestamp('date_fin')->nullable();
            $table->integer('nb_places')->default(0);
            $table->integer('nb_places_disponibles')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_sites');
    }
};
