/** Central content & links — adjust URLs here or via NEXT_PUBLIC_* env vars. */

/** Prefix for static files under `public/` when using GitHub Pages `/<repo>/`. */
function publicBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
}

function publicAsset(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${publicBasePath()}${p}`;
}

export const profile = {
  fullName: "Muthama Francis Musau",
  shortName: "Muthama Francis",
  title: "Software developer",
  headline:
    "I'm a full-stack developer passionate about technology that solves real-world problems. I also work with data analytics and enjoy building dependable products.",
  bio: "My solutions range from different spaces from personal projects and hackathon-winning MVPs to systems currently scaling with real users.",
  email: "francisfrancs02@gmail.com",
  phoneDisplay: "+254 769 892 579",
  phoneWa: "254769892579",
  github: "https://github.com/MuthamaFrancs",
  githubUsername: "MuthamaFrancs",
  linkedin: "https://www.linkedin.com/in/muthama-francis-5b4b25210/",
  /** Replace in .env.local with your real Instagram URL */
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/",
  cvUrl:
    process.env.NEXT_PUBLIC_CV_URL ??
    "https://docs.google.com/document/d/1cGT19ZYfWyZloZDafufmEOyCONFTQTvW2Dmb8sLnISI/edit?usp=sharing",
  /** File must live in `public/assets/images/` (see also `assets/images/` in repo). */
  profileImage: publicAsset("/assets/images/profileyaalast.jpeg"),
} as const;

export const navItems = [
  { id: "home", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech" },
  { id: "career", label: "Career" },
  { id: "side-quests", label: "Side quests" },
  { id: "connect", label: "Connect" },
] as const;

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  image: string;
  links: { label: string; href: string; external?: boolean }[];
  badge?: string;
};

/** Ordered for impact: innovation → recognition → depth → community → mobile. */
export const projects: Project[] = [
  {
    slug: "ramani",
    title: "Ramani.ai",
    tagline: "Event safety & emergency coordination",
    description:
      "Hackathon-winning startup direction: a full-stack platform that improves incident response and communication during events — clearer roles, faster coordination, and safer crowds.",
    tech: ["Full-stack", "Startup MVP", "Realtime UX"],
    image: publicAsset("/assets/images/ramaniai.png"),
    badge: "Startup · Hackathon winner",
    links: [
      {
        label: "Live MVP",
        href: "https://ramanifest.lovable.app/",
        external: true,
      },
    ],
  },
  {
    slug: "chaiconnect",
    title: "ChaiConnect",
    tagline: "Agricultural & financial transparency system",
    description:
      "A digital financing and payment transparency platform supporting Kenya’s agricultural supply chains with M-Pesa integrations — making money movement visible and trustworthy for cooperatives and traders.",
    tech: ["Payments", "M-Pesa", "Product"],
    image: publicAsset("/assets/images/chaiconnect.png"),
    badge: "Winner — M-Pesa Money in Motion (Mar 2026)",
    links: [
      {
        label: "Live demo",
        href: "https://chaiconnects.vercel.app/",
        external: true,
      },
    ],
  },
  {
    slug: "banking-api",
    title: "Banking Transaction API",
    tagline: "Secure, scalable transaction core",
    description:
      "A secure backend banking-style transaction system focused on processing flows, API structure, and a foundation that can grow with traffic and compliance needs.",
    tech: ["Node.js", "PostgreSQL", "API design"],
    image: publicAsset("/assets/transitrack_img3.png"),
    links: [
      {
        label: "GitHub profile",
        href: "https://github.com/MuthamaFrancs",
        external: true,
      },
    ],
  },
  {
    slug: "campusfind",
    title: "CampusFind",
    tagline: "Institutional Lost & found System",
    description:
      "A centralized lost-and-found platform initially built for students to report lost items and recover found items faster.",
    tech: ["Web app", "Community"],
    image: publicAsset("/assets/images/campusfindai.png"),
    links: [
      {
        label: "Live app",
        href: "https://campus-findai.lovable.app/",
        external: true,
      },
    ],
  },
  {
    slug: "orientation",
    title: "Orientation App",
    tagline: "Smoother university onboarding",
    description:
      "A mobile onboarding and information platform that helps new students find resources, navigate campus life, and stay informed during orientation — built for clarity on small screens.",
    tech: ["Flutter", "Mobile Dev"],
    image: publicAsset("/assets/transitrack_img5.png"),
    links: [
      {
        label: "Repository",
        href: "https://github.com/dita-daystaruni/orientation_ap",
        external: true,
      },
    ],
  },
];

export const education = [
  {
    institution: "Daystar University",
    href: "https://www.daystar.ac.ke/",
    credential: "B.Sc. Computer Science",
    period: "Expected Graduation Nov 2026",
    detail: "Coursework and projects focused on software engineering, systems design, and data.",
  },
  {
    institution: "Olkejuado High School",
    href: "https://olkejuadohigh.ac.ke/",
    credential: "Secondary education",
    period: "2018 – Apr 2022",
    detail: "Grade: A-",
  },
] as const;

export type Certification = {
  name: string;
  issuer: string;
  issuerHref: string;
  period?: string;
  skills?: string;
};

export const certifications: Certification[] = [
  {
    name: "Data and AI Certificate",
    issuer: "CyberShujaa",
    issuerHref: "https://cybershujaa.co.ke/",
    skills: "Python · Power BI",
    period: "Sep 2025 - Dec 2025",
  },
  {
    name: "Software Development Certificate",
    issuer: "Modcom Institute",
    issuerHref: "https://modcom.co.ke/",
    period: "May 2022 – Aug 2022",
  },
  {
    name: "Lead Today Certificate",
    issuer: "Global Leadership Summit",
    issuerHref: "https://globalleadership.org/",
  },
];

export const experience = [
  {
    role: "Software & Operations Attachee",
    company: "Easy Coach Kenya",
    companyHref: "https://easycoachkenya.com/",
    period: "Sep 2024 – Dec 2025",
    bullets: [
      "Collected daily operational data and prepared manifest reports for leadership.",
      "Analyzed passenger and route data to support operational decisions under pressure.",
      "Strengthened reporting discipline and stakeholder communication across shifts.",
    ],
  },
  {
    role: "Software Developer",
    company: "Daystar IT Association",
    companyHref: "https://dita.co.ke/",
    period: "Apr 2023 – Apr 2025",
    bullets: [
      "Built mobile experiences (including the Orientation App) for student onboarding.",
      "Documented releases, coordinated deployments, and improved automated test coverage.",
      "Collaborated with student leaders and faculty to prioritize roadmap items.",
    ],
  },
] as const;

export const sideQuests = [
  {
    title: "What my Computer Science Degree has made me.",
    body: "Being a techie has put me in positions to build. I was pushed to see problems first and beyond to create solutions into being. Making me feel like a mini-God.",
  },
  {
    title: "Hackathons have honestly been a forcing function.",
    body: "I use compressed timelines to validate ideas, create MVPs, and learn from judges and peers.",
  },
  {
    title: "Community impact building.",
    body: "I believe the tools we build should bring impact and as a student I have made impact to students through solutions like  th eorientation app, campus lost-and-found.",
  },
  {
    title: "Leadership in technical communities",
    body: "Taking up Leadership positions, Mentoring peers, running practical workshops, and helping teams translate fuzzy problems into buildable solutions works like magic to growth.",
  },
  
] as const;

export type TechIcon = {
  name: string;
  /** Basename of SVG in `public/assets/images/tech/` (e.g. `python` → `python.svg`). */
  slug: string;
  accent: string;
};

/** Local SVGs under `public/assets/images/tech/` (from Devicons project). */
export const techStack: TechIcon[] = [
  { name: "Python", slug: "python", accent: "#3776AB" },
  { name: "TypeScript", slug: "typescript", accent: "#3178C6" },
  { name: "JavaScript", slug: "javascript", accent: "#F7DF1E" },
  { name: "React", slug: "react", accent: "#61DAFB" },
  { name: "Next.js", slug: "nextjs", accent: "#000000" },
  { name: "Node.js", slug: "nodejs", accent: "#339933" },
  { name: "Java", slug: "java", accent: "#007396" },
  { name: "Flutter", slug: "flutter", accent: "#02569B" },
  { name: "PostgreSQL", slug: "postgresql", accent: "#4169E1" },
  { name: "Tableau", slug: "tableau", accent: "#E97627" },
  { name: "Tailwind CSS", slug: "tailwindcss", accent: "#06B6D4" },
  { name: "Docker", slug: "docker", accent: "#2496ED" },
  { name: "Git", slug: "git", accent: "#F05032" },
  { name: "Firebase", slug: "firebase", accent: "#FFCA28" },
  { name: "Linux", slug: "linux", accent: "#333333" },
  { name: "Spring", slug: "spring", accent: "#6DB33F" },
];

export function techIconSrc(slug: string) {
  return publicAsset(`/assets/images/tech/${slug}.svg`);
}
