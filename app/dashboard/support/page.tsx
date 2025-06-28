"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  FileText,
  Tag,
  Calendar
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/lib/store/hooks";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'investigating' | 'completed';
  category: 'technical' | 'billing' | 'feature_request' | 'bug_report' | 'general';
  createdAt: Date;
  customerName: string;
  customerEmail: string;
}

export default function SupportPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock tickets data
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Square POS Integration Issue',
      description: 'Having trouble connecting my Square POS system. Getting an error message when trying to sync.',
      status: 'pending',
      category: 'technical',
      createdAt: new Date('2024-01-15'),
      customerName: 'John Smith',
      customerEmail: 'john@example.com'
    },
    {
      id: '2',
      title: 'AI Agent Not Responding',
      description: 'My AI agent stopped responding to customer messages yesterday. Need urgent help.',
      status: 'investigating',
      category: 'technical',
      createdAt: new Date('2024-01-14'),
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com'
    },
    {
      id: '3',
      title: 'Billing Question',
      description: 'I have a question about my monthly subscription charges.',
      status: 'completed',
      category: 'billing',
      createdAt: new Date('2024-01-10'),
      customerName: 'Mike Wilson',
      customerEmail: 'mike@example.com'
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general' as Ticket['category']
  });

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'investigating': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'investigating': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.description) return;

    const ticket: Ticket = {
      id: Date.now().toString(),
      title: newTicket.title,
      description: newTicket.description,
      status: 'pending',
      category: newTicket.category,
      createdAt: new Date(),
      customerName: user?.displayName || 'Unknown',
      customerEmail: user?.email || ''
    };

    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ title: '', description: '', category: 'general' });
    setShowNewTicket(false);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Support Tickets</h1>
            <p className="text-slate-400 mt-2">Create and track your support requests</p>
          </div>
          <Button
            onClick={() => setShowNewTicket(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all" className="text-white">All Status</SelectItem>
                    <SelectItem value="pending" className="text-white">Pending</SelectItem>
                    <SelectItem value="investigating" className="text-white">Investigating</SelectItem>
                    <SelectItem value="completed" className="text-white">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <div className="grid gap-6">
          {filteredTickets.map((ticket) => (
            <Card 
              key={ticket.id} 
              className="border-0 shadow-lg bg-slate-900 border border-slate-700"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1 capitalize">{ticket.status}</span>
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span className="capitalize">{ticket.category.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{ticket.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>Ticket #{ticket.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Ticket Modal */}
        {showNewTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl border-0 shadow-2xl bg-slate-900 border border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Create New Support Ticket</CardTitle>
                <CardDescription className="text-slate-400">
                  Describe your issue and we'll help you resolve it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300">Title</Label>
                  <Input
                    id="title"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of your issue"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">Description</Label>
                  <Textarea
                    id="description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please provide detailed information about your issue..."
                    rows={4}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-300">Category</Label>
                  <Select value={newTicket.category} onValueChange={(value) => setNewTicket(prev => ({ ...prev, category: value as Ticket['category'] }))}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="technical" className="text-white">Technical Issue</SelectItem>
                      <SelectItem value="billing" className="text-white">Billing</SelectItem>
                      <SelectItem value="feature_request" className="text-white">Feature Request</SelectItem>
                      <SelectItem value="bug_report" className="text-white">Bug Report</SelectItem>
                      <SelectItem value="general" className="text-white">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewTicket(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTicket}
                    disabled={!newTicket.title || !newTicket.description}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    Create Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 