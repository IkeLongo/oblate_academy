import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import PrintButton from "@/app/ui/components/buttons/PrintButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await client.fetch<{ title: string } | null>(
    `*[_type == "resource" && _id == $id][0]{ title }`,
    { id }
  );
  const title = data?.title ?? "Resource";
  return {
    title,
    description: `Access "${title}" — a Catholic educational resource from Oblate Academy.`,
    openGraph: { title: `${title} | Oblate Academy` },
    alternates: { canonical: `/resources/resource/${id}` },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = await client.fetch(
    `*[_type == "resource" && _id == $id][0]{
      title,
      body,
      image,
      pdfUrl,
      kind
    }`,
    { id }
  );

  if (!resource) return notFound();

  return (
    <section className="w-full bg-[#e0f2fe] min-h-screen py-10">
      <div id="print-section" className="max-w-2xl mx-auto print:p-0 print:bg-white print:min-h-0">
        <h1 className="text-2xl font-bold mb-4 print:mb-2 text-blue-300">{resource.title || "Resource"}</h1>
        {resource.kind === "image" && resource.image?.asset && (
          <img
            src={urlFor(resource.image).url()}
            alt={resource.title || "Resource Image"}
            className="mb-6 print:mb-2 max-w-full h-auto"
          />
        )}
        {resource.kind === "pdf" && resource.pdfUrl && (
          <iframe
            src={resource.pdfUrl}
            title="PDF Preview"
            className="w-full h-[80vh] mb-6 print:mb-2"
          />
        )}
        {resource.kind === "richText" && resource.body && (
          <div
            className="prose print:prose print:max-w-none"
            // style={{
            //   fontFamily: "'Poppins', Arial, sans-serif",
            // }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Poppins:wght@400;700&display=swap');
              h1 { font-size: 2.2rem; font-family: 'Fredoka', Arial, sans-serif; font-weight: 600; }
              p { font-family: 'Poppins', Arial, sans-serif; font-size: 1.25rem; line-height: 2.1; }
            `}</style>
            <PortableText value={resource.body} />
          </div>
        )}
      </div>
      <div className="max-w-2xl mx-auto ">
        <PrintButton />
      </div>
    </section>
  );
}