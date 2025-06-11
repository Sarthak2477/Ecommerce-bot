// src/services/chatService.ts
import { Message } from "../types";
export class ChatService {
    private static instance: ChatService;
  
    static getInstance() {
      if (!ChatService.instance) {
        ChatService.instance = new ChatService();
      }
      return ChatService.instance;
    }
  
    async processMessage(userInput: string): Promise<Message> {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput }),
        });
      
        if (!response.ok) {
          throw new Error('Failed to fetch from backend');
        }
      
        const data = await response.json();
      
        // Determine message type based on presence of products
        let messageType: Message['type'] = 'text';
        if (data.products && Array.isArray(data.products)) {
          if (data.products.length === 1) {
            messageType = 'product';
          } else if (data.products.length > 1) {
            messageType = 'product-list';
          }
        }
      
        // Build the message
        const botMessage: Message = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          timestamp: new Date(),
          content: data.reply || "Sorry, I couldn't find anything.",
          products: data.products,  // optional, can be undefined
          type: messageType,
        };
      
        return botMessage;
      }      
  }
  