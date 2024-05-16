import { Texto, Titulo } from "../styles/Textos";
import {Imagem} from "../styles/Imagem"
import { Card, Container } from "../styles/Containers";

const Resultado = ({livros}) => {
    if(livros.lenght === 0){
        return <p>Nenhum livro encontrado</p>
    }
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
    );
}

export default Resultado;