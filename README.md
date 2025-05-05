# Sistema de Reserva de Hotéis 🏨

Este é um sistema de reservas desenvolvido com **Laravel + Inertia.js + React**, permitindo que usuários possam se registrar e reservar quartos em hotéis cadastrados.

## ✅ Funcionalidades

### 🔹 Registro e Autenticação
- Registrar novo usuário
- Login e logout com sessão segura

### 🔹 Hotéis
- Criar/cadastrar hotéis (após login)
- Listar hotéis disponíveis

### 🔹 Quartos
- Registrar quartos associados a um hotel
- Definir tipo, valor e status do quarto

### 🔹 Reservas
- Realizar reservas escolhendo o hotel, quarto e período (check-in e check-out)
- Calcular automaticamente o valor total da estadia
- Gerenciar reservas (visualizar, atualizar status etc.)

---

## 🔁 Fluxo de Uso

1. **Registrar Usuário**
   - A criação de uma conta automaticamente faz login no sistema.

2. **Cadastro de Hotel**
   - Após o registro, o usuário pode cadastrar hotéis pelo painel.

3. **Cadastro de Quartos**
   - Cada hotel pode ter vários quartos registrados com tipo e valor.

4. **Login e Acesso à Dashboard**
   - O usuário logado acessa a dashboard, onde:
     - Visualiza a lista de hotéis disponíveis
     - Escolhe um hotel para realizar uma reserva

5. **Realizar Reserva**
   - Seleciona um quarto disponível e define as datas
   - O sistema calcula o valor da reserva com base nos dias e valor do quarto
   - Reserva é enviada e pode ser gerenciada posteriormente

## 🚧 Requisitos

- PHP 8.2+
- Node.js 18+
- Composer
- MySQL
