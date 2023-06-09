
// Este  componente renderiza un solo producto en la página producto previamente generada en relacion a el parametro ID de la URL. Importa varios otros componentes, incluidos Image, SideBar y Modal, así como algunos estilos y animaciones CSS. El componente incluye varias props, incluido el producto en sí, el arreglo de categorías, el arreglo de categorías filtradas y el arreglo de todos los productos.

// Dentro del componente, hay varias funciones que usan el hook personalizado useModal para abrir y cerrar diferentes tipos de contenido, como video, ficha tecnica, instructivo y galería de imágenes. Las funciones se llaman cuando el usuario hace clic en ciertos elementos de la interfaz de usuario.

// El componente utiliza el componente Imagen de Next.js para renderizar la imagen del background. La fuente de la imagen se obtiene de la prop categorías y se filtra según la categoría del producto.

// El resto del componente brinda información sobre el producto, como su nombre, imagen, SKU y voltaje, condicionalmente si este en su propiedad no es igual a null o undefined generando los botones para cada tipo de contenido (video, ficha tecnica, instructivo y galería de imágenes) y abre el componente Modal correspondiente cuando se hace click.




import Image from "next/image";
import SideBar from "../SideBar/SideBar";
import styles from "./ShowOneProduct.module.css";
import { motion } from "framer-motion";
import { useModal } from "../Modal/useModal";
import Modal from "../Modal/Modal";
import Video from "../ProductSources/Video/Video";
import Instructivo from "../ProductSources/Instructivo";
import FichaTecnica from "../ProductSources/FichaTecnica";
import Galeria from "../ProductSources/Galeria";
import { useRouter } from "next/router";

const ShowOneProduct = ({ product, categories, categoriesFiltered, products }) => {
  1;
  const router = useRouter();
  let bgImage = categories
    .filter((img) => img?.category == product.category[0])
    .map((product) => product.img)
    .toString();
  const [isOpenVideo, openVideo, closeVideo] = useModal(true);
  const [isOpenFicha, openFicha, closeFicha] = useModal(true);
  const [isOpenInstructivo, openInstructivo, closeInstructivo] = useModal(true);
  const [isOpenGaleria, openGaleria, closeGaleria] = useModal(true);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src={bgImage}
          alt={router.query.categoria}
          width={1750}
          height={920}
          priority
        />
      </div>
      <SideBar categories={categoriesFiltered} products={products} />
      <div className={styles.card_container}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className={styles.card_container_card}
        >
          <div className={styles.name}>{product.name}</div>
          <div className={styles.source_info}>
            <div className={styles.info}>
              <div className={styles.img}>
                <Image
                  src={product.img}
                  width={160}
                  height={160}
                  alt={product.name}
                  priority
                />
              </div>
              <div className={styles.info_product}>
                <div className={styles.codigo}>SKU:{product.codigo}</div>
                {product.volt !== null ? (
                  <div className={styles.volt}>Voltaje: {product.volt}</div>
                ) : null}
              </div>
            </div>
            <div className={styles.source}>
              {product.video == null ||
              product.video == undefined ||
              product.video == [] ? null : (
                <div onClick={openVideo} className={styles.video}>
                  Video de instalación{" "}
                  <Image
                    src="/videoInstalacion.svg"
                    alt="Video de instalacion"
                    width={45}
                    height={45}
                    priority
                  />
                  <Modal isOpen={isOpenVideo} closeModal={closeVideo}>
                    <Video video={product.video} />
                  </Modal>
                </div>
              )}

              {product.ficha == null ||
              product.ficha == undefined ||
              product.ficha == [] ? null : (
                <div onClick={openFicha} className={styles.ficha}>
                  Ficha técnica
                  <Image
                    src="/fichaTecnica.svg"
                    alt="Ficha tecnica"
                    width={45}
                    height={45}
                    priority
                  />
                  <Modal isOpen={isOpenFicha} closeModal={closeFicha}>
                    <FichaTecnica ficha={product.ficha} />
                  </Modal>
                </div>
              )}

              {product.instructivo == null ||
              product.instructivo == [] ||
              product.instructivo == undefined ? null : (
                <div onClick={openInstructivo} className={styles.instructivo}>
                  Instructivo
                  <Image
                    src="/instructivo.svg"
                    alt="Instructivo"
                    width={45}
                    height={45}
                    priority
                  />
                  <Modal
                    isOpen={isOpenInstructivo}
                    closeModal={closeInstructivo}
                  >
                    <Instructivo instructivo={product.instructivo} />
                  </Modal>
                </div>
              )}

              {product.galeria == [] ||
              product.galeria == null ||
              product.galeria == undefined ? null : (
                <div onClick={openGaleria} className={styles.galeria}>
                  Galería de imágenes
                  <Image
                    src="/galeriaImagenes.svg"
                    alt="Galeria"
                    width={45}
                    height={45}
                    priority
                  />
                  <Modal isOpen={isOpenGaleria} closeModal={closeGaleria}>
                    <Galeria galeria={product.galeria} />
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShowOneProduct;
