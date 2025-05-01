import { useEffect, useState } from "react";
import img from "../../../public/assets/hotel.png"

export default function CardHotel() {
    const [hotel, setHotel] = useState([])
        useEffect(() => {
            fetch('user/hotel/list') 
                .then(response => response.json())
                .then(data => {
                    setHotel(data.data); 
                })
                .catch(error => console.error('Erro ao buscar os hotéis:', error));
        }, []);
    return (
        <section>
            {hotel && hotel.length > 0 ? (
                hotel.map((Item) => (
                    <div className="container mt-5" key={Item.id}>
                        <div className="card shadow-lg border-0 rounded" style={{ width: '100%' }}>
                            <div className="row g-0">
                                {/* Imagem à esquerda */}
                                <div className="col-md-4">
                                    <img
                                        src={img}
                                        className="img-fluid rounded-start"
                                        alt={`Imagem do hotel ${Item.nome}`}
                                    />
                                </div>
                                {/* Informações à direita */}
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary"><strong>{Item.nome}</strong></h5>
                                        <p className="card-text text-muted"><strong>{Item.descricao}</strong></p>
                                        <p className="card-text">
                                            <strong>CNPJ:</strong> {Item.cnpj}
                                        </p>
                                        <p className="card-text">
                                            <strong>Telefone:</strong> {Item.telefone}
                                        </p>
                                        <p className="card-text">
                                            <strong>Email:</strong> {Item.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-secondary">Carregando hotéis...</p> // Mensagem de carregamento com estilo
            )}
        </section>
    )
}