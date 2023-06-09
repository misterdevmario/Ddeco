/**El componente `Categorías` toma como props, `categoriesFiltered` y `products`. Devuelve una expresión JSX que incluye un componente `Head` con varios metadatos sobre la página, un componente `Navbar` que incluye los accesorios `categoriesFiltered` y `products`, un elemento `main` que contiene un componente `CategoriasCard` y un componente `Pie de página`.

Los datos de `categoriesFiltered` se obtienen mapeando los datos de `allCategories` y extrayendo las propiedades necesarias. Luego, la variable `rawproducts` se construye mapeando los datos de `allProducts` y extrayendo las propiedades necesarias. La variable `products` se inicializa como una copia de `rawproducts`. Luego, el ciclo elimina cualquier nombre de categoría no deseado de la propiedad `categoría` de cada `producto`.

La siguiente sección del código realiza un procesamiento adicional para crear la propiedad `categoriesFiltered`. Primero crea una variable `categoryProductFiltered` iterando sobre los datos `allProducts` y extrayendo todos los nombres de categoría únicos. A continuación, establece `categoryFilterLength` en la longitud más larga de las dos matrices, `categories` o `categoryProductFiltered`. Finalmente, recorre las dos matrices para construir la matriz `categoriesFiltered`, que contiene solo las categorías que tienen productos asociados con ellas.

La función `getStaticProps` devuelve un objeto que contiene el objeto `props` con los accesorios `categoriesFiltered`, `products` y `categories`, así como una propiedad `revalidate` que le dice a Next.js que regenere la página cada 10 segundos. */

import Head from "next/head";
//import Navbar from "../components/NavBar/NavBar";
import axios from "axios";
//import CategoriasCard from "../components/Categorias/CategoriasCard";
//import Footer from "../components/Footer/Footer";

function Categorias({ categoriesFiltered, products }) {
  return (
    <>
      <Head>
        <title>Categorias Ddeco | TL apps</title>
        <meta name="description" content="Inicio de sesion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicontlapps.svg" />
      </Head>
      {/* <Navbar categoriesFiltered={categoriesFiltered} products={products} /> */}
      <main>
        {/* <CategoriasCard category={categoriesFiltered} />
        <Footer /> */}
        Categorias
      </main>
    </>
  );
}

export default Categorias;

export async function getStaticProps() {
  const categoriesFiltered = [];
  const allCategories = await axios.get(
    "https://tlappshop.com/apis/api/sub-categories?filters[catalogo][$eq]=true&filters[category][category][$eq]=Tlapps ddeco&populate=*&pagination[limit]=800"
  );
  const allProducts = await axios.get(
    "https://tlappshop.com/apis/api/products?populate=sub_category,categories,thumbnail,ficha,instructivo,accesorios,galeria&filters[categories][category][$eq]=Tlapps ddeco&pagination[limit]=800"
  );

  const categories = allCategories.data.data.map((item) => ({
    id: item.id,
    subcategory: item.attributes.subCategory,
    image: item.attributes.cover.data.map((item) => item.attributes.url),
    bgImage: item.attributes.background.data.map((item) => item),
    thumbImg: item.attributes.thumbnail.data.map((item) => item),
  }));
  const products = allProducts.data.data.map((item) => ({
    id: item.id,
    name: item.attributes.description,
    codigo: item.attributes.sku,
    volt: item.attributes.voltaje,
    img: item.attributes.thumbnail.data.attributes.url,
    category: item.attributes.sub_category.data.attributes.subCategory,
  }));

  //Renderizado condicional de categorias en relacion a la existencia del producto

  const categoryProductFiltered = Array.from(
    new Set(
      allProducts.data.data
        .map((item) => item.attributes.sub_category.data.attributes.subCategory)
        .flat(1)
    )
  );
  
  /* Este código compara la longitud de dos arreglos, `categorías` y `categoríaProductoFiltrado`, y
  asignando la mayor longitud a la variable `categoryFilterLength`. Entonces, está iterando sobre los
  arreglos `categories` y `categoryProductFiltered` usando bucles for anidados, y empujando la coincidencia
  categorías a una nuevo arreglo llamado `categoriesFiltered`. El propósito de este código es filtrar sobre
  categorías basadas en la existencia de productos en cada categoría, y cree un nuevo arreglo con solo las
  categorías que tienen productos, asegurando que el numero de iteraciones siempre sea tomado del arreglo con
  la longitud mayor para que se itere sobre todas las categorias. */
  
  let categoryFilterLength = 0;
  
  categoryFilterLength =
  categories.length > categoryProductFiltered.length
  ? (categoryFilterLength = categories.length)
  : (categoryFilterLength = categoryProductFiltered.length);
  
  for (let i = 0; i < categoryFilterLength; i++) {
    for (let j = 0; j < categoryFilterLength; j++) {
      if (categories[i].subcategory == categoryProductFiltered[j])
      categoriesFiltered.push(categories[i]);
    }
  }
  return {
    props: {
      categoriesFiltered,
      products,
      categories,
    },
    revalidate: 10,
  };
}
