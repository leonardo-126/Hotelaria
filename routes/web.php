<?php

use App\Http\Controllers\hotel\hotelController;
use App\Http\Controllers\hotel\QuartoHotelController;
use App\Http\Controllers\hotel\ReservaController;
use App\Http\Controllers\ProfileController;
use App\Models\QuartoHotel;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/user/hotel/store', [hotelController::class, 'store'])->name('user.hotel.store');
    Route::get('/user/hotel/list', [HotelController::class, 'index']);
    Route::get('/user/hotel/list/public', [HotelController::class, 'indexPublic']);
    Route::get('/user/hotel/{id}', [hotelController::class, 'show'])->name('user.hotel.hotel');
    Route::get('/user/hotel/reserva/{id}', [hotelController::class, 'showPublic'])->name('user.hotel.reserva');
    Route::post('/user/hotel/quartos/store', [QuartoHotelController::class, 'store'])->name('user.hotel.hotel.store');
    
    Route::get('/user/hotel/{id}/quartos/list', [QuartoHotelController::class, 'index']);

    Route::post('/user/hotel/reserva/store', [ReservaController::class, 'store'])->name('user.hotel.reserva.store');
    Route::get('/user/reserva/list', [ReservaController::class, 'index'])->name('user.reserva.list');
    Route::get('/user/reserva/details/{id}', [ReservaController::class, 'show'])->name('user.reserva.show');
    Route::post('/user/reserva/{id}/cancelar', [ReservaController::class, 'cancelar'])->name('user.reserva.cancelar');
    Route::post('/user/reserva/{id}/checkin', [ReservaController::class, 'checkin'])->name('user.reserva.checkin');
    Route::post('/user/reserva/{id}/checkout', [ReservaController::class, 'checkout'])->name('user.reserva.checkout');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
