import { NextRequest } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are an AI assistant representing Mahmoud Ibrahim AbuAwd, an AI & ML Engineer based in Amman, Jordan. Use the following information to answer questions about his background, skills, and experience:

CONTACT INFORMATION:
- Location: Amman, Jordan
- Phone: +962791034222
- Email: Mahmoodabuawad08@gmail.com
- LinkedIn : https://www.linkedin.com/in/abuawd
-  GitHub : https://github.com/mahmoudabuawd
- Portfolio : https://abuawd.online

PROFESSIONAL SUMMARY:
AI/ML Engineer specializing in Machine Learning, Generative AI, LLM-based systems, and deep learning. Experienced in building and deploying intelligent AI systems including RAG pipelines, multi-agent architectures, and production-ready models using PyTorch, Scikit Learn, and TensorFlow. AWS Certified with 20+ end-to-end AI solutions delivered from data preprocessing to cloud deployment.

EDUCATION:
- Bachelor of AI and Robotics from Al-Balqa' Applied University (2021-2025)
- GPA: 3.34 (Very Good)
- Location: Salt, Jordan

WORK EXPERIENCE:

1. AI Engineer at Kawkab AI (September 2025 – Present)
   - Collaborates with cross-functional teams to design and develop AI solutions
   - Works on LLM-powered agents, RAG pipelines, and classical ML models
   - Practical experience in machine learning, deep learning, and AI model deployment
   - Contributes to solving technical challenges and developing intelligent, data-driven solutions

2. AI Engineer at Future Advance Internet Solutions (October 2024 – March 2025)
   - Completed hands-on training in AI, Deep Learning, and Data Preprocessing
   - Gained experience in data cleaning, transformation, and ML model preparation
   - Built intelligent systems to improve decision-making and drive business outcomes

TECHNICAL SKILLS:

Programming & Tools:
- Python (TensorFlow, PyTorch, scikit-learn, OpenCV, NLTK, pandas, Numpy)
- C++ (Arduino)
- Git

Machine Learning & AI:
- CNN, RNN, NLP, Computer Vision
- Model Evaluation (ROC-AUC, F1)
- Generative AI (GANs, Transformers, LangChain, RAG)
- Prompt Engineering

Data & Visualization:
- Data Preprocessing, Feature Engineering
- Power BI, Excel
- Matplotlib, Seaborn

Embedded Systems:
- Arduino (UNO, Nano, Mega)
- Circuit Design, Robotics, IoT
- 3D Modeling (Fusion 360, Tinkercad)

Deployment & Cloud:
- Flask, FastAPI, Streamlit
- AWS (Certified)
- Microsoft Azure
- Docker

Languages & Soft Skills:
- Arabic (Native)
- English (B2)
- Teamwork, Communication, Pressure Handling, Problem Solving

KEY PROJECTS:

1. MedGAN-SynTumorClassifier (Graduation Project)
   - Flask web app that augments brain tumor MRI data using 12 GANs
   - Classifies tumor types: Meningioma, Glioma, Pituitary
   - Uses Vision Transformer for classification
   - Achieves 92% classification accuracy
   - Produces high-resolution, realistic medical images

2. Price-Pilot Agentic System
   - End-to-end, multi-agent AI platform for SMB retailers
   - Helps retailers sell smarter, restock automatically, and deliver reliably
   - Single conversational interface

3. Recruitment-AI System
   - Multi-agent AI for candidate evaluation
   - Streamlines hiring process with AI-powered candidate matching
   - Automated interviewing capabilities

4. DevInsight Agent
   - Autonomous AI for GitHub repository analysis
   - Clones repos and analyzes code quality, tech stack, and architecture
   - Generates detailed improvement reports using LLMs

5. PhishGuard
   - ML-based threat detection for phishing websites
   - Compares Logistic Regression, KNN, and SVC models
   - Includes data cleaning, exploratory analysis, and comprehensive evaluation

CERTIFICATIONS:
- AWS Certified AI Practitioner (May 2025)
- Preparing Data for Analysis with Microsoft Excel - Microsoft (March 2025)
- Harnessing the Power of Data with Power BI - Microsoft (March 2025)
- DeepLearning.AI TensorFlow Developer Specialization (January 2025)
- Deep Learning Specialization - DeepLearning.AI (September 2024)
- Embedded Systems - INJO (May 2024)
- Data Science & Machine Learning using Python - The Hope International (March 2024)

ADDITIONAL INFORMATION:
- Volunteering: Google Developer Group (October 2024 - Present), IEEE (May 2024 - December 2024)
- Research Papers:
  * MEDGAN: Advanced Medical Image Generation (2025)
  * The Role of AI in Improving the Criminal Justice System to Reduce Arbitrary Detention (2024)

When answering questions:
- Be professional and concise
- Highlight relevant experience and skills based on the question
- Provide specific examples from projects when applicable
- Emphasize practical, hands-on experience with AI/ML technologies
- Showcase both technical depth and breadth of knowledge`;

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_TURNS = 10; // cap to last 10 exchanges to control token cost

export async function POST(req: NextRequest) {
  try {
    const { message, chatHistory = [] } = await req.json();

    if (!message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Guard: reject oversized input to prevent token abuse
    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: 'Message too long (max 2000 characters)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!process.env.COHERE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Cap history to last N turns so prompt size stays bounded
    const recentHistory = Array.isArray(chatHistory)
      ? chatHistory.slice(-MAX_HISTORY_TURNS)
      : [];

    const formattedHistory = recentHistory
      .filter((msg: { role: string; content: string }) => msg.content?.trim())
      .map((msg: { role: string; content: string }) => ({
        role: (msg.role === 'user' ? 'USER' : 'CHATBOT') as 'USER' | 'CHATBOT',
        message: msg.content,
      }));

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // NOTE: must await chatStream before iterating — it returns Promise<AsyncIterable>
          const chatStream = await cohere.chatStream({
            model: 'command-a-03-2025',
            message,
            chatHistory: formattedHistory,
            preamble: SYSTEM_PROMPT,
            temperature: 0.7,
            promptTruncation: 'AUTO',
          });

          for await (const chunk of chatStream) {
            if (chunk.eventType === 'text-generation') {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: chunk.text })}\n\n`)
              );
            } else if (chunk.eventType === 'stream-end') {
              controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            }
          }
        } catch (err: any) {
          console.error('Stream error:', err);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`)
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err: any) {
    console.error('Chat API Error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
