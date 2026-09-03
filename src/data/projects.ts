export type ProjectCategory = 'Backend' | 'Frontend' | 'Other'

export interface Project {
  id: string
  number: string
  title: string
  description: string
  categories: ProjectCategory[]
  technologies: string[]
  features?: string[]
  github: string
  live?: string
  /** First image is used as the card thumbnail. Add more to populate the gallery viewer. */
  images: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'emart-laravel',
    number: '01',
    title: 'Laravel E-Commerce Platform',
    description:
      'A complete e-commerce store with an admin dashboard, product and category management, cart, wishlist, orders, and role-based authorization — built on Laravel with AJAX-driven interactions.',
    categories: ['Backend'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript', 'jQuery', 'AJAX', 'Bootstrap'],
    features: [
      'Admin dashboard with product & category management',
      'Shopping cart, wishlist, orders & order items',
      'Authentication, authorization, roles & permissions',
      'Live product search and category filtering via AJAX',
      'Eloquent relationships across a relational schema',
    ],
    github: 'https://github.com/Abd-Alrahman-Khalifa/laravel_project',
    images: [
      '/assets/projects/emart-home.png',
      '/assets/projects/emart-search.png',
      '/assets/projects/bravo-home.png',
      '/assets/projects/bravo-admin.png',
    ],
    featured: true,
  },
  {
    id: 'php-project',
    number: '02',
    title: 'PHP Project',
    description: 'Core PHP application exploring MVC-style structuring, forms, and database interaction without a framework.',
    categories: ['Backend'],
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/Abd-Alrahman-Khalifa/php_project',
    images: [],
  },
  {
    id: 'zshope',
    number: '03',
    title: 'Zshope',
    description: 'A front-end storefront template focused on layout, product browsing, and responsive UI.',
    categories: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/Abd-Alrahman-Khalifa/Zshope',
    live: 'https://abd-alrahman-khalifa.github.io/Zshope/',
    images: ['/assets/projects/zshope.png'],
  },
  {
    id: 'shopz',
    number: '04',
    title: 'shopZ',
    description: 'A front-end e-commerce UI build exploring component layout and interaction patterns.',
    categories: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Abd-Alrahman-Khalifa/shopZ',
    images: ['/assets/projects/shopz.png'],
  },
  {
    id: 'template-four',
    number: '05',
    title: 'Template Four',
    description: 'A responsive front-end template built to practice modern CSS layout and component structuring.',
    categories: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/Abd-Alrahman-Khalifa/template-four',
    live: 'https://abd-alrahman-khalifa.github.io/template-four/',
    images: [],
  },
  {
    id: 'template-two',
    number: '06',
    title: 'Template Two',
    description: 'An earlier front-end template project focused on layout fundamentals and responsiveness.',
    categories: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Abd-Alrahman-Khalifa/template_tow',
    live: 'https://abd-alrahman-khalifa.github.io/template_tow/',
    images: [],
  },
  {
    id: 'app-pdf',
    number: '07',
    title: 'App PDF',
    description: 'A small utility application for working with PDF documents.',
    categories: ['Other'],
    technologies: ['PHP'],
    github: 'https://github.com/Abd-Alrahman-Khalifa/app-pdf',
    images: [],
  },
]
