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
        Schema::create('note_officiels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->nullable()->constrained('utilisateur')->onDelete('set null');
            $table->string('titre');
            $table->text('contenu');
            $table->enum('categorie', ['general', 'inscriptions', 'tirage', 'participation', 'documents', 'autre'])->default('general');
            $table->enum('type', ['information', 'avertissement', 'erreur', 'succes'])->default('information');
            $table->timestamp('date_effet')->nullable();
            $table->timestamp('date_expiration')->nullable();
            $table->boolean('visible_employes')->default(true);
            $table->boolean('visible_admin')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('note_officiels');
    }
};
