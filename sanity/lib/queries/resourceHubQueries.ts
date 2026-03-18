export const resourceHubQuery = /* groq */ `
*[_type == "resourceHub" && isActive == true][0]{
  title,
  subtitle,
  cards[]{
    title,
    description,
    iconKey,
    themeKey,
    buttonLabel,
    buttonLinkType,
    buttonHref,
    buttonCollection->{ title, "slug": slug.current },

    rows[]{
      "title": target->title,
      "iconKey": target->iconKey,
      "slug": target->slug.current,
      comingSoon
    }
  }
}
`;

export const resourceHubLabelBySlugQuery = /* groq */ `
*[_type == "resourceHub" && isActive == true][0]{
  "label": (
    cards[].rows[
      target->slug.current == $slug
    ][0].target->title
  )
}
`;
