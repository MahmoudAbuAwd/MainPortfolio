export type Paper = {
  slug: string
  title: string
  abstract?: string
  description?: string
  url: string
  venue?: string
  year?: number
  authors?: string[]
  doi?: string
  doiAllVersions?: string
  keywords?: string[]
  license?: string
  languages?: string[]
}

export const papers: Paper[] = [
  {
    slug: "ai-criminal-justice-arbitrary-detention",
    title:
      "The Role of Artificial Intelligence in Enhancing the Criminal Justice System to Reduce Arbitrary Detention",
    abstract:
      "Examines AI’s role in reducing arbitrary detention and protecting human rights, balancing technological advancement with privacy, fairness, and accountability across justice systems.",
    description:
      "This research presents a multidimensional examination of AI within the criminal justice ecosystem, focusing on its potential to reduce arbitrary detention while strengthening human rights. It explores predictive analytics, machine learning, deep learning, NLP, and intelligent surveillance across law enforcement and judicial contexts, highlighting opportunities and risks. A central focus is arbitrary detention and how responsible AI\-driven risk assessment and predictive policing can reduce reliance on subjective judgment and prevent wrongful arrests. The paper critiques dangers of unregulated AI—algorithmic discrimination, biased datasets, surveillance overreach, and privacy erosion—and positions AI as a socio\-political instrument requiring legal, ethical, and democratic accountability. It integrates literature across computer science, human rights law, criminology, cybersecurity, sociology, and computational ethics to propose a human\-rights\-centric AI model with safeguards such as audits, privacy\-by\-design, explainable AI, transparency mandates, human oversight, and international cooperation. Practical recommendations target policymakers, law enforcement, legal professionals, and engineers, with evaluations of virtual legal assistants, automated legal research, digital evidence analyzers, and intelligent courtroom technologies. The study offers a roadmap for responsible integration of AI into justice systems to promote fairness, transparency, and dignity.",
    url: "https://doi.org/10.5281/zenodo.17683895",
    venue: "Zenodo",
    year: 2025,
    authors: [
      "Mahmoud Ibrahim AbuAwd",
      "Ahmad Ragheb Al-Shobaki",
      "Sara Mohammed Shahin",
    ],
    doi: "10.5281/zenodo.17683895",
    doiAllVersions: "10.5281/zenodo.17683894",
    keywords: [
      "Algorithmic Fairness",
      "Predictive Analytics",
      "Machine Learning Governance",
      "Algorithmic Bias Mitigation",
      "Digital Forensics",
      "Ethical AI",
      "Criminal Justice Reform",
      "AI Accountability",
      "Transparency",
      "Automated Risk Assessment",
    ],
    license: "CC BY 4.0",
    languages: ["English", "Arabic"],
  },
]
