import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RegisterHotel({userid}){
    const { data, setData, post, processing, errors, reset } = useForm({
            nome: '',
            email: '',
            cnpj: '',
            telefone: '',
            descricao: '',
            user_id: userid
        });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('user/hotel/store'));
        };
    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nome" value="Nome" />

                    <TextInput
                        id="nome"
                        name="nome"
                        value={data.nome}
                        className="mt-1 block w-full"
                        autoComplete="nome"
                        isFocused={true}
                        onChange={(e) => setData('nome', e.target.value)}
                        required
                    />

                    <InputError message={errors.nome} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="cnpj" value="CNPJ" />

                    <TextInput
                        id="cnpj"
                        name="cnpj"
                        value={data.cnpj}
                        className="mt-1 block w-full"
                        autoComplete="cnpj"
                        onChange={(e) => setData('cnpj', e.target.value)}
                        required
                    />

                    <InputError message={errors.cnpj} className="mt-2" />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="telefone" value="Telefone" />

                    <TextInput
                        id="telefone"
                        name="telefone"
                        value={data.telefone}
                        className="mt-1 block w-full"
                        autoComplete="telefone"
                        isFocused={true}
                        onChange={(e) => setData('telefone', e.target.value)}
                        required
                    />

                    <InputError message={errors.telefone} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="descricao" value="Descricao" />

                    <TextInput
                        id="descricao"
                        name="descricao"
                        value={data.descricao}
                        className="mt-1 block w-full"
                        autoComplete="descricao"
                        isFocused={true}
                        onChange={(e) => setData('descricao', e.target.value)}
                        required
                    />

                    <InputError message={errors.descricao} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    )
}