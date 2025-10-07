import React, { useState, useEffect, useRef } from 'react';
import { Conversation } from '@/entities/Conversation';
import { Message } from '@/entities/Message';
import { MessageCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import ConversationList from '../components/chat/ConversationList';
import ChatHeader from '../components/chat/ChatHeader';
import MessageBubble from '../components/chat/MessageBubble';
import MessageInput from '../components/chat/MessageInput';

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation.id);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    setLoading(true);
    const data = await Conversation.list('-last_message_time');
    setConversations(data);
    setLoading(false);
  };

  const loadMessages = async (conversationId) => {
    const data = await Message.filter({ conversation_id: conversationId }, 'created_date');
    setMessages(data);
  };

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setShowChat(true);
    // Mark conversation as read
    if (conversation.unread_count > 0) {
      Conversation.update(conversation.id, { unread_count: 0 });
    }
  };

  const handleSendMessage = async (content) => {
    if (!activeConversation) return;

    const newMessage = await Message.create({
      conversation_id: activeConversation.id,
      content,
      is_sent: true,
      timestamp: new Date().toISOString(),
      is_read: false
    });

    // Update conversation last message
    await Conversation.update(activeConversation.id, {
      last_message: content,
      last_message_time: new Date().toISOString()
    });

    setMessages(prev => [...prev, newMessage]);
    loadConversations();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBack = () => {
    setShowChat(false);
    setActiveConversation(null);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations Sidebar */}
      <div className={`${showChat ? 'hidden md:flex' : 'flex'} w-full md:w-96 flex-col`}>
        <div className="h-16 px-6 border-b border-gray-100 flex items-center bg-white">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Messages
          </h1>
        </div>
        <ConversationList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Chat Area */}
      <div className={`${showChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white`}>
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} onBack={handleBack} />
            
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence>
                {messages.map((message, index) => {
                  const prevMessage = messages[index - 1];
                  const isConsecutive = prevMessage && 
                    prevMessage.is_sent === message.is_sent &&
                    new Date(message.created_date) - new Date(prevMessage.created_date) < 60000;
                  
                  return (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isConsecutive={isConsecutive}
                    />
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <MessageInput onSend={handleSendMessage} disabled={false} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Messages</h2>
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}