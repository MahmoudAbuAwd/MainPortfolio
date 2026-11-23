import type { Resource } from "@/content/types"

/**
 * Curated resources rendered on /resources.
 *
 * Add entries below. Items are grouped by `category` automatically, and the
 * page shows a friendly empty state while this list is empty.
 */
export const resources: Resource[] = [
  {
    title: "Deep Learning Specialization Summary",
    description:
      "Comprehensive course notes distilling Coursera's Deep Learning Specialization into key architectures, optimization tricks, and deployment best practices.",
    url: "/Deep_learning_specialization2.pdf",
    type: "pdf",
    category: "Course Summaries",
  },
  {
    title: "Advanced RAG Techniques – Comprehensive Research Guide",
    description: "Comprehensive guide covering 36 advanced RAG techniques for retrieval-augmented systems.",
    url: "https://cobalt-verdict-599.notion.site/Advanced-RAG-Techniques-Comprehensive-Research-Guide-298193c0f5718019bde0cbcbe8c1a4f3",
    type: "link",
    category: "Retrieval-Augmented Generation",
  },
  {
    title: "AWS AI Practitioner – Security & IAM Roles",
    description: "Notion notes covering access management, shared responsibility, and guardrail best practices.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-02-Security-and-IAM-roles-1dc193c0f571808684e8d91bf778c315",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Intro to AI",
    description: "Foundational AI concepts, terminology, and AWS positioning summarized for quick review.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-03-Intro-to-AI-1dd193c0f5718061a6e1f88742b9334c",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Prompt Engineering",
    description: "Prompt design patterns, evaluation tips, and generative AI safety notes for the exam.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-04-Prompt-Engineering-1e4193c0f57180e38d62f70ad1aebf2d",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – AI Challenges & Ethics",
    description: "Key ethical considerations, bias mitigation, and responsible AI guardrails in AWS.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-05-AI-Challenges-Ethics-1e8193c0f571800ea4c3eba33b07b8bd",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – AWS AI Services",
    description: "Service overview cheat-sheet with core capabilities and common use cases.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-06-AWS-AI-services-1e8193c0f57180be8f7df39bcb87398d",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Amazon Bedrock",
    description: "Bedrock components, model catalog, and orchestration workflows in concise bullet form.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-07-Amazon-Bedrock-1ea193c0f5718071b3f3f7bfe4ab2d45",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Amazon Q",
    description: "Study notes on Amazon Q’s capabilities, integrations, and security posture.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-08-Amazon-Q-1eb193c0f57180a381a6d0335cc12f88",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – Amazon SageMaker",
    description: "Lifecycle overview, key features, and deployment workflows for SageMaker.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-09-Amazon-SageMaker-1ee193c0f571806c9bf6d18a064a219a",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "AWS AI Practitioner – AWS Cloud Services",
    description: "Refresher on supporting cloud services, data pipelines, and monitoring touchpoints.",
    url: "https://cobalt-verdict-599.notion.site/AWS-AI-10-AWS-Cloud-Services-1f2193c0f571806dacc4c21b56df8052",
    type: "link",
    category: "AWS AI Practitioner Notes",
  },
  {
    title: "The Role of Artificial Intelligence in Enhancing the Criminal Justice System to Reduce Arbitrary Detention",
    description: "Comprehensive research examining AI's role in reducing arbitrary detention and protecting human rights, balancing technological advancement with privacy, fairness, and accountability across justice systems. Published in Zenodo (2025).",
    url: "https://zenodo.org/records/17727308",
    type: "link",
    category: "Research Papers",
  },
  {
    title: "MLA C01 - 1 - Getting Started with ML, DevOps, and AWS",
    description: "Foundational course covering machine learning concepts, DevOps practices, and AWS essentials for ML professionals.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-1-Getting-Started-with-ML-DevOps-and-AWS-25d193c0f57180e693cbd69a626ca8c1?pvs=74",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 2 - Data Preparation for Machine Learning",
    description: "Comprehensive guide on data ingestion, cleaning, transformation, and preparation techniques for ML workflows.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-2-Data-Preparation-for-Machine-Learning-279193c0f57180549543cb97858bbfb1?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 3 - Machine Learning Model Development",
    description: "Detailed exploration of model architecture design, training strategies, evaluation metrics, and optimization techniques.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-3-Machine-Learning-Model-Development-285193c0f57180329c39d9c1b81c14a7?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 4 - Deployment and Orchestration of ML Workflows",
    description: "Best practices for containerizing models, orchestrating workflows, and scaling ML systems in production environments.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-4-Deployment-and-Orchestration-of-ML-Workflows-285193c0f5718008b2a1e7e2ea719953?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
  {
    title: "MLA C01 - 5 - ML Solution Monitoring, Maintenance, and Security",
    description: "Essential practices for monitoring model performance, maintaining system health, implementing security measures, and ensuring compliance.",
    url: "https://cobalt-verdict-599.notion.site/MLA-C01-5-ML-Solution-Monitoring-Maintenance-and-Security-285193c0f57180c59b73d482f71ccbc7?source=copy_link",
    type: "link",
    category: "Machine Learning Associate (MLA)",
  },
]
