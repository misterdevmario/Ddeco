
/**Este código define un componente React llamado `CategoriasCard` que muestra un conjunto de tarjetas que contienen categorías, con cada tarjeta que muestra una imagen y un nombre de la categoría.

El componente toma una sola prop: 'categoría', el cual es un arreglo de objetos que contienen información sobre cada categoría. El hook `useRouter` de Next.js se usa para manejar el enrutamiento, y el componente 'Image` de Next.js se usa para mostrar las imágenes.

En la función `goProducts`, el método` router.push()` se usa para navegar a una nueva página cuando se hace clic en una tarjeta, pasando el `ID` de la categoría en la URL.

 */

import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./CategoriasCard.module.css";

const CategoriasCard = ({ category }) => {
  const router = useRouter();
  const goProducts = (id) => {
    router.push(`/categoria/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_container}>
        {category.map((item) => (
          <div
            key={item.id}
            className={styles.card}
            onClick={() => goProducts(item.category)}
          >
            <div className={styles.card_img}>
              <Image
                src={item.img}
                alt="logo"
                width={215}
                height={150}
                priority
              />
            </div>
            <div className={styles.card_name}>{item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriasCard;
