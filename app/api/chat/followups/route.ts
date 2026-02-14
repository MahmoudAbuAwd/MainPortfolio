import { NextRequest } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Everything the chatbot knows about Mahmoud — keep in sync with the main route
const MAHMOUD_PROFILE = `
ABOUT MAHMOUD IBRAHIM ABUAWD:
- AI/ML Engineer based in Amman, Jordan
- Bachelor of AI and Robotics, Al-Balqa' Applied University (2021-2025), GPA 3.34
- Email: Mahmoodabuawad08@gmail.com | LinkedIn: linkedin.com/in/abuawd | GitHub: github.com/mahmoudabuawd | Portfolio: abuawd.online

WORK EXPERIENCE:
1. AI Engineer at Kawkab AI (Sep 2025 – Present): LLM agents, RAG pipelines, classical ML, cross-functional teams
2. AI Engineer at Future Advance Internet Solutions (Oct 2024 – Mar 2025): AI/Deep Learning training, data preprocessing, ML model preparation

TECHNICAL SKILLS:
- Languages: Python (TensorFlow, PyTorch, scikit-learn, OpenCV, NLTK, pandas, NumPy), C++, Git
- ML/AI: CNN, RNN, NLP, Computer Vision, GANs, Transformers, LangChain, RAG, Prompt Engineering
- Data: Preprocessing, Feature Engineering, Power BI, Excel, Matplotlib, Seaborn
- Embedded: Arduino (UNO/Nano/Mega), Circuit Design, Robotics, IoT, 3D Modeling (Fusion 360, Tinkercad)
- Cloud/Deploy: Flask, FastAPI, Streamlit, AWS (Certified), Azure, Docker

KEY PROJECTS:
1. MedGAN-SynTumorClassifier: Flask app, 12 GANs for brain MRI augmentation, Vision Transformer classifier, 92% accuracy
2. Price-Pilot Agentic System: Multi-agent AI platform for SMB retailers (pricing, restocking, delivery)
3. Recruitment-AI System: Multi-agent candidate evaluation and automated interviewing
4. DevInsight Agent: Autonomous GitHub repo analysis — code quality, architecture, LLM improvement reports
5. PhishGuard: ML phishing detection comparing Logistic Regression, KNN, SVC

CERTIFICATIONS: AWS AI Practitioner (May 2025), Microsoft Excel & Power BI (Mar 2025), DeepLearning.AI TensorFlow (Jan 2025), Deep Learning Specialization (Sep 2024), Embedded Systems INJO (May 2024)

VOLUNTEERING: Google Developer Group (Oct 2024–present), IEEE (May–Dec 2024)

RESEARCH: "MEDGAN: Advanced Medical Image Generation" (2025), "AI in Criminal Justice to Reduce Arbitrary Detention" (2024)
`.trim();

export async function POST(req: NextRequest) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer || !process.env.COHERE_API_KEY) {
      return Response.json({ suggestions: [] });
    }

    const response = await cohere.chat({
      model: 'command-a-03-2025',
      message: `You are generating follow-up questions for a portfolio chatbot. The chatbot ONLY knows the facts listed below about Mahmoud Ibrahim AbuAwd. You must suggest follow-up questions that can be answered using ONLY these facts — do not suggest questions about topics not covered here.

KNOWN FACTS ABOUT MAHMOUD:
${MAHMOUD_PROFILE}

The visitor just asked: "${question}"
The assistant just answered: "${answer.slice(0, 700)}"

Generate exactly 3 short, natural follow-up questions a recruiter or visitor might ask next, based strictly on the facts above. Each question must be answerable from the profile data.

Return ONLY a valid JSON array of 3 question strings. No explanation, no markdown, just the raw JSON array.
Example: ["What tools does he use for deployment?", "Tell me more about PhishGuard.", "Does he have any certifications?"]`,
      temperature: 0.5,
    });

    const text = response.text.trim();

    const match = text.match(/\[[\s\S]*?\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) {
        return Response.json({ suggestions: parsed.slice(0, 3).map(String) });
      }
    }

    return Response.json({ suggestions: [] });
  } catch {
    return Response.json({ suggestions: [] });
  }
}
