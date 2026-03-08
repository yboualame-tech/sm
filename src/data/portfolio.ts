/**
 * Portfolio Data
 * Fichier centralisé pour gérer toutes les données du portfolio
 * Modifiez ce fichier pour mettre à jour les informations du portfolio
 */

export const portfolioData = {
  // Informations personnelles
  personal: {
    name: "Yousef Boualame",
    title: "Développeur Full Stack",
    email: "y.boualame@esisa.ac.ma",
    phone: "+212 6XX XXX XXX",
    location: "Casablanca, Maroc",
    bio: "Développeur passionné par la création de solutions web innovantes et performantes.",
    image: "/images/profile.jpg" // À remplacer avec votre photo
  },

  // Section À propos
  about: {
    title: "À propos de moi",
    description: `Je suis un développeur full stack avec une passion pour la création de solutions web modernes et efficaces. 
    Avec une expertise en technologies frontend et backend, je m'engage à produire un code de qualité, 
    maintenable et optimisé pour la performance.`,
    skills: {
      frontend: ["HTML/CSS", "JavaScript", "React", "Astro", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL"],
      tools: ["Git", "Docker", "Webpack", "Vercel", "GitHub"]
    }
  },

  // Section Éducation
  education: [
    {
      school: "ESISA",
      degree: "Master en Informatique",
      field: "Génie Logiciel",
      startYear: 2023,
      endYear: 2025,
      description: "Formation spécialisée en développement web et architecture logicielle"
    },
    {
      school: "Université Université Locale",
      degree: "Licence en Informatique",
      field: "Informatique",
      startYear: 2020,
      endYear: 2023,
      description: "Base solide en algorithmie, programmation et développement"
    }
  ],

  // Section Expérience
  experience: [
    {
      company: "Tech Company",
      position: "Développeur Full Stack",
      startDate: "Jan 2024",
      endDate: "Présent",
      description: "Développement et maintenance d'applications web modernes",
      achievements: [
        "Création de composants React réutilisables",
        "Optimisation des performances de l'application",
        "Mise en place de CI/CD avec GitHub Actions"
      ]
    },
    {
      company: "Startup Innovation",
      position: "Développeur Frontend",
      startDate: "Jun 2023",
      endDate: "Dec 2023",
      description: "Développement d'interface utilisateur moderne et responsive",
      achievements: [
        "Design système avec Figma et implémentation",
        "Amélioration de l'expérience utilisateur",
        "Refactorisation du code legacy"
      ]
    }
  ],

  // Section Projets
  projects: [
    {
      title: "E-commerce Platform",
      description: "Plateforme e-commerce complète avec panier, paiement et gestion de stock",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/images/projects/ecommerce.jpg",
      links: {
        github: "https://github.com/yourusername/ecommerce",
        live: "https://ecommerce-demo.com"
      },
      highlights: [
        "Architecture microservices",
        "Payment gateway integration",
        "Real-time inventory management"
      ]
    },
    {
      title: "Task Management App",
      description: "Application de gestion de tâches collaborative avec temps réel",
      technologies: ["Astro", "Tailwind CSS", "Node.js", "WebSocket"],
      image: "/images/projects/taskapp.jpg",
      links: {
        github: "https://github.com/yourusername/taskapp",
        live: "https://taskapp-demo.com"
      },
      highlights: [
        "Real-time collaboration",
        "Responsive design",
        "Dark mode support"
      ]
    },
    {
      title: "Analytics Dashboard",
      description: "Tableau de bord analytique avec visualisations de données interactives",
      technologies: ["React", "Chart.js", "Express", "PostgreSQL"],
      image: "/images/projects/analytics.jpg",
      links: {
        github: "https://github.com/yourusername/analytics",
        live: "https://analytics-demo.com"
      },
      highlights: [
        "Real-time data updates",
        "Custom charts",
        "Export functionality"
      ]
    }
  ],

  // Section Contact
  contact: {
    title: "Contactez-moi",
    description: "Vous avez un projet en tête ? N'hésitez pas à me contacter !",
    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
      email: "y.boualame@esisa.ac.ma"
    }
  },

  // Configuration du site
  site: {
    title: "Yousef Boualame | Portfolio",
    description: "Portfolio professionnel de Yousef Boualame - Développeur Full Stack",
    url: "https://yourportfolio.com",
    language: "fr"
  }
};

export default portfolioData;
