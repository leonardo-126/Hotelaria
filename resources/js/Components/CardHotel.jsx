export default function CardHotel(nome, descricao, cnpj, telefone, email, imagem) {
    return (
        <div className="container mt-5">
        <div className="card" style={{ width: '100%' }}>
            <div className="row no-gutters">
            {/* Imagem à esquerda */}
            <div className="col-md-4">
                <img
                src={imagem}
                className="card-img"
                alt={`Imagem do hotel ${nome}`}
                />
            </div>
            {/* Informações à direita */}
            <div className="col-md-8">
                <div className="card-body">
                <h5 className="card-title">{nome}</h5>
                <p className="card-text"><strong>{descricao}</strong></p>
                <p className="card-text"><strong>CNPJ:</strong> {cnpj}</p>
                <p className="card-text"><strong>Telefone:</strong> {telefone}</p>
                <p className="card-text"><strong>Email:</strong> {email}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}