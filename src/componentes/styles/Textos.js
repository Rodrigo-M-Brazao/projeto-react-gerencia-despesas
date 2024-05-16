import styled from "styled-components";

//Nossos componentes de estilos para
//os textos (titulo, subtitulo, texto..)

export const Titulo = styled.h1`
    font-size: ${props => props.tamanho || '32px'};
    color: ${props => props.cor || 'black'};
    font-weight: bold;
    line-height: 1.0rem;
`;
export const SubTitulo = styled.h2`
    font-size: ${props => props.tamanho || '32px'};
    color: ${props => props.cor || 'black'};
    line-height: 1.5rem;
    font-weight: 700;
`;
export const Texto = styled.p`
    font-size: ${props => props.tamanho || '32px'};
    color: ${props => props.cor || 'black'};
    line-height: 1.0rem;
    font-weight: 400;
`;

export const Input = styled.input`
    width: 600px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid black;
    padding: 8px;
    background-color: #fff;
`;
