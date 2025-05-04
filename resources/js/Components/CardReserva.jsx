import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CardReserva() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        fetch('/user/reserva/list')
            .then(response => response.json())
            .then(data => setReservas(data.data))
            .catch(error => console.error('Erro ao buscar reservas:', error));
    }, []);
    return (
        <div className="space-y-6 p-4">
            {reservas.map((reserva) => (
                <div
                    key={reserva.id}
                    className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto"
                >
                    <p className="text-gray-700">
                        <span className="font-semibold">Status:</span> {reserva.status}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Check-in:</span> {new Date(reserva.data_check_in).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Check-out:</span> {new Date(reserva.data_check_out).toLocaleDateString()}
                    </p>
                    <Link
                    href={route('user.reserva.show', reserva.id)}
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 mb-4"
                    >
                        Detalhes
                    </Link>
                </div>
            ))}
        </div>
    );
}