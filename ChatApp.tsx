// src/ChatApp.tsx
import React, { useState } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSend = () => {
        if (input.trim()) {
            const newMessage: Message = {
                id: Date.now(),
                text: input,
                sender: 'user',
            };

            setMessages([...messages, newMessage]);
            setInput('');

            // Generate bot response based on keywords
            setTimeout(() => {
                let botText = "I'm here to help. How can I assist you with solar rental deals?";

                // Simple keyword-based response logic
                if (input.toLowerCase().includes("solar rental")) {
                    botText = "Our solar rental deals offer affordable access to solar energy solutions. We provide installation, maintenance, and monitoring services at competitive prices.";
                } else if (input.toLowerCase().includes("pricing")) {
                    botText = "Our solar rental pricing is flexible. You can pay a low monthly rate with no upfront costs, depending on the system size and features.";
                } else if (input.toLowerCase().includes("battery monitoring")) {
                    botText = "Battery monitoring is included in our plans! You can track your battery's state of charge, energy usage, and performance on our mobile app.";
                } else if (input.toLowerCase().includes("installation")) {
                    botText = "Our team will handle the entire installation process. Our rentals come with full maintenance and support for hassle-free use.";
                }

                const botResponse: Message = {
                    id: Date.now() + 1,
                    text: botText,
                    sender: 'bot',
                };
                setMessages((prevMessages) => [...prevMessages, botResponse]);
            }, 1000);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="h-96 p-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`${
                                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                                } p-2 rounded-lg mb-2 max-w-xs`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    />
                    <button
                        onClick={handleSend}
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
