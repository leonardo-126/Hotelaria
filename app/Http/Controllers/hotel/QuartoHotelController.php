<?php

namespace App\Http\Controllers\hotel;

use App\Http\Controllers\Controller;
use App\Models\QuartoHotel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;

class QuartoHotelController extends Controller
{
    use HasFactory, Notifiable;

    public function store(Request $request){

        $request->validate([
            'hotels_id' => 'required|integer|exists:hotels,id',
            'tipo' => 'required|string|max:255',
            'valor' => 'required|numeric|min:0',
            'quantidade' => 'required|integer|min:1',
        ]);
        for ($i = 0; $i < $request->quantidade; $i++) {
            QuartoHotel::create([
                'hotels_id' => $request->hotels_id,
                'tipo' => $request->tipo,
                'valor' => $request->valor,
                'status' => 'livre', // valor padrão
            ]);
        }
    
        return redirect()->back()->with('success', 'Item cadastrado com sucesso!');
    }
    public function index($id){
        $quartos = QuartoHotel::where('hotels_id', $id)->get();

        return response()->json([
            'success' => true,
            'data' => $quartos
        ]);
    }
}
