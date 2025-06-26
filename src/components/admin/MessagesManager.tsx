
import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Clock, Search, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiService, Message } from '../../services/api';

const MessagesManager = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

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

  const markAsRead = async (messageId: string) => {
    try {
      const response = await apiService.markMessageAsRead(messageId);
      if (response.success) {
        await fetchMessages();
        toast({
          title: "Berhasil!",
          description: "Pesan ditandai sebagai telah dibaca.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await apiService.deleteMessage(messageId);
      if (response.success) {
        await fetchMessages();
        toast({
          title: "Berhasil!",
          description: "Pesan berhasil dihapus.",
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

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(msg => !msg.isRead).length;

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
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages Management</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white dark:text-white px-2 py-1">
              {unreadCount} pesan belum dibaca
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Cari pesan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMessages.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada pesan yang masuk.</p>
            </div>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-in ${
                !message.isRead 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedMessage(message)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {message.subject}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {message.name} • {message.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    {!message.isRead && (
                      <Badge className="bg-red-500 text-white text-xs">Baru</Badge>
                    )}
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(message.id);
                        }}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        {message.isRead ? (
                          <EyeOff className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        className="hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                  {message.message}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(message.createdAt).toLocaleString('id-ID')}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedMessage.subject}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Dari: {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <Button
                onClick={() => {
                  const mailtoLink = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                  window.open(mailtoLink, '_blank');
                }}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Balas via Email
              </Button>
              {!selectedMessage.isRead && (
                <Button
                  variant="outline"
                  onClick={() => {
                    markAsRead(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Tandai Dibaca
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;
