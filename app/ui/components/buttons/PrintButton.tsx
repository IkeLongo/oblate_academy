"use client";
export default function PrintButton() {
  const handlePrint = () => {
    const printSection = document.getElementById("print-section");
    if (!printSection) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { background: white; margin: 0; padding: 2rem; font-family: 'Poppins', Arial, sans-serif; }
            .prose { max-width: none; }
            h1 { font-size: 2.2rem; color: #60a5fa; font-family: 'Fredoka', Arial, sans-serif; font-weight: 600; }
            .prose p { font-size: 1.35rem; line-height: 2.2; font-family: 'Poppins', Arial, sans-serif; }
          </style>
        </head>
        <body>${printSection.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="mt-8 print:hidden px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Print
    </button>
  );
}