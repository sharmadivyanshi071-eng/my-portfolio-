// types/portfolio.ts
// TypeScript interfaces and initial portfolio configuration for "Space Journey Portfolio"

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

export interface SectionStation {
  id: SectionId;
  index: number;
  label: string;
  planetName: string;
  coordinates: string;
  // Camera position when visiting this planet
  cameraPos: [number, number, number];
  // 3D point in space the camera looks toward at this station
  lookAtPos: [number, number, number];
  // 3D world position of the planet/station center
  objectPos: [number, number, number];
}

export interface SkillOrbData {
  name: string;
  category: string;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  size: number;
  color: string;
  emissiveColor: string;
  description: string;
}

export interface ProjectPlanetData {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  planetColor: string;
  secondaryColor: string;
  ringColor: string;
  positionOffset: [number, number, number];
  radius: number;
  hasRing: boolean;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  about: string;
  aboutExtended: string;
  email: string;
  github: string;
  linkedin: string;
  skills: SkillOrbData[];
  projects: ProjectPlanetData[];
}

// 3D waypoints along the galaxy journey.
// As the user scrolls from 0% to 100%, the camera interpolates smoothly along these stations.
export const GALAXY_STATIONS: SectionStation[] = [
  {
    id: 'hero',
    index: 0,
    label: 'Hero',
    planetName: 'Origin Beacon',
    coordinates: '00.00 · +00.00 · +00.00',
    cameraPos: [0, 0.8, 12],
    lookAtPos: [0, 0.2, 0],
    objectPos: [0, 0.2, 0],
  },
  {
    id: 'about',
    index: 1,
    label: 'About',
    planetName: 'Aurelia Prime',
    coordinates: '14.82 · +02.40 · -32.00',
    cameraPos: [4.5, 1.4, -22],
    lookAtPos: [1.2, 0.4, -32],
    objectPos: [-2.8, 0.5, -32],
  },
  {
    id: 'skills',
    index: 2,
    label: 'Skills',
    planetName: 'Helios Core System',
    coordinates: '42.10 · -01.85 · -68.00',
    cameraPos: [0, 5.2, -53],
    lookAtPos: [0, -0.5, -68],
    objectPos: [0, -0.5, -68],
  },
  {
    id: 'projects',
    index: 3,
    label: 'Projects',
    planetName: 'Nebula Forge Sector',
    coordinates: '78.40 · +03.12 · -104.00',
    cameraPos: [0, 2.2, -90],
    lookAtPos: [0, 0.3, -104],
    objectPos: [0, 0.3, -104],
  },
  {
    id: 'contact',
    index: 4,
    label: 'Contact',
    planetName: 'Relay Voyager IX',
    coordinates: '99.90 · +00.50 · -138.00',
    cameraPos: [-3.4, 1.2, -128],
    lookAtPos: [0.4, 0.3, -138],
    objectPos: [2.8, 0.4, -138],
  },
];

// Default portfolio details matching the user's exact specification
export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  name: '[Tumhara Naam]',
  role: '[Aspiring Full-Stack Developer]',
  tagline: '[Building modern web apps with Next.js and PostgreSQL]',
  about: '[2-3 lines apne baare mein]',
  aboutExtended:
    'Passionate about architecting end-to-end web applications with clean TypeScript code, scalable PostgreSQL schemas, and responsive interactive interfaces.',
  email: '[email]',
  github: '[link]',
  linkedin: '[link]',
  skills: [
    {
      name: 'Next.js',
      category: 'Full-Stack Framework',
      orbitRadius: 3.4,
      orbitSpeed: 0.55,
      initialAngle: 0.2,
      size: 0.46,
      color: '#22d3ee',
      emissiveColor: '#06b6d4',
      description: 'App Router, Server Components, API Routes & SSR optimization',
    },
    {
      name: 'React',
      category: 'Frontend Library',
      orbitRadius: 4.5,
      orbitSpeed: 0.44,
      initialAngle: 1.2,
      size: 0.44,
      color: '#38bdf8',
      emissiveColor: '#0284c7',
      description: 'Component architecture, custom hooks, state management & 3D Fiber',
    },
    {
      name: 'TypeScript',
      category: 'Language',
      orbitRadius: 5.6,
      orbitSpeed: 0.36,
      initialAngle: 2.3,
      size: 0.45,
      color: '#60a5fa',
      emissiveColor: '#2563eb',
      description: 'Strict static typing, generics, and type-safe API contracts',
    },
    {
      name: 'PostgreSQL',
      category: 'Relational Database',
      orbitRadius: 6.7,
      orbitSpeed: 0.3,
      initialAngle: 3.4,
      size: 0.48,
      color: '#a855f7',
      emissiveColor: '#7e22ce',
      description: 'Relational data modeling, indexing, transactions & query tuning',
    },
    {
      name: 'Prisma',
      category: 'Next-Gen ORM',
      orbitRadius: 7.8,
      orbitSpeed: 0.25,
      initialAngle: 4.3,
      size: 0.42,
      color: '#c084fc',
      emissiveColor: '#9333ea',
      description: 'Declarative schema migrations and type-safe database queries',
    },
    {
      name: 'Node.js',
      category: 'Backend Runtime',
      orbitRadius: 8.9,
      orbitSpeed: 0.21,
      initialAngle: 5.1,
      size: 0.44,
      color: '#34d399',
      emissiveColor: '#059669',
      description: 'Event-driven backend services, REST APIs, and authentication',
    },
    {
      name: 'Git',
      category: 'Version Control',
      orbitRadius: 10.0,
      orbitSpeed: 0.17,
      initialAngle: 5.9,
      size: 0.4,
      color: '#f472b6',
      emissiveColor: '#db2777',
      description: 'Branching workflows, collaborative code review, and CI/CD pipelines',
    },
  ],
  projects: [
    {
      id: 'vorombetech',
      title: 'Vorombetech Website',
      shortDescription: 'Company website built with Next.js',
      longDescription:
        'Company website built with Next.js featuring modern responsive layouts, high-speed server rendering, structured service showcases, and optimized SEO performance.',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      githubUrl: '[GitHub link]',
      liveUrl: '[Live link]',
      planetColor: '#06b6d4',
      secondaryColor: '#1e1b4b',
      ringColor: '#22d3ee',
      positionOffset: [-4.2, 0.6, 0],
      radius: 1.55,
      hasRing: true,
    },
    {
      id: 'project-2',
      title: '[Project 2 name]',
      shortDescription: '[short description]',
      longDescription:
        '[short description] — Full-stack application engineered with Next.js, TypeScript, Prisma ORM, and PostgreSQL with end-to-end type safety and responsive dark UI.',
      techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Node.js'],
      githubUrl: '[links]',
      liveUrl: '[links]',
      planetColor: '#a855f7',
      secondaryColor: '#3b0764',
      ringColor: '#c084fc',
      positionOffset: [4.2, -0.3, -1.5],
      radius: 1.45,
      hasRing: true,
    },
  ],
};
