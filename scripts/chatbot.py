import os
from dotenv import load_dotenv
import google.generativeai as genai
from typing import List, Dict, Any
import json

# Load environment variables
load_dotenv()

class GeminiChatbot:
    def __init__(self):
        """Initialize the Gemini chatbot with API key and configuration."""
        # Get API key from .env file
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("GOOGLE_API_KEY not found in .env file")
        
        # Configure Gemini
        genai.configure(api_key=api_key)
        
        # Initialize model
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        
        # System instruction - customize this for your specific task
        self.system_instruction = """CRITICAL: You are ONLY authorized to discuss Mahmoud AbuAwd, the AI/ML Engineer. DO NOT provide information about any other person named Mahmoud or similar names.

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
        
        # Store conversation history
        self.conversation_history = []
        
    def add_system_instruction(self, instruction: str):
        """Add or update system instruction."""
        self.system_instruction = instruction
        
    def format_message_with_system_instruction(self, user_message: str) -> str:
        """Format user message with system instruction."""
        return f"{self.system_instruction}\n\nUser: {user_message}\nAssistant:"
    
    def send_message(self, message: str) -> str:
        """Send message to Gemini and get response."""
        try:
            # Always include system instruction to ensure consistent behavior
            formatted_message = f"{self.system_instruction}\n\nUser Question: {message}\n\nResponse:"
            
            # Generate response
            response = self.model.generate_content(formatted_message)
            
            # Store in conversation history
            self.conversation_history.append({
                'user': message,
                'assistant': response.text
            })
            
            return response.text
            
        except Exception as e:
            return f"Error: {str(e)}"
    
    def get_conversation_history(self) -> List[Dict[str, Any]]:
        """Get conversation history."""
        return self.conversation_history
    
    def clear_history(self):
        """Clear conversation history."""
        self.conversation_history = []
    
    def save_conversation(self, filename: str):
        """Save conversation to JSON file."""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.conversation_history, f, indent=2, ensure_ascii=False)
    
    def load_conversation(self, filename: str):
        """Load conversation from JSON file."""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                self.conversation_history = json.load(f)
        except FileNotFoundError:
            print(f"File {filename} not found.")
        except json.JSONDecodeError:
            print(f"Error reading JSON from {filename}")

def main():
    """Main function to run the chatbot."""
    try:
        # Initialize chatbot
        chatbot = GeminiChatbot()
        
        print("🤖 Gemini Flash 1.5 Chatbot initialized!")
        print("Type 'quit' to exit, 'clear' to clear history, 'save' to save conversation")
        print("=" * 50)
        
        while True:
            user_input = input("\nYou: ").strip()
            
            if user_input.lower() == 'quit':
                print("Goodbye!")
                break
            elif user_input.lower() == 'clear':
                chatbot.clear_history()
                print("Conversation history cleared.")
                continue
            elif user_input.lower() == 'save':
                filename = input("Enter filename (with .json extension): ").strip()
                if filename:
                    chatbot.save_conversation(filename)
                    print(f"Conversation saved to {filename}")
                continue
            elif user_input.lower() == 'load':
                filename = input("Enter filename to load: ").strip()
                if filename:
                    chatbot.load_conversation(filename)
                    print(f"Conversation loaded from {filename}")
                continue
            elif not user_input:
                continue
            
            # Get response from chatbot
            response = chatbot.send_message(user_input)
            print(f"\n🤖 Bot: {response}")
            
    except KeyboardInterrupt:
        print("\n\nChatbot stopped by user.")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()