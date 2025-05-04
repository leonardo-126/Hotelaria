<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuartoHotel extends Model
{
    protected $fillable = [
        'hotels_id', 'tipo', 'valor', 'status',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reservas::class);
    }
}
