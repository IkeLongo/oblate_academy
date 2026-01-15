export type CardColorConfig = {
  text: string;
  border: string;
  bg: string;
};

export type RelatedSectionTheme = {
  sectionBg: string;              // e.g. "bg-blue-200"
  headingText?: string;           // e.g. "text-blue-400"
  cardColors?: CardColorConfig[]; // array = rotation strategy
};
