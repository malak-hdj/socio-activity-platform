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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_utilisateur')->constrained('utilisateur')->onDelete('cascade');
            $table->string('titre');
            $table->text('message');
            $table->enum('type', ['info', 'warning', 'success', 'error', 'reminder'])->default('info');
            $table->string('lien')->nullable();
            $table->boolean('lu')->default(false);
            $table->timestamp('date_lecture')->nullable();
            $table->timestamp('date_expiration')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
