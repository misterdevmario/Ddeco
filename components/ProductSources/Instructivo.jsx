
/**Este componenente pasa como prop el archivo pdf contenido en la prop `instructivo` hacia el componente `Pdfviewer.jsx` que se encarga de renderizar el mismo */

import Pdfviewer from "./PDF/PdfViewer";
import styles from "./ProductSource.module.css";

const Instructivo = ({ instructivo }) => {
  
  return (
    <div className={styles.container}>
      <Pdfviewer pdf={instructivo} />
    </div>
  );
};

export default Instructivo;