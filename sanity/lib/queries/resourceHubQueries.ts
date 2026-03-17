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
      label,
      iconKey,
      comingSoon,

      // ✅ canonical slug comes from the linked document
      target->{
        _type,
        title,
        "slug": slug.current
      }
    }
  }
}
`;

export const resourceHubLabelBySlugQuery = /* groq */ `
*[_type == "resourceHub" && isActive == true][0]{
  "label": (
    cards[].rows[
      target->slug.current == $slug
    ][0].label
  )
}
`;
