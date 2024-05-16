import { useEffect, useState } from "react"
import { Texto, Titulo } from "../styles/Textos";
import {Imagem} from "../styles/Imagem"
import { Card, Container } from "../styles/Containers";

const MaisBuscados = () => {

    //gerenciador de estados
    const [livros, setLivros] = useState([]);

    //efeitos colaterais
    useEffect(()=>{
        const buscarLivros = async () => {
            try {
                const resposta = await fetch('http://localhost:8080/livros');
                const dados = await resposta.json();
                console.log(dados)
                setLivros(dados);
            } catch (error) {
                console.error(error);
            }
        }
        buscarLivros();
    }, [])

    return (
        <Container>
            {
                livros.map( (livro) => {
                    return (
                    <Card>
                        <Titulo tamanho="24px" cor="white">{livro.titulo}</Titulo>
                        <Imagem src={livro.imagem} />
                        <Texto cor="green">{livro.preco}</Texto>
                    </Card>
                    )
                })
            }
        </Container>
    )
}

export default MaisBuscados;
