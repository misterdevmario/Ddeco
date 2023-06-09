

// El componente toma un la prop `galeria`, que es un arreglo de URL's de imágenes que se mostrarán en la galería. La imagen actual que se muestra en la galería se rastrea mediante el enlace useState, que inicializa el estado actual en 0.

// El componente tiene dos funciones: `prev()` y `next(). La función `prev()`   disminuye el estado actual en uno, para que se pueda mostrar la imagen anterior en la galería. Si el estado actual ya es 0, vuelve a la última imagen de la galería. La función `next()` funciona de manera similar, incrementando el estado actual en uno para mostrar la siguiente imagen y regresando a la primera imagen si el estado actual ya está en la última imagen de la galería.

// El objeto slideStyles se utiliza para aplicar estilo a la imagen principal de la galería, que se muestra en un elemento div con la clase carousel_slide. La imagen de fondo de este div se establece utilizando el estado actual para determinar qué imagen de la galería mostrar. Las propiedades width, height y borderRadius se establecen para dar a la imagen una forma cuadrada con esquinas redondeadas, y las propiedades backgroundPosition y backgroundSize se establecen para centrar la imagen y escalarla para que se ajuste al div.

// El componente devuelve un elemento div con el contenedor de clase, que contiene la imagen principal div y un div con la clase galeriasm que muestra una fila de imágenes más pequeñas debajo de la imagen principal. Si la galería tiene solo una imagen, los botones anterior() y siguiente() no se muestran. De lo contrario, se muestran dos botones con los íconos FcPrevious y FcNext, y sus eventos onClick están configurados para llamar a las funciones prev() y next(), respectivamente. Finalmente, el componente se mapea sobre el apoyo de galeria para mostrar las imágenes más pequeñas usando el componente de imagen Next.js, que toma la URL de la imagen como un accesorio src y establece los accesorios de ancho, alto, alt, calidad y prioridad. 



import { useState } from "react";
import Image from "next/image";
import styles from "./ProductSource.module.css";
import { FcPrevious, FcNext } from "react-icons/fc";

const Galeria = ({ galeria }) => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    const first = current === 0
    const index = first ? galeria.length -1 : current -1
    setCurrent(index)
  }
  const next = () => {
    const last = current === galeria.length -1
    const index = last ? 0 : current + 1
    setCurrent(index)
  }

  const slideStyles = {
    width: "80vh",
    height: "80vh",
    borderRadius: "8px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${galeria[current]})`,
    position: "relative",
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel_slide} style={slideStyles}>
        {galeria.length === 1 ? null : (
          <div className={styles.carousel_controllers}>
            <FcPrevious size={50} onClick={() => prev()} />
            <FcNext size={50} onClick={()=> next()} />
          </div>
        )}
      </div>
        <div className={styles.galeriasm}>
          {galeria.map((item, i) => (
            <Image key={i} src={item} width={500} height={500} alt="galeria" quality={100} priority/>
          ))}
        </div>
    </div>
  );
};

export default Galeria;
