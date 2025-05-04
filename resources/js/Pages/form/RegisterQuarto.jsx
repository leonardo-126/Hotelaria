import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RegisterQuarto({hotels_id}) {
    const { data, setData, post, processing, errors } = useForm({
        hotels_id: hotels_id,
        tipo: '',
        valor: '',
        quantidade: '',
    });
        
    const submit = (e) => {
        e.preventDefault();    
        post(route('user.hotel.hotel.store'));
    };
    return (
        <GuestLayout>
            <Head title="Cadastrar Item" />

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="tipo" value="Tipo" />
                    <TextInput
                        id="tipo"
                        name="tipo"
                        value={data.tipo}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('tipo', e.target.value)}
                        required
                    />
                    <InputError message={errors.tipo} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="valor" value="Valor Diario" />
                    <TextInput
                        id="valor"
                        name="valor"
                        type="number"
                        step="0.01"
                        value={data.valor}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('valor', e.target.value)}
                        required
                    />
                    <InputError message={errors.valor} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="quantidade" value="Quantidade" />
                    <TextInput
                        id="quantidade"
                        name="quantidade"
                        type="number"
                        value={data.quantidade}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('quantidade', e.target.value)}
                        required
                    />
                    <InputError message={errors.quantidade} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Cadastrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    )
}