"use client";

import { useState, useEffect, useRef } from "react";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Send, 
  Bot, 
  User, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Phone,
  Calendar,
  ShoppingCart,
  Sparkles,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/lib/store/hooks";
import { useGetUserStoresQuery } from "@/lib/store/services/onboardingApi";
import { useGetSquareLocationsQuery } from "@/lib/store/services/squareApi";
import { ServiceConfig } from "@/lib/types/onboarding";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AISettings {
  name: string;
  tone: string;
}

export default function Playground() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: stores } = useGetUserStoresQuery(user?.uid || "");
  const { data: squareData } = useGetSquareLocationsQuery();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. I can help you with bookings, orders, and customer inquiries. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSettings, setAiSettings] = useState<AISettings>({
    name: 'AI Assistant',
    tone: 'friendly'
  });
  const [expandedSections, setExpandedSections] = useState({
    aiSettings: true,
    integrations: true
  });

  const toneOptions = [
    { value: 'friendly', label: 'Friendly' },
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'empathetic', label: 'Empathetic' }
  ];

  // Get connected services from store data
  const selectedStore = stores?.[0];
  const connectedServices = selectedStore?.storeData?.selectedServices || [];
  const isSquareConnected = squareData?.location || squareData?.locations?.length > 0;

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response with context about connected services
    setTimeout(() => {
      let responseContent = `This is a simulated response from ${aiSettings.name} in a ${aiSettings.tone} tone. `;
      
      if (connectedServices.length > 0) {
        responseContent += `I can help you with: ${connectedServices.map(service => ServiceConfig[service as keyof typeof ServiceConfig]?.label).join(', ')}. `;
      }
      
      if (isSquareConnected) {
        responseContent += `I'm connected to your Square POS system and can help with bookings and orders.`;
      } else {
        responseContent += `Note: Square POS is not connected yet.`;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSection = (section: 'aiSettings' | 'integrations') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'social_media_booking':
        return <Calendar className="h-4 w-4" />;
      case 'social_media_ordering':
        return <ShoppingCart className="h-4 w-4" />;
      case 'table_booking':
        return <Calendar className="h-4 w-4" />;
      case 'takeaway_orders':
        return <ShoppingCart className="h-4 w-4" />;
      case 'ai_call_agent':
        return <Phone className="h-4 w-4" />;
      case 'social_media_marketing':
        return <Sparkles className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Playground</h1>
                <p className="text-slate-400 text-sm">Test and interact with your AI agent</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* Chat Interface - Takes most of the space */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <Card className="border-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 h-full flex flex-col m-6 min-h-0 overflow-hidden">
                <CardHeader className="border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{aiSettings.name}</CardTitle>
                        <CardDescription className="text-slate-300">
                          {aiSettings.tone.charAt(0).toUpperCase() + aiSettings.tone.slice(1)} • Ready to assist
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-slate-300">Online</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
                  {/* Messages Area */}
                  <div className="messages-container flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50 min-h-0">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.sender === 'ai' && (
                          <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white'
                              : 'bg-slate-700/80 text-slate-200 border border-slate-600 backdrop-blur-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>

                        {message.sender === 'user' && (
                          <div className="h-8 w-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-slate-700/80 text-slate-200 border border-slate-600 rounded-2xl px-4 py-3 backdrop-blur-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-slate-700 p-4 bg-slate-800/80 backdrop-blur-sm flex-shrink-0">
                    <div className="flex gap-3">
                      <Textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here... (Press Enter to send)"
                        className="flex-1 bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 resize-none backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={1}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 shadow-lg transition-all duration-200"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Accordion Panel */}
            <div className="w-80 flex-shrink-0 border-l border-slate-700 bg-slate-800/30 backdrop-blur-sm overflow-hidden">
              <div className="h-full overflow-y-auto">
                {/* AI Settings Accordion */}
                <div className="border-b border-slate-700">
                  <button
                    onClick={() => toggleSection('aiSettings')}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-slate-300" />
                      <span className="font-semibold text-white">AI Settings</span>
                    </div>
                    {expandedSections.aiSettings ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                  
                  {expandedSections.aiSettings && (
                    <div className="px-4 pb-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ai-name" className="text-slate-300 text-sm font-medium">AI Name</Label>
                        <Input
                          id="ai-name"
                          value={aiSettings.name}
                          onChange={(e) => setAiSettings(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-slate-700/80 border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter AI name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ai-tone" className="text-slate-300 text-sm font-medium">Chat Tone</Label>
                        <Select
                          value={aiSettings.tone}
                          onValueChange={(value) => setAiSettings(prev => ({ ...prev, tone: value }))}
                        >
                          <SelectTrigger className="bg-slate-700/80 border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            {toneOptions.map((tone) => (
                              <SelectItem key={tone.value} value={tone.value} className="text-white">
                                {tone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator className="bg-slate-700" />

                      <div className="space-y-2">
                        <Label className="text-slate-300 text-sm font-medium">Quick Actions</Label>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                            onClick={() => setMessages([{
                              id: '1',
                              content: 'Hello! I\'m your AI assistant. I can help you with bookings, orders, and customer inquiries. How can I assist you today?',
                              sender: 'ai',
                              timestamp: new Date()
                            }])}
                          >
                            Clear Chat
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                            onClick={() => {
                              const testMessage = "Hello! Can you help me with a booking?";
                              setInputMessage(testMessage);
                            }}
                          >
                            Test Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Integrations Accordion */}
                <div>
                  <button
                    onClick={() => toggleSection('integrations')}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-slate-300" />
                      <span className="font-semibold text-white">Integrations</span>
                    </div>
                    {expandedSections.integrations ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                  
                  {expandedSections.integrations && (
                    <div className="px-4 pb-4 space-y-4">
                      {/* Square POS Status */}
                      <div className="space-y-2">
                        <Label className="text-slate-300 text-sm font-medium">POS System</Label>
                        <div className="flex items-center justify-between p-3 bg-slate-700/80 rounded-lg border border-slate-600">
                          <span className="text-sm text-slate-300">Square POS</span>
                          <div className="flex items-center gap-2">
                            {isSquareConnected ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-400" />
                                <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-700">
                                  Connected
                                </Badge>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-red-400" />
                                <Badge variant="secondary" className="bg-red-900/50 text-red-300 border-red-700">
                                  Not Connected
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Selected Services */}
                      <div className="space-y-2">
                        <Label className="text-slate-300 text-sm font-medium">Active Services</Label>
                        <div className="space-y-2">
                          {connectedServices.length > 0 ? (
                            connectedServices.map((service) => {
                              const serviceConfig = ServiceConfig[service as keyof typeof ServiceConfig];
                              return (
                                <div key={service} className="flex items-center justify-between p-3 bg-slate-700/80 rounded-lg border border-slate-600">
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 bg-indigo-600/20 rounded flex items-center justify-center">
                                      {getServiceIcon(service)}
                                    </div>
                                    <span className="text-sm text-slate-300">{serviceConfig?.label}</span>
                                  </div>
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </div>
                              );
                            })
                          ) : (
                            <div className="p-3 bg-slate-700/80 rounded-lg border border-slate-600">
                              <p className="text-sm text-slate-400 text-center">No services configured</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 