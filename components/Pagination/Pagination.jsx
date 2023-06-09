/**
   Este componente para la paginación  toma en cuenta el número de productos por página, el total
número de productos y una función para manejar la paginación, y devuelve un contenedor con una página en la que se puede hacer click para cambiar de pagina.
 El componente Pagination, que representa un contenedor div con una lista de números de página como divs. El número de página activo se resalta con una clase CSS diferente según el estado de la variable `activeClass` del hook useState. Cuando se hace click en un número de página, se llama a la función de paginar con el número de página correspondiente como argumento, y el estado activeClass se actualiza para resaltar el número de página en la que se hizo click.
  */

import { useState } from "react";
import styles from "./Pagination.module.css";




const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
 
  const [activeClass, setActiveClass] = useState(1)


 

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
 
  
  }


  return (
    <div className={styles.container}>
      {pageNumbers.map((item) => (
        <div
          key={item}
          className={activeClass == item ? `${styles.active}` : `${styles.number}`}
          onClick={() => {paginate(item); setActiveClass(item)}}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
