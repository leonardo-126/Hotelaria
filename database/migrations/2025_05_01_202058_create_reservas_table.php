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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotels_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('quarto_id')->constrained('quarto_hotels')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->enum('status', ['checkin','checkout', 'confirmada', 'cancelada']);
            $table->decimal('valor_total', 8, 2);
            $table->date('data_check_in');  // Data de check-in
            $table->date('data_check_out'); // Data de check-out
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
