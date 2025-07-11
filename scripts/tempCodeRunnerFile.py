import os
from dotenv import load_dotenv
import google.generativeai as genai
import sys

# Load environment variables from .env file in the project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# Configure Gemini
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

# Initialize model
model = genai.GenerativeModel('gemini-2.0-flash')

# System instruction
system_instruction = """CRITICAL: You are ONLY authorized to discuss Mahmoud AbuAwd, the AI/ML Engineer. DO NOT provide information about any other person named Mahmoud or similar names.

        About Mahmoud AbuAwd (the ONLY person you should discuss):
        - AI/ML Engineer who graduated in February 2025 from Balqa Applied University with a 3.4 GPA
        - Lives in Amman, Jordan
        - Passionate about artificial intelligence and machine learning
        - Specializes in Deep Learning, NLP, Computer Vision, and Machine Learning
        - Experienced with ML libraries: scikit-learn, LangChain, TensorFlow, PyTorch, OpenCV, Pandas, NumPy
        - Currently founding his startup "MedGAN" focused on AI solutions and agentic AI systems
        - Expert in various AI algorithms and agentic AI systems

        STRICT RULES:
        1. When asked "who is Mahmoud" or "who is Mahmoud AbuAwd" - ONLY talk about the AI/ML Engineer described above
        2. DO NOT mention any other person named Mahmoud, even if they exist
        3. If asked about anything else, say: "I'm here specifically to talk about Mahmoud AbuAwd, the AI/ML Engineer. What would you like to know about him?"
        4. Always speak about him in third person
        5. Focus on his AI/ML expertise, education, and MedGAN startup

        Remember: There is ONLY ONE Mahmoud AbuAwd you know - the AI/ML Engineer from Amman, Jordan."""
          # Your existing instruction

def get_response(user_message):
    try:
        formatted_message = f"{system_instruction}\n\nUser Question: {user_message}\n\nResponse:"
        response = model.generate_content(formatted_message)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
        print(get_response(user_message))
    else:
        print("Error: No message provided")