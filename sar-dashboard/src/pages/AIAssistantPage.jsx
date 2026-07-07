import React, { useState, useRef, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { Bot, Send, Sparkles } from 'lucide-react';

const initialMessages = [
    { role: 'assistant', text: 'Hello! I\'m your Investigator AI Assistant. I can help you with case analysis, SAR questions, and compliance research. How can I assist you today?', time: '14:30' },
];



const aiResponses = {
    'Explain Bella Trading LLC transactions': `I've analyzed the recent activity for Bella Trading LLC.

They received $450,000 in rapid wire transfers from three unrelated shell companies in Cyprus and Malta on Feb 12th.

Immediately after, $440,000 was moved out to a High-Risk Jurisdiction (UAE) via multiple smaller transactions.

This pattern flags as Layering and Pass-Through Activity—typical of shell company operations hiding the true source of funds.

Furthermore, the velocity of these funds moving through the account within a 24-hour window, combined with the lack of clear economic rationale for the Cypriot and Maltese counterparties, strongly suggests an attempt to layer illicit funds before integration into the destination jurisdiction.`,
    'Why was case CSE-4521 flagged?': `Case CSE-4521 (Mikhail Petrov) was flagged due to 4 triggered rules:\n\n1. **Layering Pattern** — 23 incoming transfers from 8 distinct counterparties totalling £245,300 within 26 days\n2. **Structuring Detection** — 7 cash deposits between £8,500–£9,800 (consistent with possible structuring to avoid reporting thresholds)\n3. **FATF Geo-Risk** — 2 outbound wire transfers to grey-list jurisdictions\n4. **Velocity Anomaly** — 340% increase over 12-month average\n\nCombined risk score: **94/100** (Critical)`,
    'default': 'Based on my analysis, I would need more specific details about what you\'re looking for. Could you clarify your question? I can help with:\n\n• **Case Analysis** — Explain why specific cases were flagged\n• **SAR Search** — Find similar filed SARs\n• **Risk Insights** — Break down risk scores and patterns\n• **Compliance Guidance** — Regulatory requirements and best practices'
};

const AIAssistantPage = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [streamingText, setStreamingText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText, isTyping]);

    const sendMessage = (text) => {
        const userMsg = text || input;
        if (!userMsg.trim()) return;
        const newMessages = [...messages, { role: 'user', text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
        setMessages(newMessages);
        setInput('');

        // Simulate AI response
        setTimeout(async () => {
            let responseText = aiResponses['default'];
            const lowerMsg = userMsg.toLowerCase();

            // Flexible matching logic
            if (aiResponses[userMsg]) {
                responseText = aiResponses[userMsg];
            } else if (lowerMsg.includes('bella trading')) {
                responseText = aiResponses['Explain Bella Trading LLC transactions'];
            } else if (lowerMsg.includes('cse-4521') || lowerMsg.includes('mikhail') || lowerMsg.includes('flagged')) {
                responseText = aiResponses['Why was case CSE-4521 flagged?'];
            }

            setIsTyping(true);

            // Typing effect
            for (let i = 0; i <= responseText.length; i++) {
                setStreamingText(responseText.substring(0, i));
                await new Promise(resolve => setTimeout(resolve, 10)); // 10ms per char speed
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                text: responseText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

            setIsTyping(false);
            setStreamingText('');

        }, 3000);
    };

    return (
        <>
            <PageHeader
                title="Investigator AI Assistant"
                subtitle="Ask questions about cases, SARs, and compliance"

            />

            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 240px)' }}>
                {/* Messages */}
                <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
                    {messages.map((m, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '20px', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                            {m.role === 'assistant' && (
                                <div style={{
                                    width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Bot size={18} color="white" />
                                </div>
                            )}
                            <div style={{
                                maxWidth: '600px', padding: '14px 18px', borderRadius: '12px',
                                background: m.role === 'user' ? '#0c4a6e' : '#f8fafc',
                                color: m.role === 'user' ? 'white' : '#1e293b',
                                fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap'
                            }}>
                                {m.text}
                                <div style={{ fontSize: '11px', color: m.role === 'user' ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginTop: '8px' }}>{m.time}</div>
                            </div>
                        </div>
                    ))}

                    {/* Streaming Message */}
                    {isTyping && (
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', justifyContent: 'flex-start' }}>
                            <div style={{
                                width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Bot size={18} color="white" />
                            </div>
                            <div style={{
                                maxWidth: '600px', padding: '14px 18px', borderRadius: '12px',
                                background: '#f8fafc',
                                color: '#1e293b',
                                fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap'
                            }}>
                                {streamingText}
                                <span style={{ display: 'inline-block', width: '4px', height: '14px', background: '#8b5cf6', marginLeft: '4px', animation: 'blink 1s infinite' }}></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>



                {/* Input */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about cases, SARs, or compliance..."
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }}
                    />
                    <button
                        onClick={() => sendMessage()}
                        style={{
                            padding: '12px 20px', background: 'linear-gradient(135deg, #0c4a6e, #0369a1)',
                            border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', gap: '8px', color: 'white', fontSize: '14px', fontWeight: '600'
                        }}
                    >
                        <Send size={16} />Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default AIAssistantPage;
