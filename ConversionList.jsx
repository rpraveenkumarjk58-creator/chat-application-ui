import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ConversationList({ conversations, activeConversation, onSelectConversation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.contact_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-none focus:bg-gray-100 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-50 hover:bg-gray-50 ${
              activeConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                  {conversation.contact_avatar || conversation.contact_name.charAt(0).toUpperCase()}
                </div>
                {conversation.is_online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{conversation.contact_name}</h3>
                  <span className="text-xs text-gray-500">
                    {format(new Date(conversation.last_message_time || conversation.created_date), 'HH:mm')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate flex-1">{conversation.last_message}</p>
                  {conversation.unread_count > 0 && (
                    <Badge className="ml-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {conversation.unread_count}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}