import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, Bot, User, Copy, ExternalLink } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import { useComplianceChat } from '@/hooks/use-compliance-chat';
import { toast } from 'sonner';
import type { ChatMessage } from '@/types';

interface ComplianceAssistantProps {
  onNavigate: (page: string, params?: any) => void;
}

export function ComplianceAssistant({ onNavigate }: ComplianceAssistantProps) {
  const [messages, setMessages] = useKV<ChatMessage[]>('chat-messages', []);
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useComplianceChat();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages((current) => [...current, userMessage]);
    setInput('');

    try {
      const assistantMessage = await sendMessage(input.trim());
      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      toast.error('Failed to get response. Please try again.');
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.success('Chat history cleared');
  };

  const handleCopyCitation = (citation: any) => {
    const citationText = `${citation.standard} - ${citation.section}: ${citation.text}`;
    navigator.clipboard.writeText(citationText);
    toast.success('Citation copied to clipboard');
  };

  const suggestedQuestions = [
    "What are the key requirements for design controls under FDA QSR?",
    "How does ISO 13485 differ from ISO 9001 for medical devices?",
    "What are the clinical evaluation requirements under EU MDR?",
    "What is required for corrective and preventive action (CAPA) systems?",
    "How should post-market surveillance be implemented?"
  ];

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">AI Compliance Assistant</h1>
          <p className="text-muted-foreground">
            Get expert guidance on medical device regulatory requirements
          </p>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" onClick={handleClearChat}>
            Clear Chat
          </Button>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {messages.length === 0 ? (
            <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="text-center space-y-4 mb-8">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Welcome to your Compliance Assistant</h3>
                  <p className="text-muted-foreground max-w-md">
                    Ask me anything about medical device regulatory requirements. I can help with FDA QSR, ISO 13485, EU MDR, and more.
                  </p>
                </div>
              </div>

              <div className="w-full max-w-2xl space-y-3">
                <h4 className="font-medium text-sm">Try asking about:</h4>
                <div className="grid gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto p-3 whitespace-normal"
                      onClick={() => setInput(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          ) : (
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="p-2 bg-primary/10 rounded-full shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] space-y-2 ${
                      message.role === 'user' ? 'items-end' : 'items-start'
                    }`}>
                      <div className={`p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>

                      {message.citations && message.citations.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Citations:</p>
                          {message.citations.map((citation, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-card border rounded text-sm"
                            >
                              <div className="flex-1">
                                <span className="font-medium">{citation.standard}</span>
                                <span className="text-muted-foreground"> - {citation.section}: {citation.text}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyCitation(citation)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="p-2 bg-secondary rounded-full shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 bg-primary/10 rounded-full shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          <CardContent className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about regulatory requirements..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This AI assistant provides guidance based on regulatory standards. Always consult with qualified professionals for official compliance advice.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}