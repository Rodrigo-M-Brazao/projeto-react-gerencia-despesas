import { Route, Routes } from 'react-router-dom';
import './App.css';
import MaisBuscados from './componentes/maisBuscados/MaisBuscados';
import MenuBar from './componentes/navbar/Menu'
import Pesquisa from './componentes/pesquisa/Pesquisa';
import Cadastro from './componentes/cadastro/cadastro';
import Login from './componentes/Login/login';
import Home from './componentes/Home/home';
import Financial from './componentes/Financial/financial';
import { useState } from 'react';

function App() {
  const [estaLogado, logar] = useState(false);
  return (
    <div className="App">
      <MenuBar estaLogado={{estaLogado}}/>
      <Routes>
        <Route path='/' element={
          <>
            <header className="App-header">
              <Pesquisa />
            </header>
            <MaisBuscados />
          </>
        }/>
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/financials' element={<Financial />} />
      </Routes>
    </div>
  );
}

export default App;
