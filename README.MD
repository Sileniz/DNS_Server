# Servidor DNS feito em Node.js utilizando TypeScrip e protocolo UDP.

## Descrição

Este projeto é um servidor DNS simples que utiliza o protocolo UDP para resolver consultas DNS. O servidor é implementado em TypeScript.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- UDP (User Datagram Protocol)

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Sockets
## Funcionalidades

- Servidor DNS UDP que resolve consultas DNS usando a biblioteca dns do Node.js.
- Resolução de registros DNS utilizando dns.resolveAny.

## Configuração do ambiente

1. Clone o repositório:

    ```bash
    git clone https://github.com/Sileniz/DNS_Server.git
    cd DNS_Server
    ```

## Instalação

1. Instale as dependências do projeto:

    ```bash
    npm install
    ```
2. Executando o servidor
    ```bash
    npm run dev
    ```

3. Testar o Servidor DNS
    ```bash
    dig @127.0.0.1 -p 5353 example.com
<br></br>