import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Perfil = () => {
    const navigate = useNavigate ();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div>
            <h1>Perfil</h1>
            <p>Nome: {localStorage.getItem('name')}</p>
            <p>Valor total da dívidas: {localStorage.getItem('valorTotal')}</p>
        </div>
)
}

export default Perfil;