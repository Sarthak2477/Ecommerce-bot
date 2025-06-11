'use client'
import React, { useState } from 'react';
import { Send, Mic, Image } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const quickSuggestions = [
    'Show me laptops under $1000',
    'Best selling smartphones',
    'Gaming accessories',
    'What\'s on sale today?'
  ];

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="mb-3">
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSendMessage(suggestion)}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              disabled={disabled}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about products, compare prices, or get recommendations..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 text-black rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={disabled}
          />
          
        </div>

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};