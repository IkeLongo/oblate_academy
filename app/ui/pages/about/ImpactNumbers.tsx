import { ImpactNumbersClient } from "./client/ImpactNumbersClient";

export default function ImpactNumbers() {
  return (
    <section className="base relative bg-blue-400">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-100/70">
            Making a Difference
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-white leading-tight">
            Our Impact
          </h2>
        </div>

        <ImpactNumbersClient />
      </div>
    </section>
  );
}
