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
        Schema::create('reponse_sondages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_sondage')->constrained('sondages')->onDelete('cascade');
            $table->foreignId('id_utilisateur')->nullable()->constrained('utilisateur')->onDelete('set null');
            $table->text('reponse'); // JSON ou texte
            $table->timestamps();
            $table->unique(['id_sondage', 'id_utilisateur']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reponse_sondages');
    }
};
