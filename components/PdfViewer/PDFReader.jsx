import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./pdfviewer.css";
import { LoaderPDF } from "./LoaderPDF";
import { ControlPanel } from "./ControlPanel";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDFReader = ({ url, disablePrint }) => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  useEffect(() => {
    disablePrint
      ? ""
      : window.addEventListener(
          "keydown",
          function (event) {
            if (
              event.keyCode === 80 &&
              (event.ctrlKey || event.metaKey) &&
              !event.altKey &&
              (!event.shiftKey || window.chrome || window.opera)
            ) {
              event.preventDefault();
              if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
              } else {
                event.stopPropagation();
              }
              return;
            }
          },
          true
        );
  }, []);

  return (
    <div className="pdfviewer-container">
      <LoaderPDF isLoading={isLoading} />
      <section id="pdf-section" className="controlpanel_wrapper">
        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file={url}
        />
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            devicePixelRatio={window.innerWidth < 500 ? 0.87 : 1}
          />
        </Document>
      </section>
    </div>
  );
};
