import React from 'react';
import { Message } from '../../types';
import { ProductCard } from '../Product/ProductCard';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const time = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-xs lg:max-w-2xl ${isBot ? 'order-2' : 'order-1'}`}>
        {isBot && (
          <div className="flex items-center mb-2">
            <div className="bg-blue-600 rounded-full p-1 mr-2">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-gray-500">Shopping Assistant</span>
          </div>
        )}

        

        {message.products && message.products.length > 0 && (
          <div className="mt-3 space-y-3">
            {message.type === 'product-list' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {message.products.map((product) => (
                  <ProductCard key={product.id} product={product} compact />
                ))}
              </div>
            ) : (
              message.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}

        <div className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-blue-200'}`}>
          {time}
        </div>
      </div>

      {!isBot && (
        <div className="order-2 ml-2">
          <div className="bg-blue-600 rounded-full p-1">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};