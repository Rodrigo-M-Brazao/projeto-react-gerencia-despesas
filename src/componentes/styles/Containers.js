import styled from "styled-components";

export const Menu = styled.nav`
    display:flex;
    height: 70px;
    background-color: #2f2f2f;
    align-items:center;
    justify-content: right;
    
`; 
export const Container = styled.div`
    display:flex;
    flex-direction: ${props => props.direcao || 'row'};
    width: 100%;
    justify-content: center;
    gap: 24px;
    align-items: center;
`;
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;