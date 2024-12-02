'use client';

import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import SideNavbar from "../sidebar";
import './docViewer.css';
//import type { PDFDocumentProxy } from 'pdfjs-dist';

// PDF Worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
  };
  
  const resizeObserverOptions = {};
  
  const maxWidth = 800;
  
  type PDFFile = string | File | null;
  
  export default function docViewer() {
    const [file, setFile] = useState<PDFFile>('/testdoc.pdf');
    const [numPages, setNumPages] = useState<number>(2);
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();
  
    const onResize = useCallback<ResizeObserverCallback>((entries) => {
      const [entry] = entries;
  
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    }, []);
  
    useResizeObserver(containerRef, resizeObserverOptions, onResize);
  
    function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
      const { files } = event.target;
  
      if (files && files[0]) {
        setFile(files[0] || null);
      }
    }
  
    // function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    //   console.log(numPages)
    //   setNumPages(nextNumPages);
    // }
  
    return (
        <main>
            <div className="Example">
                <header>
                <h1>react-pdf sample page</h1>
                </header>
                <div className="Example__container">
                <div className="Example__container__load">
                    <label htmlFor="file">Load from file:</label>{' '}
                    <input onChange={onFileChange} type="file" />
                </div>
                <div className="Example__container__document" ref={setContainerRef}>
                    <Document file={file} options={options}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                        />
                    ))}
                    </Document>

                </div>
                </div>
            </div>
            <SideNavbar/>
        </main>
    );
  }