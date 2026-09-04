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
      'assets/projects/emart-home.png',
      'assets/projects/emart-product.png',
      'assets/projects/emart-addpro.png',
      'assets/projects/emart-admin.png',
      'assets/projects/emart-dash.png'
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
    live: 'https://bravo.freedev.app/?i=1',
    images: [
      'assets/projects/bravo-home.png',
      'assets/projects/bravo-product.png',
      'assets/projects/bravo-admin.png',
      'assets/projects/bravo-addpro.png',
    ],
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
    images: [
      'assets/projects/zshop.png' ,
      'assets/projects/zshop-pro.png' ,
      'assets/projects/zshop-log.png' ,
    ],
  },
  {
    id: 'portfolio',
    number: '04',
    title: 'Personal Portfolio',
    description:
      'A modern and responsive personal portfolio website designed to showcase my skills, projects, education, certifications, and professional experience. The portfolio highlights my expertise as a Backend Laravel Developer with strong frontend development skills and provides an interactive and polished user experience.',
    categories: ['Frontend'],
    technologies: [
      'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'Font Awesome', 'Responsive Design'
    ],
    github: 'https://github.com/Abd-Alrahman-Khalifa/my_portfolio',
    live: 'https://abd-alrahman-khalifa.github.io/my_portfolio/',
    images: [
      'assets/projects/portfolio.png' ,
      'assets/projects/portfolio-1.png' ,
      'assets/projects/portfolio-2.png' ,
      'assets/projects/portfolio-3.png' ,
      'assets/projects/portfolio-4.png' ,
    ],
  },
  {
    id: 'shopz',
    number: '05',
    title: 'shopZ',
    description:
      'A modern full-featured e-commerce application built with React. The project implements reusable and scalable components, Zustand for global state management, Firebase for authentication and data management, form validation, AJAX-based interactions, dynamic product filtering and search, cart and wishlist functionality, and a fully responsive UI.',
    categories: ['Frontend'],
    technologies: [ 'HTML5' , 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Zustand', 'Firebase', 'Firebase Auth', 'Firestore', 'Form Validation', 'AJAX' ],
    github: 'https://github.com/Abd-Alrahman-Khalifa/shopZ',
    images: [
      'assets/projects/shopz.png', 
      'assets/projects/shopz-pro.png'
    ],
  },
  {
    id: 'template-four',
    number: '06',
    title: 'Template Four',
    description: 'A responsive front-end template built to practice modern CSS layout and component structuring.',
    categories: ['Frontend'],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Abd-Alrahman-Khalifa/template-four',
    live: 'https://abd-alrahman-khalifa.github.io/template-four/',
    images: ['assets/projects/templat4.png'],
  },
  {
    id: 'app-pdf',
    number: '07',
    title: 'PDF AI Assistant',
    description:
      'An AI-powered PDF application designed to interact with and extract useful information from PDF documents. The project combines Python-based PDF processing with AI-powered search and retrieval to provide an intelligent way to work with document content.',
    categories: ['Other'],
    technologies: [
      'Python', 'AI', 'FAISS', 'PDF Processing', 'Vector Search', 'RAG'
    ],
    github: 'https://github.com/Abd-Alrahman-Khalifa/app-pdf',
    images: ['assets/projects/app-pdf.png'],
  },
]
