import React from 'react';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChatHeader({ conversation, onBack }) {
  if (!conversation) return null;

  return (
    <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="md:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
            {conversation.contact_avatar || conversation.contact_name.charAt(0).toUpperCase()}
          </div>
          {conversation.is_online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{conversation.contact_name}</h2>
          <p className="text-xs text-gray-500">
            {conversation.is_online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}