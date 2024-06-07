# Projeto Mar Aberto

## Descrição

O projeto Mar Aberto é uma iniciativa que visa fornecer informações e dados oceanográficos sobre a qualidade da água dos
oceanos de uma forma simples e prática, o projeto surgiu como uma forma de tornarmos as pessoas concientes sobre a
importância da preservação dos ocêanos e os impactos que as mudanças nos ecossistemas marinhos podem causar na
sociedade, ao utilizar dados históricos podemos de forma clara observar as mudanças na natureza dos oceanos que
geralmente ocorrem lentamente e de forma gradual.

Além do objetivo anterior temos como finalidade estimular o debate e despertar a curiosidade das pessoas para incentivar
e servir de berço a novas iniciativas e projetos de preservação dos ecossistemas marinhos.

O nome do projeto nasceu numa alusão ao termo “código aberto”, onde utilizamos dados oceanográficos abertos compilados
em formas de fácil acesso ao público.

## Dados

Os dados utilizados estão abertamente disponíveis no World Ocean Database (WOD), uma iniciativa do National Centers for
Environmental Information um orgão do NOAA (National Oceanic and Atmospheric Administration), o WOD é a maior coleção do
mundo de dados de perfis oceânicos, uniformemente formatados, com qualidade controlada e disponíveis publicamente.

É uma ferramenta poderosa para pesquisas oceanográficas, climáticas e ambientais, e o resultado de mais de 20 anos de
esforços coordenados para incorporar dados de instituições, agências, pesquisadores individuais e iniciativas de
recuperação de dados em um único banco de dados.

Os dados WOD abrangem desde a viagem do Capitão Cook em 1772 até o período Argo contemporâneo, tornando-os um recurso
valioso para análises históricas e de longo prazo do clima oceânico.

## Tecnologias

O projeto Mar Aberto foi desenvolvido utilizando as seguintes tecnologias:

### Backend

- Java 21
- Spring Boot 3.3.0
- Postgres 16

### Frontend

- NodeJs 22
- Vite 5.2.0
- React 18.2
- Typescript 5.4
- Highcharts 11.4
- Highmaps 11.4
- MUI 5.15

## Instruções

Para rodar o projeto localmente, uma imagem docker foi disponibilizada para facilitar a execução do projeto, basta
informar as variáveis de ambiente no arquivo `.env.sample` e executar o comando:

```bash
docker build \
  --build-arg API_URL=$VITE_API_URL \
  --build-arg API_USERNAME=$VITE_API_USERNAME \
  --build-arg API_PASSWORD=$VITE_API_PASSWORD \
  -t opensea-project-frontend \
  .
docker run --rm \
    -p 3000:3000 \
    -e VITE_API_URL=$VITE_API_URL \
    -e VITE_API_USERNAME=$VITE_API_USERNAME \
    -e VITE_API_PASSWORD=$VITE_API_PASSWORD \
    opensea-project-frontend
```

### Alternativa

Caso prefira rodar o projeto localmente, basta seguir os passos abaixo:

1. Clone o repositório:

```bash
git clone
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente:

```bash
VITE_API_URL=<URL do backend>
VITE_API_USERNAME=<Usuário do backend>
VITE_API_PASSWORD=<Senha do backend>
```

4. Execute o projeto:

```bash
npm run dev
```

5. Acesse o projeto em `http://localhost:3000`

Obs: O projeto foi desenvolvido utilizando o NodeJs 22 e requer uma versão igual ou superior para rodar corretamente.

