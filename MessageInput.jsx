import React from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function MessageInput({ onSend, disabled }) {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-end gap-3">
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 mb-1">
          <Paperclip className="w-5 h-5" />
        </Button>

        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className="resize-none min-h-[44px] max-h-32 py-3 pr-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-2xl"
            rows={1}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 text-gray-600 hover:text-gray-900"
          >
            <Smile className="w-5 h-5" />
          </Button>
        </div>

        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full w-11 h-11 p-0 shadow-lg disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}