
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, Eye, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { apiService, Message, MessageDetail } from '../../services/api';

const MessagesManager = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

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

  const fetchMessageDetail = async (id: string) => {
    setIsLoadingDetail(true);
    try {
      const response = await apiService.getMessageById(id);
      if (response.success && response.data) {
        setSelectedMessage(response.data);
        
        // Open mobile modal on small screens
        if (window.innerWidth < 1024) {
          setIsMobileDetailOpen(true);
        }
        
        // Mark as read if it's unread
        if (!response.data.isRead) {
          await apiService.markMessageAsRead(id);
          // Update local messages state
          setMessages(prev => prev.map(msg => 
            msg.id === id ? { ...msg, isRead: true } : msg
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
      setIsLoadingDetail(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'read' && message.isRead) ||
                         (filterStatus === 'unread' && !message.isRead);
    
    return matchesSearch && matchesFilter;
  });

  const handleDeleteClick = (id: string) => {
    setDeletingMessageId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingMessageId) {
      try {
        const response = await apiService.deleteMessage(deletingMessageId);
        if (response.success) {
          setMessages(prev => prev.filter(msg => msg.id !== deletingMessageId));
          if (selectedMessage?.id === deletingMessageId) {
            setSelectedMessage(null);
            setIsMobileDetailOpen(false);
          }
          toast({
            title: "Pesan berhasil dihapus!",
            description: "Pesan telah dihapus dari inbox.",
            variant: "destructive",
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
    }
    setDeleteConfirmOpen(false);
    setDeletingMessageId(null);
  };

  const handleViewMessage = (message: Message) => {
    fetchMessageDetail(message.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  const MessageDetailContent = ({ message }: { message: MessageDetail }) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {message.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {formatDate(message.createdAt)}
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDeleteClick(message.id)}
          className="hover:shadow-md transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Email
            </label>
            <p className="text-gray-900 dark:text-gray-100">{message.email}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Phone
            </label>
            <p className="text-gray-900 dark:text-gray-100">{message.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Jenis Project
            </label>
            <p className="text-gray-900 dark:text-gray-100">{message.type}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Budget
            </label>
            <p className="text-gray-900 dark:text-gray-100">{message.budget}</p>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-4">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            Detail Project
          </label>
          <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
            {message.detail}
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            className="flex-1 hover:shadow-md transition-all duration-200"
            onClick={() => {
              const phoneNumber = message.phone.replace(/\D/g, '');
              const msg = `Halo ${message.name}, terima kasih atas minat Anda untuk project ${message.type}. Tim kami akan segera menghubungi Anda untuk diskusi lebih lanjut.`;
              const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
              window.open(url, '_blank');
            }}
          >
            <Phone className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
          <Button
            variant="outline"
            className="flex-1 hover:shadow-md transition-all duration-200 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
            onClick={() => {
              const subject = `Re: Konsultasi ${message.type}`;
              const body = `Halo ${message.name},\n\nTerima kasih atas minat Anda untuk project ${message.type}. Tim kami akan segera menghubungi Anda untuk diskusi lebih lanjut.\n\nSalam,\nFH Digital Team`;
              const url = `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              window.open(url);
            }}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>
      </div>
    </div>
  );

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
        <div>
          <h2 className="text-2xl font-bold text-foreground">Messages Management</h2>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 && (
              <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs font-medium">
                {unreadCount} pesan belum dibaca
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan nama atau jenis project..."
            className="pl-10 bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
            className={`hover:shadow-md transition-all duration-200 ${
              filterStatus !== 'all' ? 'border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600' : ''
            }`}
          >
            Semua
          </Button>
          <Button
            variant={filterStatus === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('unread')}
            size="sm"
            className={`hover:shadow-md transition-all duration-200 ${
              filterStatus !== 'unread' ? 'border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600' : ''
            }`}
          >
            Belum Dibaca
          </Button>
          <Button
            variant={filterStatus === 'read' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('read')}
            size="sm"
            className={`hover:shadow-md transition-all duration-200 ${
              filterStatus !== 'read' ? 'border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600' : ''
            }`}
          >
            Sudah Dibaca
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className={`${filteredMessages.length > 6 ? 'max-h-[600px] overflow-y-auto scrollbar-hide' : ''} space-y-3 pr-2`}>
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm || filterStatus !== 'all' ? 'Tidak ada pesan yang sesuai filter.' : 'Belum ada pesan masuk.'}
              </div>
            ) : (
              filteredMessages.map((message, index) => (
                <div
                  key={message.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors duration-200 ${
                    !message.isRead
                      ? 'border-primary/30 bg-primary/5 hover:bg-primary/10'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600/50'
                  } ${
                    selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleViewMessage(message)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm truncate ${!message.isRead ? 'text-primary' : 'text-gray-900 dark:text-gray-100'}`}>
                        {message.name}
                      </h3>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 flex-shrink-0 ml-2">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{message.type}</span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-gray-300 px-2 py-1 rounded flex-shrink-0 ml-2">
                        {message.budget}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail - Desktop */}
        <div className="lg:col-span-2 hidden lg:block">
          {isLoadingDetail ? (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : selectedMessage ? (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-all duration-300">
              <MessageDetailContent message={selectedMessage} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Pilih pesan untuk melihat detail</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Detail Modal */}
      <Dialog open={isMobileDetailOpen} onOpenChange={setIsMobileDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Detail Pesan</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[70vh] scrollbar-hide">
            {selectedMessage && <MessageDetailContent message={selectedMessage} />}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="max-w-md bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">Hapus Pesan</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MessagesManager;
