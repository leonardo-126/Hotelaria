import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ReservaHotel({hotel_id}){
    const { data, setData, post, processing, errors, reset } = useForm({
        hotels_id: hotel_id,
        quarto_id: 3,
        data_check_in: '',
        data_check_out: ''
    });
        
            const submit = (e) => {
                e.preventDefault();
                console.log(data)
                post(route('user.hotel.reserva.store'));
            };
    return (
        <section>
            <form onSubmit={submit}>
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
                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Cadastrar
                    </PrimaryButton>
                </div>
            </form>            
        </section>
    )
}