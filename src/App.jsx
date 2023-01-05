import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { Formulario } from './components/Formulario';
import { Resultado } from './components/Resultado';
import { Spinner } from './components/Spinner';
import ImagenCripto from './img/imagen-criptos.png';



const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  width: 90%;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      console.log(monedas)

      const cotizarCripto = async () => {

        setCargando(true)
        setResultado({})

        const {state, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${state}`
        console.log(url);

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //dentro del objeto busca las propiedades que coincidan con criptomoneda y state, 
        //o sea la cripto y la moneda gusradads en el state
        setResultado(resultado.DISPLAY[criptomoneda][state])

        setCargando(false)
      }
      cotizarCripto();
    }
  }, [monedas])
  

  return (

    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt='Imagenes criptomonedas'
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMonedas={setMonedas}          
        />    
      {cargando && <Spinner />}     
     
      {resultado.PRICE && <Resultado resultado={resultado}/>}
       </div>
    </Contenedor>
  )
}

export default App
