
// Este componente muestra una barra de búsqueda, una lista de categorías y un componente de teclado. Recibe dos props: `categories` y `products`.

// El componente usa el hook `useState` de React para administrar su estado. Declara tres variables de estado: `show`, `input` y `result`. `show` controla si el componente del teclado se muestra o no, `input` almacena la consulta de búsqueda actual y `result` almacena los productos filtrados según la consulta de búsqueda.

// La función `filter` filtra los productos según la consulta de búsqueda y almacena los resultados en la variable de estado `resultado`. Se llama cada vez que cambia la consulta de búsqueda o se presiona una tecla en el teclado.

// La función `handleSearch` actualiza la variable de estado `input` y llama a la función `filter` para actualizar la variable de estado `result` en función de la nueva consulta de búsqueda.

// La función `handleKeyPress` actualiza la variable de estado `input` agregando la tecla presionada y llama a la función `filter` para actualizar la variable de estado `result` en función de la nueva consulta de búsqueda.

// La función `handleBackSpace` actualiza la variable de estado `input` eliminando el último carácter y llama a la función `filter` para actualizar la variable de estado `result` según la nueva consulta de búsqueda.

// La función `handleSpace` actualiza la variable de estado `input` agregando un carácter de espacio y llama a la función `filter` para actualizar la variable de estado `resultado` en función de la nueva consulta de búsqueda.

// El componente `SideBar` genera un `div` con clase `sidebar_container` que contiene dos componentes secundarios: un componente de teclado que se muestra cuando `show` es verdadero y un `div` con clase `search` que contiene un campo de entrada, un icono de teclado y un componente "Search" que muestra los resultados de la búsqueda.

// El campo de entrada tiene el atributo `value` establecido en la variable de estado `input` y el atributo `onChange` establecido en la función `handleSearch`.

// El ícono del teclado tiene un atributo `onClick` que establece `show` en verdadero.

// Al componente `Search` se le pasan los accesorios `result`, `input`, `close`, `setInput` y `filter`. Muestra los resultados de la búsqueda y proporciona un botón para cerrar el componente del teclado.

// El componente `SideBar` también genera un `div` con la clase `category_container` que contiene una lista de elementos de categoría. Cada elemento de categoría tiene un componente `Link` que navega a una página de categoría y un componente `Imagen` que muestra una imagen en miniatura.

import { useState } from "react";
import Image from "next/image";
import styles from "./SideBar.module.css";
import { FaRegKeyboard } from "react-icons/fa";
import Link from "next/link";
import Search from "../Search/Search";
import Keyboard from "../Keyboard/Keyboard";


const SideBar = ({ categories, products }) => {
  
  const [show, setShow] = useState(false)
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);

  /**
 Esta funcion filtra los productos que seran renderizados en el componente `Search.jsx` pasando el arreglo con los productos mediante la prop `input`.
 */
  const filter = (value) => {
    const results = products.filter((item) => {
      return (
        (value &&
          item &&
          item.name &&
          item.name.toUpperCase().includes(value.toUpperCase())) ||
        (value &&
          item &&
          item.codigo &&
          item.codigo.toUpperCase().includes(value.toUpperCase()))
      );
    });
    setResult(results);
  };

  const handleSearch = (value) => {
    setInput(value);
    filter(value);
  };

  const handleKeyPress = (key) => {
    setInput(input + key);
    filter(input + key);
  };

  const handleBackSpace =()=>{
    setInput(input.slice(0, -1))
    filter(input.slice(0, -1))
  }

  const handleSpace =()=>{
    setInput(input + " ")
    filter(input + " ")
  }

  return (
    <div className={styles.sidebar_container}>
        {show ? (
          <Keyboard onKeyPress={handleKeyPress} handleBackSpace={handleBackSpace} handleSpace={handleSpace} close = {setShow}/>
        ) : null}
      <div className={styles.search}>
        <input
          type="search"
          name="product"
          placeholder="Buscar"
          value={input}
          onChange={(e) => {handleSearch(e.target.value)}}
        />
        <FaRegKeyboard size={35} color="#fff" onClick={() => setShow(true)} />
        <Search result={result} input={input} close={setShow} setInput = {setInput} filter= {filter} />
      </div>
      <div className={styles.category_container}>
        {categories
          .map((item) => (
            <div className={styles.category} key={item.id}>
              <Link href={`/categoria/${item.category}`} style={{}}>
                <div className={styles.category_name}>{item.category}</div>
              </Link>
              <Image
                src={item.thumbImg}
                width={20}
                height={20}
                alt="logo"
                priority
              />
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default SideBar;
