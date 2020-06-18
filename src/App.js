import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  column-gap:2rem;
  @media (min_width:992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap:2rem;
  }
`;
const Imagen = styled.img`
  max-width:100%;
  margin-top:5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size:50px;
  margin-bottom:50px;
  margin-top:80px;
  &::after{
    content:'';
    width:100px;
    height:6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda ,guardarMoneda] = useState('');
  const [cripto ,guardarCriptoMoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  //state para Spinner
  const [cargando, guardarCargando] = useState(false);

  useEffect(()=>{
    if(moneda === '' || cripto === '') return;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
    const consulta = async() =>{
      //mostrar Spinner
      guardarCargando(true);

      const resultado = await axios.get(url);
      
      setTimeout(()=>{
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[cripto][moneda]);
      },3000);
    }
    consulta();

  },[moneda, cripto]);

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen crypto"
        />
      </div>
      <div>
        <Heading>Cotizador de Cryptomonedas</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
        />
        {cargando ? <Spinner /> : <Cotizacion resultado={resultado} />}

      </div>
    </Contenedor>
  );
}

export default App;
