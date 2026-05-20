import type { Metadata } from "next";
import { BookOpen, Heart, Users } from "lucide-react";
import Script from "next/script";

type ImpactCardProps = {
  title: string;
  description: string;
  borderColor: string;
  backgroundColor: string;
  iconColor: string;
  icon: React.ReactNode;
};

const IMPACT_CARDS: ImpactCardProps[] = [
  {
    title: "Catholic Educational Resources",
    description:
      "Your support helps us create faithful, engaging resources that make Catholic teaching clear and joyful for children and educators.",
    borderColor: "border-blue-300",
    backgroundColor: "bg-blue-50",
    iconColor: "text-blue-300",
    icon: <BookOpen size={40} strokeWidth={1.5} />,
  },
  {
    title: "Family Faith Formation",
    description:
      "Donations equip parents and caregivers with practical guides that strengthen prayer, conversation, and discipleship at home.",
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-50",
    iconColor: "text-yellow-700",
    icon: <Users size={40} strokeWidth={1.5} />,
  },
  {
    title: "Virtue-Based Lessons",
    description:
      "Giving sustains monthly virtue-centered lessons that form hearts in compassion, integrity, and a lifelong love for Christ.",
    borderColor: "border-green-400",
    backgroundColor: "bg-green-50",
    iconColor: "text-green-500",
    icon: <Heart size={40} strokeWidth={1.5} />,
  },
];

function ImpactCard({
  title,
  description,
  borderColor,
  backgroundColor,
  iconColor,
  icon,
}: ImpactCardProps) {
  return (
    <div
      className={`rounded-3xl border-2 ${borderColor} ${backgroundColor} p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className={iconColor}>{icon}</div>
      <h3 className="font-fredoka font-extrabold text-xl text-black">{title}</h3>
      <p className="font-inria text-base leading-relaxed text-black/70">{description}</p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Support Oblate Academy — Donate",
  description:
    "Support Oblate Academy's Catholic mission. Your donation helps provide resources, virtue-based lessons, and family faith formation materials.",
  alternates: {
    canonical: "/donate",
  },
  openGraph: {
    title: "Support Oblate Academy — Donate",
    description:
      "Support Oblate Academy's Catholic mission. Your donation helps provide resources, virtue-based lessons, and family faith formation materials.",
  },
};

export default function DonatePage() {
  return (
    <div className="overflow-hidden">
      <section
        className="hero relative w-full overflow-hidden min-h-[100vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero/jesus_embracing_children.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 pt-36 navdesk:py-32 navdesk:pt-32 flex flex-col items-center text-center w-full">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-yellow-300">
            Faithfully Forming Hearts
          </p>
          <h1 className="mt-4 font-fredoka font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl">
            Support Oblate Academy
          </h1>
          <p className="mt-6 max-w-3xl font-inria text-base sm:text-lg leading-relaxed text-white/90">
            Your generosity helps families, parishes, and schools nurture children in faith,
            virtue, and truth through trusted Catholic resources and formation materials.
          </p>
          <p className="mt-4 font-inria text-sm sm:text-base italic text-yellow-200">
            &ldquo;Let all that you do be done in love.&rdquo; - 1 Corinthians 16:14
          </p>
        </div>
      </section>

      <section className="base relative bg-blue-100">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
              Mission Impact
            </p>
            <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
              What Your Donation Supports
            </h2>
            <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-neutral-800">
              Every gift directly supports Catholic formation for children and families through
              practical, faith-filled learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {IMPACT_CARDS.map((card) => (
              <ImpactCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="base relative bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="text-center">
            <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
              Give with Confidence
            </p>
            <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
              Make a Donation
            </h2>
            <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-black/70">
              Thank you for considering a gift. Your support helps us continue serving families and
              educators with faithful Catholic resources.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-3xl rounded-3xl border-2 border-blue-100 bg-gray-100 p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="w-full rounded-2xl bg-white p-0 overflow-hidden">
                <div className="w-full min-h-[838px]">
                  <iframe
                    src="https://links.rivercitycreatives.com/widget/form/4NdRuk5G2pqT0HQKMBI7"
                    style={{ width: "100%", minHeight: "838px", border: "none", borderRadius: "8px" }}
                    id="inline-4NdRuk5G2pqT0HQKMBI7"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Website Donation Form"
                    data-height="838"
                    data-layout-iframe-id="inline-4NdRuk5G2pqT0HQKMBI7"
                    data-form-id="4NdRuk5G2pqT0HQKMBI7"
                    title="Website Donation Form"
                  />
                </div>
              </div>

              {/* <div className="mt-6 flex justify-center">
                <a
                  href="https://links.rivercitycreatives.com/widget/form/4NdRuk5G2pqT0HQKMBI7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-10 py-[0.9rem] text-sm font-extrabold uppercase tracking-wide text-yellow-900 transition-colors hover:bg-yellow-300"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Open Secure Donation Form
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Script
        src="https://links.rivercitycreatives.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <section className="base relative bg-blue-100">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
          <h2 className="font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
            Thank You for Your Generosity
          </h2>
          <p className="mt-4 font-inria text-base sm:text-lg leading-relaxed text-black/70">
            We are deeply grateful for your support. With your help, Oblate Academy can continue
            forming young hearts in Christ and serving families with hope, truth, and joy.
          </p>
        </div>
      </section>
    </div>
  );
}