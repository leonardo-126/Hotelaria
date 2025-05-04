<?php

namespace App\Http\Controllers\hotel;

use App\Http\Controllers\Controller;
use App\Models\hotel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Inertia\Inertia;

class hotelController extends Controller
{
    use HasFactory, Notifiable;
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'cnpj' => 'required|unique:hotels,cnpj',
            'telefone' => 'required|string|max:15',
            'email' => 'required|email|unique:hotels,email',
            'user_id' => 'required|exists:users,id'
        ]);
        hotel::create($validated);

        //retorna resposta inertia com sucesso 
        return redirect()->route('dashboard')->with('success', 'Estabelecimento criado com sucesso!');
    }

    public function index(){
        // Recupera todos os hotéis do usuário autenticado
        $hotels = Auth::user()->hotels;

        return response()->json([
            'success' => true,
            'data' => $hotels
        ]);
    }
    public function indexPublic(){
        $hotels = hotel::all();

        return response()->json([
            'success' => true,
            'data' => $hotels
        ]);
    }
    public function details($id) {
        $hotel = hotel::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $hotel
        ]);
    }
    public function show($id)
    {
        $hotel = Hotel::findOrFail($id);
        return Inertia::render('hotel/HotelDetails', [
            'hotel' => $hotel
        ]);
    }
    public function showPublic($id)
    {
        $hotel = Hotel::findOrFail($id);
        return Inertia::render('hotel/HotelReservaDetails', [
            'hotel' => $hotel
        ]);
    }
}
