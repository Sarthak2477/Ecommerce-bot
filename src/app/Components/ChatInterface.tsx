'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ChatService } from '../Services/chatService';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    } else {
      // Send welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        sender: 'bot',
        timestamp: new Date(),
        content: "Welcome! I'm your shopping assistant. I can help you find products, compare prices, and get great deals. What are you looking for today?",
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: new Date(),
      content,
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const botResponse = await chatService.processMessage(content);
      console.log("Response: ", botResponse);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        timestamp: new Date(),
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    
    const welcomeMessage: Message = {
      id: 'welcome-' + Date.now(),
      sender: 'bot',
      timestamp: new Date(),
      content: "Chat reset! How can I help you find the perfect products today?",
      type: 'text'
    };
    setMessages([welcomeMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader onResetChat={handleResetChat} messageCount={messages.length} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};