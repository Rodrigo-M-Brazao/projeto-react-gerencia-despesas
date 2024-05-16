import { Route, Routes } from 'react-router-dom';
import './App.css';
import MaisBuscados from './componentes/maisBuscados/MaisBuscados';
import MenuBar from './componentes/navbar/Menu'
import Pesquisa from './componentes/pesquisa/Pesquisa';
import Cadastro from './componentes/cadastro/cadastro';
import Login from './componentes/Login/login';

function App() {
  return (
    <div className="App">
      <MenuBar />
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
      </Routes>
    </div>
  );
}

export default App;
