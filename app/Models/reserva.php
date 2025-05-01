<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class reserva extends Model
{
    protected $fillable = [
        'hotel_id', 'quarto_id', 'user_id', 'status','data_check_in', 'data_check_out'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function quarto()
    {
        return $this->belongsTo(QuartoHotel::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}
