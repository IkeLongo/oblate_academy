import Image from "next/image";
import Button from "@mui/material/Button";
import FaithAndFunClient from "./FaithAndFunClient";

export default function FaithAndFun() {
  return (
    <div className="base relative bg-red-300">
      {/* TOP CLOUD BORDER */}
      <div className="absolute -top-5 md:-top-10 left-1/2 -translate-x-1/2 min-w-[110vw] z-30 pointer-events-none">
        <Image
          src="/cloud-border-red.webp"
          alt="Cloud border top"
          width={2400}
          height={300}
          priority
        />
      </div>

      <section className="relative z-40 bg-red-300 text-white">
        <div className="relative max-w-6xl mx-auto">
          {/* Background Illustration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/bible-characters-bg-red.svg"
              alt=""
              width={600}
              height={600}
              className="opacity-20 2xs:-translate-y-24 xs:-translate-y-10 sm:-translate-y-10"
            />
          </div>

          {/* DOT */}
          <Image
            src="/dots.webp"
            alt=""
            width={80}
            height={80}
            className="absolute left-6 top-10 pointer-events-none"
          />

          {/* ✅ Client island: icons + title + scribble + inView */}
          <FaithAndFunClient />

          {/* Static content can stay server-side */}
          <div className="relative flex flex-col items-center text-center">
            {/* (Client title block is inserted above; keep the rest here) */}

            <Image
              src="/bible-characters.webp"
              alt="Bible characters"
              width={520}
              height={360}
              className="mt-6"
            />

            <h3 className="mt-20 text-2xl sm:text-3xl font-extrabold">
              What makes our approach special?
            </h3>

            <p className="mt-4 text-xl font-inria max-w-2xl text-white/90">
              Our interactive approach combines traditional Catholic teachings
              with engaging activities that help children understand and embrace
              their faith journey.
            </p>

            <Button
              variant="contained"
              startIcon={
                <Image
                  src="/rosary.svg"
                  alt="Rosary icon"
                  width={24}
                  height={24}
                  style={{ marginRight: 4 }}
                />
              }
              disableElevation
              sx={{
                textTransform: "uppercase",
                borderRadius: "999px",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontFamily: "Poppins, sans-serif",
                width: { xs: "100%", sm: "auto" },
                bgcolor: "#DE7878",
                color: "#FDFDFD",
                mt: { xs: 8, md: 4 },
                border: "2px solid #FDFDFD",
                "&:hover": { border: "2px solid #FDFDFD" },
              }}
            >
              Explore Catholic Faith
            </Button>
          </div>
        </div>
      </section>

      {/* BOTTOM CLOUD BORDER */}
      <div className="absolute -bottom-5 md:-bottom-10 left-1/2 -translate-x-1/2 min-w-[110vw] z-10 pointer-events-none">
        <Image
          src="/cloud-border-red.webp"
          alt="Cloud border bottom"
          width={2400}
          height={300}
        />
      </div>
    </div>
  );
}
