/**
 La función anterior es un componente React que hace un pie de página con un mensaje y un módulo CSS estilo.
 Retorna un componente React que representa un elemento `div` con un contenido de texto y un 'classname` atributo establecido en el valor de `styles.container`, que es un nombre de clase de módulo CSS importado desde el archivo `Footer.module.css` .
 */
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
        ILUMINAMOS Y DIGITALIZAMOS TUS ESPACIOS | © TL apps - 2022
    </div>
  )
}

export default Footer