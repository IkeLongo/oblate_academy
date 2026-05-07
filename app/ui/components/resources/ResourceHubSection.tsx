/* eslint-disable @typescript-eslint/no-explicit-any */
import { hubThemeMap, type HubThemeKey } from "@/app/ui/theme/resourceHubTheme";
import { ResourceCategoryCard } from "./ResourceCategoryCard";

type HubData = {
  title: string;
  subtitle: string;
  cards: Array<{
    _key?: string;
    isActive?: boolean;
    themeKey: HubThemeKey;
    title: string;
    description: string;
    iconKey: string;
    rows: any[];
    buttonLabel?: string | null;
    buttonLinkType: "href" | "collection" | "none";
    buttonHref?: string | null;
    buttonCollection?: any | null;
  }>;
};

export function ResourceHubSection({ hub }: { hub: HubData }) {
  const activeCards = (hub.cards || []).filter((c) => c.isActive !== false);

  // Debug logging for Sanity Studio preview mode
  // console.log("🔍 ResourceHubSection - hub data:", {
  //   totalCards: hub.cards?.length,
  //   activeCards: activeCards.length,
  //   cardThemes: activeCards.map(c => ({ title: c.title, themeKey: c.themeKey, iconKey: c.iconKey }))
  // });

  return (
    <div className="base bg-linear-to-br from-[#EFF6FF] to-[#F0FDF4]">
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-0 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              {hub.title}
            </h2>
            <p className="mt-3 text-base text-slate-600 md:text-lg">{hub.subtitle}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCards.map((card) => {
              // Defensive fallback for themeKey
              const themeKey = typeof card.themeKey === "string" && card.themeKey in hubThemeMap ? card.themeKey : "blue";
              const theme = hubThemeMap[themeKey];
              if (!theme) {
                console.warn("Theme is undefined for card:", card);
              }
              return (
                <ResourceCategoryCard
                  key={card._key || card.title}
                  card={card as any}
                  theme={theme}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
