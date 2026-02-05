"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmergencyChat = ({ emergencyId, userId, receiverId, userRole }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const senderType = userRole === 'patient' ? 'patient' : 'doctor';

  useEffect(() => {
    if (!emergencyId || !userId) {
      console.error('EmergencyChat: Missing required props', { emergencyId, userId });
      return;
    }

    let isMounted = true;

    const connectWebSocket = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        console.log('WebSocket already connected');
        return;
      }

      // Establish WebSocket connection
      console.log('Attempting WebSocket connection:', { emergencyId, userId });
      const ws = new WebSocket(`ws://localhost:3004?emergencyId=${emergencyId}&userId=${userId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket Chat Connection Established');
        if (isMounted) {
          setSocket(ws);
        }
      };

      ws.onmessage = (event) => {
        try {
          const receivedMessage = JSON.parse(event.data);
          console.log('Received message:', receivedMessage);
          
          // Check if it's an error message from server
          if (receivedMessage.error) {
            console.error('Server error:', receivedMessage.error);
            return;
          }
          
          if (isMounted) {
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket Chat Error:', error);
        console.error('WebSocket Error Details:', {
          readyState: ws.readyState,
          url: ws.url
        });
      };

      ws.onclose = (event) => {
        console.log('WebSocket Chat Disconnected', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        
        // Only attempt reconnect if component is still mounted and close wasn't clean
        if (isMounted && !event.wasClean && event.code !== 1000) {
          console.log('Attempting to reconnect in 3 seconds...');
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };
    };

    connectWebSocket();

    // Fetch previous messages
    const fetchPreviousMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3004/api/chat/messages/${emergencyId}`);
        const previousMessages = await response.json();
        setMessages(previousMessages);
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    fetchPreviousMessages();

    return () => {
      console.log('Cleaning up WebSocket connection');
      isMounted = false;
      
      // Clear any pending reconnect timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      // Close WebSocket connection cleanly
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close(1000, 'Component unmounting');
      }
    };
  }, [emergencyId, userId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "" && socket && receiverId) {
      const messageData = {
        senderId: userId,
        receiverId: receiverId,
        senderType: senderType,
        message: inputMessage
      };

      socket.send(JSON.stringify(messageData));
      setInputMessage("");
    } else if (!receiverId) {
      console.error('No receiver ID available for chat');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 bg-gray-700 rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold">Emergency Chat</h3>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${
              msg.senderType === 'doctor' ? 'items-start' : 'items-end'
            }`}
          >
            <div 
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                msg.senderType === 'doctor' 
                  ? 'bg-blue-800 text-white' 
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p>{msg.message}</p>
              <p className="text-xs text-blue-200 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-700 flex items-center space-x-2">
        <Input
          placeholder="Type your message..."
          className="flex-1"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button size="icon" onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EmergencyChat;