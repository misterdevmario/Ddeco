/**
   La función es un componente de React que muestra un archivo PDF con funcionalidad de zoom y panorámica.
   La función `Pdfviewer` devuelve un elemento JSX que contiene dos divs, uno con clase
  `lgpdf` y el otro con la clase `smpdf`. Cada div contiene una metodo `map()` que itera sobre un
   arreglo de archivos PDF y se renderizan en un componente `TransformWrapper` que envuelve un `TransformComponent`
   componente que contiene un componente `Documento` de la biblioteca `react-pdf`.
  */
import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
import styles from './PdfViewer.module.css'

export default function Pdfviewer({pdf}) {
  
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
   
   
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    return (
      <div className={styles.container} >
   <div className={styles.lgpdf}>
   {pdf.map((item, index) => (
      <TransformWrapper key={index}>
        <TransformComponent>
        <Document
          file={item}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="svg"
          
          
        >
          <Page pageNumber={pageNumber}
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          height={900}
          />
          
        </Document>
        </TransformComponent>
      </TransformWrapper>
    
    ) )}
   </div>

   <div className={styles.smpdf}>
   {pdf.map((item, index) => (
    
        <Document
        key={index}
          file={item}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="svg"
          
          
        >
          <Page pageNumber={pageNumber}
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          height={470}
          />
          
        </Document>
     
    
    ) )}
   </div>

     
      </div>
    );
  }
  