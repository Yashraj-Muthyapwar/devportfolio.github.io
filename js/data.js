/* ═══════════════════════════════════════════════════════════════
   Portfolio Data
   Edit this file to customize your portfolio content
   ═══════════════════════════════════════════════════════════════ */

window.portfolioData = {
  // ─── Personal Information ──────────────────────────────────────
  name: "Alice Johnson",
  title: "Senior Software Engineer",
  company: "ACME Corp",
  email: "alice@company.com",
  location: "San Francisco, CA",

  // ─── Social Links ──────────────────────────────────────────────
  social: {
    github: "https://github.com/alice",
    linkedin: "https://linkedin.com/in/alicejohnson",
    twitter: "https://twitter.com/alicedev",
    portfolio: "https://alice.github.io/devportfolio"
  },

  // ─── Skills & Technologies ─────────────────────────────────────
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Go",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Git",
    "REST APIs",
    "GraphQL",
    "Redis",
    "MongoDB",
    "CI/CD",
    "Microservices",
    "System Design"
  ],

  // ─── Projects ──────────────────────────────────────────────────
  projects: [
    {
      title: "Real-Time Collaboration Platform",
      description: "A WebSocket-based collaborative document editor with real-time synchronization, conflict resolution, and presence awareness. Built for teams working across distributed locations.",
      tags: ["React", "Node.js", "WebSocket", "Redis", "PostgreSQL"],
      featured: true,
      github: "https://github.com/alice/collab-platform",
      live: "https://collab-demo.example.com"
    },
    {
      title: "Distributed Task Queue System",
      description: "High-performance task queue system handling millions of jobs per day. Implemented priority queues, retry logic, and monitoring dashboards for production reliability.",
      tags: ["Go", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
      featured: true,
      github: "https://github.com/alice/task-queue"
    },
    {
      title: "API Rate Limiter Service",
      description: "Scalable rate limiting microservice using token bucket algorithm. Prevents abuse while maintaining high throughput. Deployed across multiple regions with sub-millisecond latency.",
      tags: ["Go", "Redis", "gRPC", "Prometheus"],
      featured: true,
      github: "https://github.com/alice/rate-limiter"
    },
    {
      title: "E-Commerce Analytics Dashboard",
      description: "Interactive dashboard for visualizing e-commerce metrics. Features real-time updates, customizable widgets, and exportable reports. Processes 100K+ events per minute.",
      tags: ["React", "TypeScript", "D3.js", "Node.js", "ClickHouse"],
      featured: false,
      github: "https://github.com/alice/analytics-dashboard",
      live: "https://analytics-demo.example.com"
    },
    {
      title: "Infrastructure Monitoring CLI",
      description: "Command-line tool for monitoring distributed systems. Aggregates logs, metrics, and traces from multiple services. Helped reduce MTTR by 40% in production incidents.",
      tags: ["Python", "Go", "Prometheus", "Grafana", "Elasticsearch"],
      featured: false,
      github: "https://github.com/alice/infra-monitor"
    },
    {
      title: "Serverless Image Processing Pipeline",
      description: "Automated image optimization pipeline using AWS Lambda. Handles resizing, compression, and format conversion. Reduced storage costs by 60% while improving page load times.",
      tags: ["Python", "AWS Lambda", "S3", "CloudFront", "Terraform"],
      featured: false,
      github: "https://github.com/alice/image-pipeline"
    },
    {
      title: "OAuth2 Authentication Service",
      description: "Full-featured OAuth2 provider with support for multiple grant types. Includes admin dashboard, rate limiting, and comprehensive audit logging for security compliance.",
      tags: ["Node.js", "Express", "PostgreSQL", "Redis", "JWT"],
      featured: false,
      github: "https://github.com/alice/oauth-service"
    },
    {
      title: "Configuration Management System",
      description: "Centralized configuration management with version control, rollback capabilities, and feature flags. Enables safe deployments and A/B testing at scale.",
      tags: ["Go", "PostgreSQL", "gRPC", "React", "Docker"],
      featured: false,
      github: "https://github.com/alice/config-manager"
    },
    {
      title: "Real-Time Notification Service",
      description: "Multi-channel notification system supporting email, SMS, push notifications, and webhooks. Handles millions of notifications daily with delivery tracking and retry logic.",
      tags: ["Node.js", "RabbitMQ", "Redis", "PostgreSQL", "WebSocket"],
      featured: false,
      github: "https://github.com/alice/notification-service"
    },
    {
      title: "GraphQL API Gateway",
      description: "Unified GraphQL gateway aggregating multiple REST and GraphQL services. Features caching, authentication, rate limiting, and comprehensive error handling.",
      tags: ["Node.js", "GraphQL", "Redis", "Apollo Server", "Kubernetes"],
      featured: false,
      github: "https://github.com/alice/graphql-gateway"
    },
    {
      title: "Database Migration Tool",
      description: "Zero-downtime database migration tool for PostgreSQL. Supports large-scale schema changes without service interruption. Used in production for databases with billions of rows.",
      tags: ["Python", "PostgreSQL", "Docker", "SQL"],
      featured: false,
      github: "https://github.com/alice/db-migrator"
    },
    {
      title: "CI/CD Pipeline Optimizer",
      description: "Analysis and optimization tool for GitHub Actions workflows. Identifies bottlenecks, suggests parallelization opportunities, and reduces build times by up to 50%.",
      tags: ["Python", "GitHub Actions", "Docker", "YAML"],
      featured: false,
      github: "https://github.com/alice/ci-optimizer"
    }
  ],

  // ─── Work Experience ───────────────────────────────────────────
  experience: [
    {
      company: "ACME Corp",
      role: "Senior Software Engineer",
      period: "2022 – Present",
      location: "San Francisco, CA",
      description: "Leading backend infrastructure projects. Architecting distributed systems and mentoring junior engineers.",
      highlights: [
        "Designed and implemented microservices handling 10M+ requests/day",
        "Reduced API latency by 60% through caching and query optimization",
        "Led migration from monolith to microservices architecture",
        "Mentored 5 junior engineers and conducted technical interviews"
      ]
    },
    {
      company: "CloudSaaS Inc.",
      role: "Software Engineer",
      period: "2019 – 2022",
      location: "San Francisco, CA",
      description: "Full-stack development with focus on scalability and performance.",
      highlights: [
        "Built real-time analytics pipeline processing 1M+ events/hour",
        "Implemented automated testing reducing production bugs by 40%",
        "Migrated legacy PHP application to modern Node.js stack",
        "Improved deployment process reducing release time from 2 hours to 15 minutes"
      ]
    },
    {
      company: "FinStart",
      role: "Junior Developer",
      period: "2017 – 2019",
      location: "San Francisco, CA",
      description: "Starting my career in fintech, learning best practices the hard way.",
      highlights: [
        "Maintained payment processing system handling $1M+ daily",
        "Implemented automated testing suite from scratch",
        "Fixed critical security vulnerabilities in production",
        "Participated in on-call rotation and incident response"
      ]
    }
  ],

  // ─── Education ─────────────────────────────────────────────────
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California",
      year: "2017",
      gpa: "3.8/4.0"
    }
  ],

  // ─── Certifications ────────────────────────────────────────────
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2021"
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      year: "2022"
    }
  ],

  // ─── Contact Preferences ───────────────────────────────────────
  availability: {
    freelance: true,
    fullTime: false,
    consulting: true
  }
};

// Make data globally accessible
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.portfolioData;
}
