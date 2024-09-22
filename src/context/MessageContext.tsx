'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: number;
  to: string;
  message: string;
  timestamp: string;
}

interface MessageContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Message) => {
    setMessages((prevMessages) => [msg, ...prevMessages]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
