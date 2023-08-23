import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
// import App from './App'
import './index.css'
import Home from './pages/Home'
import ListaServicos from './pages/ListaServicos'
import Header from './components/Header'
import Footer from './components/Footer'
import ListaDevs from './pages/ListaDevs'
import PerfilUsuario from './pages/PerfilUsuario'
import VisualizarServico from './pages/VisualizarServico'
import CadastroUsuario from './pages/CadastroUsuario'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element= {<Home />}/>
        <Route path='listaservico' element= {<ListaServicos />}/>
        <Route path='listadevs' element={<ListaDevs/>}/>
        <Route path='perfil/:idUsuario' element={ <PerfilUsuario /> } />
        <Route path='visualizarservico/:idServico' element={ <VisualizarServico /> } /> 
        <Route path='cadastrousuario' element={ <CadastroUsuario /> } />
      </Routes>
      <Footer />
      
    </BrowserRouter>
  </React.StrictMode>,
)
