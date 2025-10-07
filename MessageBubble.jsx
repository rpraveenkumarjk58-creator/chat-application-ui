import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

export default function MessageBubble({ message, isConsecutive }) {
  return (
    <motion.div
      
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      
      className={`flex ${message.is_sent ? 'justify-end' : 'justify-start'} ${isConsecutive ? 'mt-1' : 'mt-4'}`}
    >
      <div className={`max-w-[70%] ${message.is_sent ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-2.5 rounded-2xl shadow-sm ${
            message.is_sent
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        </div>
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-xs text-gray-500">
            {format(new Date(message.timestamp || message.created_date), 'HH:mm')}
          </span>
          {message.is_sent && (
            <div className="text-gray-500">
              {message.is_read ? (
                <CheckCheck className="w-3 h-3 text-blue-500" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}