import { Route, Routes } from 'react-router-dom';
import './App.css';
import MenuBar from './componentes/navbar/Menu'
import Cadastro from './componentes/cadastro/cadastro';
import Login from './componentes/Login/login';
import Home from './componentes/Home/home';
import Financial from './componentes/Financial/financial';
import Perfil from './componentes/Perfil/perfil';

function App() {
 
  return (
    <div className="App">
      <MenuBar/>
      <Routes>
        <Route path='/' element={
          <>
            <header className="App-header">
              
            </header>
           
          </>
        }/>
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/financials' element={<Financial />} />
        <Route path='/profile' element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default App;
