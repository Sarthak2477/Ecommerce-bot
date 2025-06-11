from groq import Groq
import os
from prompt import LLM_PROMPT
from dotenv import load_dotenv

load_dotenv() 

GROQ_API_KEY = os.getenv("GROQ_API_KEY")



client = Groq(api_key=GROQ_API_KEY)

def get_sql_from_groq(user_input):
    prompt = LLM_PROMPT.format(input=user_input)
    print(user_input)
    chat_response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama3-8b-8192"
    )
    
    output = chat_response.choices[0].message.content.strip()
    print(output)
    for line in output.splitlines():
        if line.strip().lower().startswith("select"):
            return line.strip()
    return None
