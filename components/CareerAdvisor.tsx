
import React, { useState, useRef, useEffect } from 'react';
import { generateContent } from '../services/geminiService';
import { ChatMessage } from '../types';

const CareerAdvisor: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'היי! אני יועץ הקריירה הדיגיטלי שלך. איך אני יכול לעזור לך היום? אפשר לשאול אותי על הכנת קורות חיים, טיפים לראיון עבודה ועוד.' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const systemInstruction = "You are a friendly and encouraging career advisor for Israeli teenagers (ages 14-18). Your goal is to provide helpful, practical, and safe advice for finding their first jobs. Keep your answers concise, positive, and easy to understand. Respond in Hebrew.";
            const responseText = await generateContent(userInput, systemInstruction);
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            console.error('Error generating content:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'אוי, נראה שיש לי בעיה קטנה. אפשר לנסות שוב בעוד כמה רגעים?' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-5 right-5 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-cyan-500 text-white rounded-full p-4 shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    aria-label="Open career advisor chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 16h-2v-2h2v2zm0-4h-2V7h2v5z"></path></svg>
                </button>
            </div>

            <div className={`fixed bottom-0 right-0 h-full w-full md:h-auto md:max-h-[80vh] md:w-96 bg-white rounded-t-lg md:rounded-lg shadow-2xl flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-[110%]'}`}>
                <header className="bg-cyan-500 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <h3 className="font-bold text-lg">יועץ קריירה AI</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:bg-cyan-600 p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>

                <div ref={chatBoxRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-cyan-500 flex-shrink-0"></div>}
                            <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-slate-200 text-slate-800 rounded-br-none' : 'bg-cyan-50 text-slate-800 rounded-bl-none'}`}>
                               <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start gap-2">
                             <div className="w-8 h-8 rounded-full bg-cyan-500 flex-shrink-0"></div>
                            <div className="bg-cyan-50 px-4 py-2 rounded-2xl rounded-bl-none flex items-center space-x-2">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200">
                    <div className="relative">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="כתוב את שאלתך כאן..."
                            className="w-full pr-12 pl-4 py-3 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-12 text-cyan-500 disabled:text-slate-400 hover:text-cyan-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform -rotate-90" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20h18L12 4z"></path></svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CareerAdvisor;
