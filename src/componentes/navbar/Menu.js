import { Menu } from "../styles/Containers";
import { ImagemLogo } from "../styles/Imagem";
import { Item, Lista } from "../styles/Listas";
// import logo from "../../images/logo.jpg";
import { Link , useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../auth/auth';

// const lista = ['Lançamentos', 'Blog', 'Fale Conosco'];

const MenuBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate ();
  
    useEffect(() => {
      setIsLoggedIn(isAuthenticated());
    }, []);
  
    const handleLogout = () => {
      logout();
      setIsLoggedIn(false);
      navigate.push('/login'); // Redirecionar para a página de login após logout
    };
  
    return (
      <Menu>
        {/* <ImagemLogo src={logo} /> */}
        <Lista>
          {!isLoggedIn ? (
            <>
              <Item>
                <Link to="/cadastro" style={{ textDecoration: 'none', color: 'white' }}>Cadastro</Link>
              </Item>
              <Item>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white', marginRight: '30px' }}>Login</Link>
              </Item>
            </>
          ) : (
            <>
              <Item>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'white', marginRight: '30px' }}>Perfil</Link>
              </Item>
              <Item>
                <button onClick={handleLogout} style={{ textDecoration: 'none', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
              </Item>
            </>
          )}
        </Lista>
      </Menu>
    );
  };
  
export default MenuBar;

