/**
 Este componente toma como props las funciones `isOpen` y `closeModal` desde el hook pesonalizado `useModal.js para abrir y cerrar el modal, toma tambien como prop la propiedad children de React donde se renderizan los componentes de `ProductSources`.
 */
import styles from "./Modal.module.css";
import {RiCloseCircleLine} from 'react-icons/ri'

const Modal = ({ children, isOpen, closeModal }) => {
  const handleOnclick = (e) =>{ e.stopPropagation()};
  return (
    <div
    onClick={closeModal} className={`${styles.modal} ${!isOpen && styles.isOpen}`}
     
    >
      <div className={styles.modal_container} onClick={handleOnclick}>
        <div onClick={closeModal} className={styles.modal_close}>
          <RiCloseCircleLine size={60} color='#b7b9bb'/>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
