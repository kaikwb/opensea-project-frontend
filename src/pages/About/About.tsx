import {Container, Typography} from "@mui/material";
import PagePaper from "../../components/PagePaper/PagePaper.tsx";

function About() {
    return (
        <PagePaper>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
                    O Projeto
                </Typography>
                <Typography variant="body1" paragraph sx={{lineHeight: '2rem'}}>
                    O projeto Mar Aberto é uma iniciativa que visa fornecer informações e dados oceanográficos sobre a
                    qualidade da água dos oceanos de uma forma simples e prática, o projeto surgiu como uma forma de
                    tornarmos as pessoas concientes sobre a importância da preservação dos ocêanos e os impactos que as
                    mudanças nos ecossistemas marinhos podem causar na sociedade, ao utilizar dados históricos podemos
                    de forma clara observar as mudanças na natureza dos oceanos que geralmente ocorrem lentamente e de
                    forma gradual.<br/><br/>
                    Além do objetivo anterior temos como finalidade estimular o debate e despertar a curiosidade das
                    pessoas de forma a incentivar e servir de berço a novas iniciativas e projetos de preservação dos
                    ecossistemas marinhos.<br/><br/>
                    O nome do projeto nasceu numa alusão ao termo “código aberto”, onde utilizamos dados oceanográficos
                    abertos compilados em formas de fácil acesso ao público.
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{fontWeight: 'bold'}}>
                    O Banco de dados dos oceanos
                </Typography>
                <Typography variant="body1" paragraph sx={{lineHeight: '2rem'}}>
                    Os dados utilizados estão abertamente disponíveis no World Ocean Database (WOD), uma iniciativa do
                    National Centers for Environmental Information um orgão do NOAA (National Oceanic and Atmospheric
                    Administration), o WOD é a maior coleção do mundo de dados de perfis oceânicos, uniformemente
                    formatados, com qualidade controlada e disponíveis publicamente.<br/><br/>
                    É uma ferramenta poderosa para pesquisas oceanográficas, climáticas e ambientais, e o resultado
                    final de mais de 20 anos de esforços coordenados para incorporar dados de instituições, agências,
                    pesquisadores individuais e iniciativas de recuperação de dados em um único banco de
                    dados.<br/><br/>
                    Os dados WOD abrangem desde a viagem do Capitão Cook em 1772 até o período Argo contemporâneo,
                    tornando-os um recurso valioso para análises históricas e de longo prazo do clima oceânico.
                </Typography>
            </Container>
        </PagePaper>
    )
}

export default About;
