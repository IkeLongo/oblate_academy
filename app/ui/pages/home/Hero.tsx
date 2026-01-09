import React from "react";
import { School } from "lucide-react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function OblateAcademyHero() {
  return (
    <section className="hero w-full bg-blue-200 min-h-screen pt-20 md:pt-0 pb-10 lg:pb-0">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <h1
          className="leading-tight sm:text-6xl font-extrabold text-blue-400"
          style={{ textShadow: "0 4px 4px rgba(0,0,0,0.12)" }}
        >
          Welcome to The Oblate Academy!
        </h1>

        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-2xl rounded-[10px] bg-white p-2 shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
            <img
              src="/hero-reading.png"
              alt="Parent reading with child"
              className="h-[350px] w-full rounded-[8px] object-cover"
            />
          </div>
        </div>

        <h4 className="mt-6 font-semibold text-white drop-shadow-sm">
          Nurturing hearts and minds rooted in the virtues!
        </h4>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          className="mt-7"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            startIcon={<School size={20} />}
            disableElevation
            sx={{
              textTransform: "none",
              borderRadius: "999px",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              width: { xs: '100%', sm: 'auto' },
              bgcolor: "#067099", // tailwind-ish sky-700/teal
              "&:hover": { bgcolor: "#04435C" },
            }}
          >
            Kinder - 2nd Grade
          </Button>

          <Button
            variant="contained"
            startIcon={<School size={20} />}
            disableElevation
            sx={{
              textTransform: "none",
              borderRadius: "999px",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              width: { xs: '100%', sm: 'auto' },
              bgcolor: "#C81E1E", // red-600
              "&:hover": { bgcolor: "#A01818" }, // red-700
            }}
          >
            3rd - 5th Grade
          </Button>
        </Stack>

        <div className="mt-6 flex justify-center">
          <Button
            variant="outlined"
            sx={{
              textTransform: "uppercase",
              borderRadius: "999px",
              px: 5,
              py: 1.5,
              fontWeight: 800,
              letterSpacing: "0.06em",
              borderWidth: 2,
              borderColor: "#FFDC00", // yellow-300
              color: "#FFDC00",
              width: { xs: '100%', sm: 'auto' },
              "&:hover": {
                borderColor: "#FFDC00",
                bgcolor: "#FFDC00",
                color: "#04435C", // sky-900-ish
              },
            }}
          >
            START YOU FAITH JOURNEY TODAY
          </Button>
        </div>
      </div>
    </section>
  );
}
