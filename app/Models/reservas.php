<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservas extends Model
{
    protected $fillable = [
        'hotels_id', 'quarto_id', 'user_id', 'status','valor_total','data_check_in', 'data_check_out'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotels_id');
    }

    public function quarto()
    {
        return $this->belongsTo(QuartoHotel::class, 'quarto_id');
    }

    public function usuario()
    {
        return $this->hasMany(Reservas::class, 'user_id');
    }
}
