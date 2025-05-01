<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class hotel extends Model
{
    protected $fillable = [
        'nome', 'email', 'cnpj', 'descricao', 'user_id', 'telefone', 
    ];

    public function quartos()
    {
        return $this->hasMany(QuartoHotel::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
}
