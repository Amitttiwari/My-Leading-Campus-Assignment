import * as pdfjsLib from 'pdfjs-dist/webpack';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = pdfWorker;


const extractPDFText = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const typedArray = new Uint8Array(arrayBuffer);
  const pdf = await pdfjsLib.getDocument(typedArray).promise; // ← this is invalid


  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};

export default extractPDFText;
