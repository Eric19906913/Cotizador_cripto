import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripto';
import Error from './Error';
import axios from 'axios';

const Boton = styled.input`
  margin-top:20px;
  font-weight:bold;
  font-size:20px;
  padding:10px;
  background-color:#66A2FE;
  border:none;
  width:100%;
  border-radius:10px;
  color:#FFF;
  transition:background-color .3s ease;

  &:hover{
    cursor:pointer;
    background-color:#326AC0;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) =>{

  const [listaCripto, guardarCripto] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    {codigo: 'USD', nombre:'Dolar de EEUU'},
    {codigo: 'MXN', nombre:'Peso Mexicano'},
    {codigo: 'EUR', nombre:'Euro'},
    {codigo: 'GBP', nombre:'Libra Esterlina'},
    {codigo: 'ARG', nombre:'Peso Argentino'}
  ]

  const [moneda, SelectMoneda] = useMoneda('Elige tu moneda','',MONEDAS);
  const [cripto, SelectCripto] = useCripto('Elige tu criptomoneda', '',listaCripto);

  const apiKEY = '3f91b6971a68bdcb16578ea7b2d9aad5fcbd511f055676361e2fcf448edb1035';

  useEffect(()=>{
    const consultApi = async ()=>{
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${apiKEY}`;

      const resultado = await axios.get(url);
      guardarCripto(resultado.data.Data);
    }
    consultApi();
  }, []);

  const cotizarMoneda = e=>{
    e.preventDefault();

    if(moneda === ''|| cripto === ''){
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptoMoneda(cripto);
  }

  return(
    <form
      onSubmit={cotizarMoneda}
    >
      {error? <Error mensaje="Todos los campos son obligatorios"></Error> :null}
      <SelectMoneda />
      <SelectCripto />
      <Boton
        type="submit"
        value="Calcular"
      />
    </form>
  );
}

Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptoMoneda: PropTypes.func.isRequired
}

export default Formulario;
