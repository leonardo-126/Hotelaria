import { usePage } from "@inertiajs/react";
import img from '../../../../public/assets/hotel.png'
import { useEffect, useState } from "react";

export default function ReservaDetails(){
    const { reserva, hotel, quarto } = usePage().props;

    const checkIn = async () => {
        const confirmado = confirm('Deseja realmente fazer o checkIn?')

        if (!confirmado) return;

        try {
            const response = await fetch(`/user/reserva/${reserva.id}/checkin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            });
    
            if (response.ok) {
                alert('CheckIn feito com sucesso.');
                window.location.reload(); 
            } else {
                alert('Erro ao fazer checkIn.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro inesperado.');
        }
    }

    const checkOut = async () => {
        const confirmado = confirm('Deseja realmente fazer o checkOut?')

        if (!confirmado) return;

        try {
            const response = await fetch(`/user/reserva/${reserva.id}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            });
    
            if (response.ok) {
                alert('checkOut feito com sucesso.');
                window.location.reload(); 
            } else {
                alert('Erro ao fazer checkOut.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro inesperado.');
        }
    }


    const cancelarReserva = async () => {
        const confirmado = confirm('Deseja realmente cancelar a reserva?');
        if (!confirmado) return;
    
        try {
            const response = await fetch(`/user/reserva/${reserva.id}/cancelar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            });
    
            if (response.ok) {
                alert('Reserva cancelada com sucesso.');
                window.location.reload(); 
            } else {
                alert('Erro ao cancelar a reserva.');
            }
        } catch (error) {
            console.error('Erro ao cancelar:', error);
            alert('Erro inesperado.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
                {/* Imagem no topo */}
                <img
                    src={img}
                    alt="Imagem do hotel"
                    className="w-full h-60 object-cover"
                />

                {/* Informações da reserva */}
                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {hotel?.nome}
                    </h2>

                    <p className="text-gray-700">
                        <span className="font-semibold">Tipo do Quarto:</span> {quarto?.tipo}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Valor por diária:</span> R$ {parseFloat(quarto?.valor || 0).toFixed(2)}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Status:</span> {reserva.status}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Check-in:</span> {new Date(reserva.data_check_in).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Check-out:</span> {new Date(reserva.data_check_out).toLocaleDateString()}
                    </p>
                    <div className="flex flex-col items-center space-y-4 mt-6">
                        <div className="flex flex-col items-center space-y-2">
                            <button
                                onClick={checkIn}
                                disabled={reserva.status !== 'confirmada'}
                                className={`px-6 py-2 rounded shadow font-semibold text-white ${
                                    reserva.status !== 'confirmada'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                Fazer Check-in
                            </button>

                            <button
                                onClick={checkOut}
                                disabled={reserva.status !== 'checkin'}
                                className={`px-6 py-2 rounded shadow font-semibold text-white ${
                                    reserva.status !== 'checkin'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                Fazer Check-out
                            </button>
                        </div>

                        <button
                            onClick={cancelarReserva}
                            disabled={reserva.status === 'cancelada' || reserva.status === 'checkout'}
                            className={`px-6 py-2 rounded shadow font-semibold text-white mt-6 ${
                                reserva.status === 'cancelada' || reserva.status === 'checkout'
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            Cancelar Reserva
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}