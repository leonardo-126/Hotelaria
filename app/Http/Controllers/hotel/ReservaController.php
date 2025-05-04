<?php

namespace App\Http\Controllers\hotel;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\hotel;
use App\Models\QuartoHotel;
use App\Models\reservas;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function index(){
        $reservas = Auth::user()->reservas;
        return response()->json([
            'success' => true,
            'data' => $reservas //esta null
        ]);
    }
    public function show($id){
        $reserva = Auth::user()->reservas->where('id', $id)->firstOrFail();

        $hotel = Hotel::findOrFail($reserva->hotels_id);

        $quarto = QuartoHotel::findOrFail($reserva->quarto_id);

        return Inertia::render('hotel/ReservaDetails', [
            'hotel' => $hotel,
            'quarto' => $quarto,
            'reserva' => $reserva
        ]);
    }
    public function cancelar($id)
    {
        $reserva = Reservas::findOrFail($id);
        $reserva->status = 'cancelada';
        $reserva->save();

        return redirect()->back()->with('success', 'Reserva cancelada com sucesso.');
    }
    public function checkIn($id)
    {
        $reserva = Reservas::findOrFail($id);
        $reserva->status = 'checkin';
        $reserva->save();

        return redirect()->back()->with('success', 'Reserva cancelada com sucesso.');
    }
    public function checkOut($id)
    {
        $reserva = Reservas::findOrFail($id);
        $reserva->status = 'checkout';
        $reserva->save();

        return redirect()->back()->with('success', 'Reserva cancelada com sucesso.');
    }
}
