import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ReservaHotel({hotel_id}){
    const [quartos, setQuartos] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        hotels_id: hotel_id,
        valor_total: '',
        quarto_id: '',
        data_check_in: '',
        data_check_out: ''
    });
        
    const submit = (e) => {
        e.preventDefault();
        post(route('user.hotel.reserva.store'))
    };
    

    useEffect(() => {
        fetch(`/user/hotel/${hotel_id}/quartos/list`) 
            .then(response => response.json())
            .then(data => {
                setQuartos(data.data); 
            })
            .catch(error => console.error('Erro ao buscar os hotéis:', error));
    }, [refresh]);

    const quartosDisponiveis = quartos.filter(quartos => quartos.status === 'livre')

    useEffect(() => {
        const quartoSelecionado = quartosDisponiveis.find(q => q.id == data.quarto_id);
        
        if (data.data_check_in && data.data_check_out && quartoSelecionado) {
            const checkIn = new Date(data.data_check_in);
            const checkOut = new Date(data.data_check_out);
            const dias = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
            if (dias > 0) {
                setData('valor_total', dias * parseFloat(quartoSelecionado.valor));
                return;
            }
        }
    
        setData('valor_total', 0);
    }, [data.data_check_in, data.data_check_out, data.quarto_id]);

    return (
        <section>
            <form onSubmit={submit}>
                {/* Selecionar Quarto */}
                <div>
                    <InputLabel htmlFor="quarto_id" value="Selecione o Quarto" />
                    <select
                        id="quarto_id"
                        name="quarto_id"
                        value={data.quarto_id}
                        onChange={(e) => setData('quarto_id', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="">-- Escolha um quarto --</option>
                        {quartosDisponiveis.map((quarto) => (
                            <option key={quarto.id} value={quarto.id}>
                                {quarto.tipo} - R${quarto.valor}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.quarto_id} className="mt-2" />
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="data_check_in" value="Data de Entrada:" />
                
                    <TextInput
                        id="data_check_in"
                        name="data_check_in"
                        type='date'
                        value={data.data_check_in}
                        className="mt-1 block w-full"
                        autoComplete="data_check_in"
                        isFocused={true}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setData('data_check_in', e.target.value)}
                        required
                    />
                
                    <InputError message={errors.data_check_in} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="data_check_out" value="Data de Saida" />
                
                    <TextInput
                    id="data_check_out"
                    name="data_check_out"
                    type='date'
                    value={data.data_check_out}
                    className="mt-1 block w-full"
                    autoComplete="data_check_out"
                    isFocused={true}
                    onChange={(e) => setData('data_check_out', e.target.value)}
                    required
                    />
                
                    <InputError message={errors.data_check_out} className="mt-2" />
                </div>
                {Number(data.valor_total) > 0 && (
                    <div className="text-lg font-semibold text-green-600">
                        Total da reserva: R$ {Number(data.valor_total).toFixed(2)}
                    </div>
                )}

                <Link
                    href={route('dashboard')}
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 mb-4"
                >
                    ← Voltar para Dashboard
                </Link>
                
                <PrimaryButton className="ms-4" disabled={processing}>
                    Reservar
                </PrimaryButton>

            </form>            
        </section>
    )
}