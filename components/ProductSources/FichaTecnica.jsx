/**
  Este componenente pasa como prop el archivo pdf contenido en la prop `ficha` hacia el componente `Pdfviewer.jsx` que se encarga de renderizar el mismo
 */
import Pdfviewer from "./PDF/PdfViewer";
import styles from "./ProductSource.module.css";

const FichaTecnica = ({ ficha }) => {
  return (
    <div className={styles.container}>
      <Pdfviewer pdf={ficha} />
    </div>
  );
};

export default FichaTecnica;
