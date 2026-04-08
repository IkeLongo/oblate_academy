import React from "react";
import { School } from "lucide-react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GradeAnchorLink } from "@/app/ui/components/nav/GradeAnchorLink";
import { AutoplayMuxVideo } from "@/app/ui/components/videos/AutoPlayMux";

export default function OblateAcademyHero() {
  return (
    <section className="hero w-full bg-blue-200 min-h-screen pt-20 navdesk:pt-0 pb-10 lg:pb-0">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <h1
          className="leading-tight sm:text-6xl font-extrabold text-blue-400"
          style={{ textShadow: "0 4px 4px rgba(0,0,0,0.12)" }}
        >
          Welcome to The Oblate Academy!
        </h1>

        <div className="mt-8 flex justify-center">
          <AutoplayMuxVideo
            playbackId="pzuJNPXv6k0100ynetUZkb8fnakkCpbCV6k3fD7ygBvOA"
            className="w-full rounded-[8px] object-cover"
            videoTitle="Oblate Academy - Home Hero Video"
          />
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
          <GradeAnchorLink
            grade="gk_2"
            className="w-full md:w-auto no-underline">
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
                fontFamily: "Poppins, sans-serif",
                width: { xs: "100%", sm: "auto" },
                bgcolor: "#067099",
                "&:hover": { bgcolor: "#04435C" },
              }}
            >
              Kinder - 2nd Grade
            </Button>
          </GradeAnchorLink>

          <GradeAnchorLink
            grade="g3_5"
            className="w-full md:w-auto no-underline">
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
          </GradeAnchorLink>
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
