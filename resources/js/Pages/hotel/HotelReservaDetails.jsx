import { usePage } from "@inertiajs/react";
import { useState } from "react";
import ReservaHotel from "../form/ReservaHotel";
import img from '../../../../public/assets/hotel.png'

export default function HotelReservaDetails() {
    const [loading, setLoading] = useState(true);
    const { hotel } = usePage().props;
    return (
        <div className="w-100 min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
            <div className="w-100 bg-white shadow rounded-4 overflow-hidden" style={{ maxWidth: '1000px' }}>
                {/* Imagem do hotel */}
                <div style={{ height: '300px', overflow: 'hidden' }}>
                    <img
                        src={img}
                        alt={`Imagem do hotel ${hotel.nome}`}
                        className="w-100 h-100 object-fit-cover"
                    />
                </div>

                <div className="p-5">
                    <h2 className="mb-4 text-center text-primary">{hotel.nome}</h2>

                    <div className="mb-3"><strong>Descrição:</strong> {hotel.descricao}</div>
                    <div className="mb-3"><strong>CNPJ:</strong> {hotel.cnpj}</div>
                    <div className="mb-3"><strong>Telefone:</strong> {hotel.telefone}</div>
                    <div className="mb-3"><strong>Email:</strong> {hotel.email}</div>
                    <div className="mb-4"><strong>Registrado em:</strong> {new Date(hotel.created_at).toLocaleString()}</div>

                    <div className="text-center">
                        <ReservaHotel hotel_id={hotel.id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}