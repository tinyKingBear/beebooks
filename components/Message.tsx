import React, { ReactNode, createContext, useContext, useState } from "react";

type MessageType = "success" | "error" | "warning" | "info";

interface Message {
  type: MessageType;
  content: string;
}

interface MessageContextProps {
  showMessage: (message: Message) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

export const MessageProvider: React.FC<any> = ({ children }) => {
  const [message, setMessage] = useState<Message | null>(null);
  const [visible, setVisible] = useState(false);

  const showMessage = (message: Message) => {
    setMessage(message);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {visible && message && (
        <div className={`message ${message.type}`}>{message.content}</div>
      )}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }

  return context;
};
