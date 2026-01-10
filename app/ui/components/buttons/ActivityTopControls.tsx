'use client';
import Link from "next/link";
import { FiPrinter } from "react-icons/fi";

export function ActivityTopControls({ grade, slug, basePath, pdfUrl }: { grade: string; slug: string; basePath: "saints" | "virtues"; pdfUrl: string }) {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/${grade}/${basePath}/${slug}`}
        className="inline-flex text-blue-400 h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/80 transition"
        aria-label="Back"
      >
        ←
      </Link>
      <div className="flex gap-2 ml-auto">
        <button
          type="button"
          onClick={() => {
            const proxied = `/api/pdf?url=${encodeURIComponent(pdfUrl)}`;

            const iframe = document.createElement("iframe");
            iframe.style.position = "fixed";
            iframe.style.right = "0";
            iframe.style.bottom = "0";
            iframe.style.width = "0";
            iframe.style.height = "0";
            iframe.style.border = "0";
            iframe.src = proxied;

            iframe.onload = () => {
              const w = iframe.contentWindow;
              if (!w) return;

              const cleanup = () => {
                w.removeEventListener("afterprint", cleanup);
                iframe.remove();
              };

              // ✅ remove when printing is finished (or print dialog closes)
              w.addEventListener("afterprint", cleanup);

              w.focus();
              w.print();

              // ✅ fallback: if afterprint doesn't fire on some browsers
              setTimeout(() => {
                if (document.body.contains(iframe)) iframe.remove();
              }, 60_000);
            };

            document.body.appendChild(iframe);
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/80 transition"
          aria-label="Print PDF"
          title="Print PDF"
        >
          <FiPrinter className="w-6 h-6 text-blue-400" />
        </button>
        <Link
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/80 transition"
          aria-label="Open PDF"
          title="Open PDF"
        >
          <img src="/pdf.svg" alt="PDF" className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}