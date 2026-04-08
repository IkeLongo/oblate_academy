import Link from "next/link";
import { FAQSectionClient, type FAQItem } from "./client/FAQSectionClient";

const FAQS: FAQItem[] = [
  {
    question: "Is this content aligned with the Catechism of the Catholic Church?",
    answer:
      "Yes. Every resource at the Oblate Academy is developed in full alignment with the Catechism of the Catholic Church and the universal magisterium. We review all content for doctrinal accuracy and consult with knowledgeable Catholics to ensure fidelity.",
  },
  {
    question: "What grade levels does Oblate Academy serve?",
    answer:
      "Our resources are designed for children in Kindergarten through 5th Grade (K–5). Within that range, we offer grade-differentiated content for two bands: Kinder–2nd Grade and 3rd–5th Grade, so the material is always age-appropriate.",
  },
  {
    question: "Is this designed for homeschool families?",
    answer:
      "Absolutely. While our resources work beautifully in Catholic school classrooms, they are specifically designed to be used in the home by parents and families. No specialized training is required — just a love for the faith and your children.",
  },
  {
    question: "Are the saints and virtues drawn from a specific tradition?",
    answer:
      "Our saint resources embrace saints from across the full Catholic tradition — Roman, Eastern, ancient, and modern. Virtue content is rooted in the classical virtue tradition (prudence, justice, fortitude, temperance) alongside the theological virtues of faith, hope, and charity.",
  },
  {
    question: "Can educators use these resources in a Catholic school classroom?",
    answer:
      "Yes — many of our resources are classroom-ready. Teachers can use the lesson plans, activity kits, and printables as supplements to any existing faith formation curriculum. They also work well during homeroom, religion class, or as enrichment activities.",
  },
  {
    question: "Do I need to create an account to access resources?",
    answer:
      "Some resources are freely available to all visitors. A free account unlocks access to our full resource library. If you have any questions about access, don't hesitate to reach out through our contact page.",
  },
];

export default function FAQSection() {
  return (
    <section className="base bg-gray-100 overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            Questions & Answers
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
            Common Questions
          </h2>
        </div>

        <FAQSectionClient items={FAQS} />

        <p className="mt-8 text-center font-inria text-sm text-black/50">
          Have another question?{" "}
          <Link href="/contact" className="text-blue-300 hover:text-blue-400 underline underline-offset-2">
            Contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
