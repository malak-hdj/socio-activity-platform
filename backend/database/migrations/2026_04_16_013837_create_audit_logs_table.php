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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->nullable()->constrained('utilisateur')->onDelete('set null');
            $table->string('action');
            $table->string('modele');
            $table->unsignedBigInteger('id_modele')->nullable();
            $table->text('ancienne_valeur')->nullable(); // JSON
            $table->text('nouvelle_valeur')->nullable(); // JSON
            $table->string('ip_adresse')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamp('date_action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
