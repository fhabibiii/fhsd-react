
import React, { useState, useEffect } from 'react';
import { Mail, User, Phone, Calendar, DollarSign, MessageSquare, Trash2, Search, Filter, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { apiService, Message, MessageDetail } from '../../services/api';

const MessagesManager = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllMessages();
      if (response.success && response.data) {
        setMessages(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch messages",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMessage = async (messageId: string) => {
    setIsDetailLoading(true);
    try {
      const response = await apiService.getMessageById(messageId);
      if (response.success && response.data) {
        setSelectedMessage(response.data);
        
        // Mark as read if not already read
        if (!response.data.isRead) {
          await apiService.markMessageAsRead(messageId);
          // Update local state
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, isRead: true } : msg
          ));
        }
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch message details",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch message details",
        variant: "destructive",
      });
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const response = await apiService.deleteMessage(messageId);
      if (response.success) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        toast({
          title: "Berhasil!",
          description: "Pesan berhasil dihapus.",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to delete message",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         message.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'read' && message.isRead) ||
                         (filterType === 'unread' && !message.isRead);
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Messages</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Messages Yet</h3>
            <p className="text-muted-foreground">
              When visitors send messages through your website, they will appear here.
            </p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Messages Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-card rounded-xl p-6 border transition-all duration-300 ${
                    message.isRead 
                      ? 'border-border' 
                      : 'border-primary/30 bg-primary/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        message.isRead 
                          ? 'bg-muted' 
                          : 'bg-primary/10'
                      }`}>
                        <User className={`w-5 h-5 ${
                          message.isRead 
                            ? 'text-muted-foreground' 
                            : 'text-primary'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          {message.name}
                          {!message.isRead && (
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMessage(message.id)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Message</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this message? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMessage(message.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground truncate">
                        {message.email || 'No email'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        {message.phone || 'No phone'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">
                        {message.budget}
                      </span>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Project: {message.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Message from {selectedMessage?.name}
            </DialogTitle>
          </DialogHeader>
          
          {isDetailLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : selectedMessage && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Project Type</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Budget</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.budget}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Project Details
                </h4>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.detail}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Received on {formatDate(selectedMessage.createdAt)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesManager;
