<?php

namespace App\Http\Controllers\hotel;

use App\Http\Controllers\Controller;
use App\Models\QuartoHotel;
use App\Models\reservas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservaController extends Controller
{
    public function store(Request $request){
        $user = Auth::id();
        $request->validate([
            'hotels_id' => 'required|integer|exists:hotels,id',
            'quarto_id' => 'required|integer|exists:quarto_hotels,id',
            'data_check_in' => 'required|date|after_or_equal:today',
            'data_check_out' => 'required|date|after:data_check_in',
        ]);

        reservas::create([
            'user_id' => $user,
            'hotels_id'=> $request->hotels_id,
            'quarto_id'=> $request->quarto_id,
            'status'=> 'confirmada',
            'data_check_in'=> $request->data_check_in,
            'data_check_out'=> $request->data_check_out,
        ]);

        QuartoHotel::where('id', $request->quarto_id) ->update(['status' => 'ocupado']);
        return redirect()->back()->with('success', 'Item cadastrado com sucesso!');
    }
}
