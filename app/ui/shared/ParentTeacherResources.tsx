import Image from "next/image";
import Button from "@mui/material/Button";
import ParentTeacherResourcesClient from "../pages/home/client/ParentTeacherResourcesClient";

export default function ParentTeacherResources() {
  return (
    <section className="base relative bg-gray-100 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-24 pb-32 sm:pb-36 md:py-32 md:pb-40">
        {/* Static background swoosh (can stay server-side) */}
        <div className="absolute left-1/2 bottom-12 sm:bottom-14 md:bottom-20 w-full -translate-x-1/2 pointer-events-none select-none">
          <Image
            src="/title-underline-gray.svg"
            alt=""
            width={1000}
            height={200}
            className="w-[300px] h-[28px] sm:w-[350px] sm:h-[38px] md:w-[480px] md:h-[38px] lg:w-[600px] lg:h-[48px] xl:w-[720px] xl:h-[60px] mx-auto"
          />
        </div>

        {/* ✅ Client island for animations (icons + scribble underline + title) */}
        <ParentTeacherResourcesClient />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">
          {/* underline lives in client island (animated), so no static underline here */}
          <div className="h-[70px]" aria-hidden="true" />

          <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl font-semibold text-blue-200">
            Guides, lesson plans, and instructions to help you share the faith with children.
          </p>

          <Button
            variant="contained"
            startIcon={
              <Image
                src="/folder-search.svg"
                alt=""
                width={20}
                height={20}
                style={{ marginRight: 4 }}
              />
            }
            disableElevation
            sx={{
              textTransform: "uppercase",
              borderRadius: "999px",
              px: 4,
              py: 1.4,
              fontWeight: 800,
              fontFamily: "Poppins, sans-serif",
              bgcolor: "#067099",
              color: "#FFFFFF",
              mt: 6,
              "&:hover": { bgcolor: "#085E7C" },
            }}
          >
            Explore Resources
          </Button>
        </div>
      </div>
    </section>
  );
}
