import { useCallback, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function usePdfExport(filename = 'cdm-rapport') {
  const contentRef = useRef<HTMLDivElement>(null);

  const exportPdf = useCallback(async () => {
    const el = contentRef.current;
    if (!el) return;

    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f0f2f8',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${filename}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    }
  }, [filename]);

  return { contentRef, exportPdf };
}
