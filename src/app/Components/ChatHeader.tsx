'use client'
import React from 'react';
import { MessageCircle, RotateCcw, LogOut, User } from 'lucide-react';

interface ChatHeaderProps {
  onResetChat: () => void;
  messageCount: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onResetChat, messageCount }) => {

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-full p-2">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Shopping Assistant</h1>
            <p className="text-sm text-gray-500">
              {messageCount > 0 ? `${messageCount} messages` : 'Start your shopping journey'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          

          <button
            onClick={onResetChat}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          <button
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};