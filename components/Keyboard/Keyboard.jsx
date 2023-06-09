/**
 El componente representa un teclado virtual con botones para cada boton de teclas y botones adicionales para Backspace, espacio y cierre del teclado.
 Las funciones `onkeypress`,` handlebackspace`, `handlespace` y` cierres` se pasan como props al componente.
 */
import styles from'./Keyboard.module.css'

const Keyboard = ({ onKeyPress, handleBackSpace, handleSpace, close }) => {
  const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 
    'Z', 'X', 'C', 'V', 'B', 'N', 'M',"/", "-","_",".",
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];

  return (
    <div className={styles.container}>

      {keys.map((key, index) => (
        <button key={index} onClick={() => onKeyPress(key)}>
          {key}
        </button>
      ))}
     <div className={styles.lgbuttons}>
      <button onClick={()=>handleBackSpace()}>Borrar</button>
      <button onClick={()=>handleSpace()}>Espacio</button>
      <button onClick={()=>close(false)}>Cerrar</button>
     </div>
    </div>
  );
};

export default Keyboard;