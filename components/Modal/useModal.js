/**
Este es un hook personalizado que devuelve un arreglo con un valor booleano y dos funciones para abrir y
cerrar el componente modal.
 */
import { useState } from "react";

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const openModal = (e) => setIsOpen(true); 
  const closeModal = () => setIsOpen(false);
  return [isOpen, closeModal, openModal];
};
