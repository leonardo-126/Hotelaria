import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import RegisterHotel from './form/RegisterHotel';
import CardHotel from '@/Components/CardHotel';

export default function Dashboard({auth}) {
    const [section, setSection] = useState("home")
    const [hotel, setHotel] = useState([])
    useEffect(() => {
        fetch('user/hotel/list') 
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                setHotel(data); 
            })
            .catch(error => console.error('Erro ao buscar os hotéis:', error));
    }, []);
    return (
        <div>
            {/* 🔹 Sidebar fixa */}
            <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col">
                <div className="p-4 text-xl font-bold">Dashboard</div>
                <nav className="flex flex-col space-y-2 p-4 items-start">
                    <button onClick={() => setSection("home")} className="p-2 hover:bg-gray-700 rounded text-left w-full">🏠 Início</button>
                    <button onClick={() => setSection("hotel")} className="p-2 hover:bg-gray-700 rounded text-left w-full">🏢 hotel</button>
                    <button onClick={() => setSection("hotelList")} className="p-2 hover:bg-gray-700 rounded text-left w-full">🏢 Meus Hoteis</button>
                    <button onClick={() => setSection("estabelecimentos")} className="p-2 hover:bg-gray-700 rounded text-left w-full">📜 Meus Estabelecimentos</button>
                </nav>
            </div>
            {/* 🔹 Conteúdo principal (deslocado para a direita) */}
            <div className="ml-64 p-6">
                <AuthenticatedLayout
                
                >
                <Head title="Dashboard" />
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-left mt-3">
                            {/* 🔹 Renderiza o conteúdo baseado na seção ativa */}
                            {section === "home" && <h2 className="text-gray-900 text-lg font-bold">Boas Vindas!</h2>}
                            {section === "hotel" && <h2 className="text-gray-900 text-lg font-bold"><RegisterHotel userid={auth.user.id}/></h2>}
                            {section === "hotelList" && 
                             <div className="App">
                                {hotel && Array.isArray(hotel) && hotel.length > 0 ? ( 
                                    hotel.map((hotelItem, index) => (
                                        <CardHotel
                                            key={index}
                                            nome={hotelItem.nome}
                                            descricao={hotelItem.descricao}
                                            cnpj={hotelItem.cnpj}
                                            telefone={hotelItem.telefone}
                                            email={hotelItem.email}
                                            imagem={hotelItem.imagem}
                                        />
                                    ))
                                ) : (
                                <p>Carregando hotéis...</p> // Mensagem de carregamento ou erro
                             )}
                            </div>
                            }
                            {section === "estabelecimentos" && (
                                <>
                                    <h2 className="text-gray-900 text-lg font-bold">Meus Estabelecimentos</h2>
                                    
                                </>
                            )}
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </div>
    );
}
