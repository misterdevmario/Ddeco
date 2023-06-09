// Este  componente recibe cuatro props: `producto`, `productos`, `categorías` y `categorías filtradas`.

// El componente utiliza el hook `useRouter` de Next.js para acceder a los parámetros de consulta de la URL. Luego filtra el arreglo de `categorías` para obtener la imagen de fondo según la categoría en los parámetros de consulta.

// El componente devuelve un div con la clase `contenedor`. Este div contiene tres elementos secundarios:

// 1. Un div con la clase `background` y un componente `Imagen` como hijo. El componente `Imagen` muestra la imagen de fondo de la categoría.
// 2. Un componente `SideBar` que muestra las `categorías` y los `productos` filtrados.
// 3. Dos divs con clases `card_container` y `card_containermdsm`. Estos divs contienen una lista de tarjetas de productos, que se generan utilizando la prop `products`.

// Cada tarjeta de producto tiene un componente de "Imagen" para mostrar la imagen del producto, junto con el nombre del producto, el código y la información de voltaje. La información de "volt" se muestra condicionalmente en función de si está disponible para el producto.

// En general, este componente muestra una lista de productos con imágenes e información, junto con una barra lateral que muestra categorías y productos según la categoría seleccionada. La imagen de fondo cambia según la categoría seleccionada.

import Image from "next/image";
import SideBar from "../SideBar/SideBar";
import styles from "./ShowProducts.module.css";
import { useRouter } from "next/router";

const ShowAllProducts = ({ product, products, categories, categoriesFiltered }) => {
  const router = useRouter();
  let bgImage = categories.filter(img => img?.category === router.query.categoria).map(item => item.img).toString()


  const goProduct = (id) => {
    router.push(`/producto/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        
        <Image
          src={bgImage}
          alt={router.query.categoria}
          width={1750}
          height={920}
          quality={100}
          priority
        />
      </div>
      <SideBar categories={categoriesFiltered} products={products} />
      <div className={styles.card_container}>
        {product.map((item) => (
          <div
            key={item.id}
            className={styles.card}
            onClick={() => goProduct(item.id)}
          >
            <div className={styles.card_img}>
              <Image src={item.img} width={100} height={100} alt={item.name} />
            </div>
            <div className={styles.card_info}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.codigo}>SKU:{item.codigo}</div>
              {item.volt != null ? <div className={styles.volt}>VOLTAJE: {item.volt}</div> : null }
            </div>
          </div>
        ))}
      </div>

      <div className={styles.card_containermdsm}>
        {products
          .filter((cat) => cat.category[0] == router.query.categoria || cat.category[1] == router.query.categoria)
          .map((item) => (
            <div
              key={item.id}
              className={styles.cardmdsm}
              onClick={() => goProduct(item.id)}
            >
              <div className={styles.cardmdsm_img}>
                <Image
                  src={item.img}
                  width={100}
                  height={100}
                  alt={item.name}
                />
              </div>
              <div className={styles.cardmdsm_info}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.codigo}>SKU:{item.codigo}</div>
                {item.volt !== null ? <div className={styles.volt}>VOLTAJE: {item.volt}</div> : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowAllProducts;
