import CardHotel from "@/Components/CardHotel";
import { useEffect, useState } from "react";

export default function HotelList(){
    const [hotel, setHotel] = useState([])
    useEffect(() => {
        fetch('user/hotel/list') 
            .then(response => response.json())
            .then(data => {
                setHotel(data.data); 
            })
            .catch(error => console.error('Erro ao buscar os hotéis:', error));
    }, []);
    console.log(hotel.id)
    return (
        <section>
            {hotel && hotel.length > 0 ? (
            hotel.map((hotelItem) => (
                <CardHotel
                    key={hotelItem.id} // Usando o id do hotel como chave para o componente
                    nome={hotelItem.nome} // Passando as propriedades para o CardHotel
                    descricao={hotelItem.descricao}
                    cnpj={hotelItem.cnpj}
                    telefone={hotelItem.telefone}
                    email={hotelItem.email}
                />
            ))
            ) : (
                <p>Carregando hotéis...</p> // Mensagem de carregamento caso a lista de hotéis ainda não tenha sido carregada
            )}
        </section>
    )
}