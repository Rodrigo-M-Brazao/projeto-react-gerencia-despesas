import { useState } from "react";
import { Container } from "../styles/Containers";
import { Input, Texto, Titulo } from "../styles/Textos";
import Resultado from "./Resultado";

const Pesquisa = () => {
    const [termoBusca, setTermoBusca] = useState('');
    const [livros, setLivros] = useState([]);

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            //busco os dados na api com base no valor que é passado para o termoBusca
            const response = await fetch(`http://localhost:8080/buscarLivroPorTitulo/${termoBusca}`);
            //converto esses dados para um formato compatível
            const data = await response.json();
            //insiro esses dados dentro da função que manipula os livros
            setLivros([data]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container direcao='column'>
            <Titulo cor='white'>Encontre seu próximo livro</Titulo>
            <Texto cor='white'>Explore por título, o livro desejado</Texto>
            <Input 
                placeholder="Digite o nome de um livro..."
                value={termoBusca}
                onChange={ (e)=> setTermoBusca(e.target.value) }
            />
            <button onClick={handleSubmit} >Pesquisar</button>
            <Resultado livros={livros} />
        </Container>
    )
}

export default Pesquisa;