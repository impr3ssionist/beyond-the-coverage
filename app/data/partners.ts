// Partner logos for the Our Partners section
// Add your partner logos to the /public/images/partners/ folder
// Supported formats: SVG, PNG, WebP

export const partners = [
  {
    id: "cigna",
    name: "Cigna",
    logo: "/images/partners/cigna.svg",
    alt: "Cigna Healthcare"
  },
  {
    id: "kaiser",
    name: "Kaiser Permanente",
    logo: "/images/partners/kaiser.svg",
    alt: "Kaiser Permanente"
  },
  {
    id: "chamber",
    name: "Chamber of Commerce",
    logo: "/images/partners/chamber.svg",
    alt: "Local Chamber of Commerce"
  },
  {
    id: "bluecross",
    name: "Blue Cross Blue Shield",
    logo: "/images/partners/bluecross.svg",
    alt: "Blue Cross Blue Shield"
  },
  {
    id: "aetna",
    name: "Aetna",
    logo: "/images/partners/aetna.svg",
    alt: "Aetna Health Insurance"
  },
  {
    id: "united",
    name: "UnitedHealthcare",
    logo: "/images/partners/united.svg",
    alt: "UnitedHealthcare"
  },
  {
    id: "humana",
    name: "Humana",
    logo: "/images/partners/humana.svg",
    alt: "Humana Insurance"
  },
  {
    id: "anthem",
    name: "Anthem",
    logo: "/images/partners/anthem.svg",
    alt: "Anthem Blue Cross"
  }
] as const;

export type Partner = typeof partners[number];