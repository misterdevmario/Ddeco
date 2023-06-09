import axios from 'axios'
import Head from 'next/head';

const Products = () => {
  return <>
       <Head>
        <title>Producto Ddeco | TL apps</title>
        <meta name="description" content="Inicio de sesion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicontlapps.svg" />
      </Head>
  </>
};

export default Products;

export async function getStaticPaths() {
  const { data } = await axios.get(
    "https://tlappshop.com/apis/api/sub-categories?filters[catalogo][$eq]=true&filters[category][category][$eq]=Tlapps ddeco&populate=*&pagination[limit]=800"
  );

  const categories = data.data.map((item) => `${item.attributes.subCategory}`);
  return {
    paths: categories.map((categoria) => ({
      params: { categoria },
    })),
    fallback: "blocking",
  };
}

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
      if (categories[i]?.category == categoryProductFiltered[j])
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
