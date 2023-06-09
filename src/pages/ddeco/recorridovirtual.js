
// Este componente el recorrido virtual usando un iframe, junto con un encabezado y un pie de página. 

// El componente de la función devuelve un fragmento que contiene:
//    - Un componente Head que establece el título, la descripción, la ventana gráfica y el favicon para la página.
//    - Un componente NavBar que representa una barra de navegación en la parte superior de la página.
//    - Una etiqueta main con la clase "frame_container" que contiene un elemento iframe.
//    - El elemento iframe representa un recorrido virtual utilizando una URL de Matterport.
//    - El componente Footer que representa un pie de página en la parte inferior de la página.

// En general, este componente es una página simple que muestra un recorrido virtual usando un iframe junto con un encabezado y un pie de página para la navegación.


import Head from "next/head";
import NavBar from "../components/NavBar/NavBar";
import Footer from '../components/Footer/Footer'


export default function recorridoVirtual() {
  return (
    <>
      <Head>
        <title>Recorrido virtual | TL apps</title>
        <meta name="description" content="Recorrido virtual" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicontlapps.svg" />
      </Head>
      <NavBar />
      <main className="frame_container">
        <iframe
          src="https://my.matterport.com/show/?m=VdY42iYK1r5&play=1"
          className="frame"
        />
      </main>
        <Footer/>
    </>
  );
}

