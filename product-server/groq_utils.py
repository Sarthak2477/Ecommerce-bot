from groq import Groq
import os
from prompt import LLM_PROMPT

client = Groq(api_key="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")

def get_sql_from_groq(user_input):
    prompt = LLM_PROMPT.format(input=user_input)
    print(user_input)
    chat_response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama3-8b-8192"  # Or "mixtral-8x7b-32768"
    )
    
    output = chat_response.choices[0].message.content.strip()
    print(output)
    # Extract SQL line from response
    lines = output.splitlines()
    for line in lines:
        if line.strip().lower().startswith("select"):
            return line.strip()
    
    return None


