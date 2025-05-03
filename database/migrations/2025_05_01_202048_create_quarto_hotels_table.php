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
        Schema::create('quarto_hotels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotels_id')->constrained()->onDelete('cascade');
            $table->string('tipo');
            $table->decimal('valor', 8, 2);
            $table->integer('quantidade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quarto_hotels');
    }
};
