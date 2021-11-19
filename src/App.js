import logo from './logo.svg';
import './App.css';
import Pelicula from './pelicula';
import PageWrapper from './PageWrapper';
import peliculasJson from './peliculas.json';
import Paginacion from './paginacion';
import { useState } from 'react';

function App() {

  const [paginaActual, setPaginaActual] = useState(1);
  const totalPorPagina = 5;

  let peliculas = peliculasJson;

  const buscarPeliculas = async () => {
    let url ='https://cors-anywhere.herokuapp.com/https://lucasmoy.dev/data/react/peliculas.json';
    
    
    let respuesta = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'https://lucasmoy.dev/data/react/peliculas.json'
      }
    });
    let json = await respuesta.json();
    debugger;
  }

  buscarPeliculas();

  const cargarPeliculas = () => {
    peliculas = peliculas.slice(
      (paginaActual - 1) * totalPorPagina ,
      paginaActual * totalPorPagina
    );
  }
 

  const getTotalPaginas = () =>{
    let cantidadTotalPeliculas = peliculasJson.length;
    return(
      Math.ceil(cantidadTotalPeliculas / totalPorPagina)
      );
  }

  cargarPeliculas();

  return (
    <PageWrapper>

      {peliculas.map(pelicula =>
        <Pelicula titulo={pelicula.titulo} calificacion={pelicula.calificacion} img={pelicula.img}
          runtime={pelicula.runtime} pg={pelicula.pg} release={pelicula.release} director={pelicula.director} actores={pelicula.actores} >
          {pelicula.descripcion}
        </Pelicula>

      )}
      <Paginacion pagina={paginaActual} total={getTotalPaginas()} onChange={(pagina) => {
        setPaginaActual(pagina)
      }} />

    </PageWrapper>
  );
}

export default App;
