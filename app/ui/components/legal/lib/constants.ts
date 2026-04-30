export const LEGAL = {
  companyLegalName: process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME ?? "Oblate Academy",
  dbaName: process.env.NEXT_PUBLIC_DBA_NAME ?? "Oblate Academy",
  businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "support@mail.oblateacademy.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "210-111-1111",

  address: {
    line1: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_LINE1 ?? "323 Oblate Dr.",
    city: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_CITY ?? "San Antonio",
    state: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_STATE ?? "TX",
    zip: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_ZIP ?? "78216",
    country: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY ?? "United States of America",
  },

  lastUpdatedPrivacy: process.env.NEXT_PUBLIC_PRIVACY_LAST_UPDATED ?? "April 4, 2026",
  lastUpdatedTerms: process.env.NEXT_PUBLIC_TERMS_LAST_UPDATED ?? "April 4, 2026",
  lastUpdatedCookies: process.env.NEXT_PUBLIC_COOKIES_LAST_UPDATED ?? "April 4, 2026",
};