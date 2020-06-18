import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight:bold;
  font-size:2.4rem;
  margin-top:2rem;
  display:block;
`;

const Select = styled.select`
  width:100%;
  display:block;
  font-size:1.2rem;
  padding:1rem;
  -webkit-appearance:none;
  border-radius:10px;
  border:none;
`

//label es lo que muestra el label
//state inicial es un string vacio
//opciones es la lista de opciones de criptomonedas traida de la API
const useCripto = (label, stateInicial, listaCripto) =>{

  //State del hooks
  const [state, actualizarState] = useState(stateInicial);

  const SelectCripto = () =>(
    <Fragment>
      <Label>{label}</Label>
      <Select
        onChange={e => actualizarState(e.target.value)}
        value={state}
      >
        <option>--Seleccione--</option>
        {listaCripto.map(cripto=>(
          <option key={cripto.CoinInfo.Id} value={cripto.CoinInfo.Name}>{cripto.CoinInfo.FullName}</option>
        ))}
      </Select>
    </Fragment>
  );

  return [state, SelectCripto, actualizarState];
}

export default useCripto;
