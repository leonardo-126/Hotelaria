<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuartoHotel extends Model
{
    protected $fillable = [
        'hotel_id', 'numero_quarto', 'tipo', 'status',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
}
