
import React, { useState } from 'react';
import { Mail, Phone, Calendar, Trash2, Eye, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

const MessagesManager = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+62 812-3456-7890',
      projectType: 'Basic Website',
      budget: 'Di bawah Rp 5 juta',
      message: 'Saya ingin membuat website untuk toko online saya. Apakah bisa dibantu untuk diskusi lebih lanjut?',
      createdAt: new Date('2024-01-15T10:30:00'),
      isRead: false
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '+62 813-9876-5432',
      projectType: 'Web App Menengah',
      budget: 'Rp 15 - 30 juta',
      message: 'Perusahaan kami membutuhkan sistem manajemen inventory. Mohon info detail paket dan timeline.',
      createdAt: new Date('2024-01-14T14:20:00'),
      isRead: true
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'read' && message.isRead) ||
                         (filterStatus === 'unread' && !message.isRead);
    
    return matchesSearch && matchesFilter;
  });

  const handleMarkAsRead = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    toast({
      title: "Message deleted!",
      description: "Message has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages Management</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {unreadCount > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                {unreadCount} pesan belum dibaca
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan nama, email, atau jenis project..."
            className="pl-10 hover:shadow-md transition-all duration-200"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
            className="hover:shadow-md transition-all duration-200"
          >
            Semua
          </Button>
          <Button
            variant={filterStatus === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('unread')}
            size="sm"
            className="hover:shadow-md transition-all duration-200"
          >
            Belum Dibaca
          </Button>
          <Button
            variant={filterStatus === 'read' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('read')}
            size="sm"
            className="hover:shadow-md transition-all duration-200"
          >
            Sudah Dibaca
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Messages List - Smaller on larger screens */}
        <div className="lg:col-span-1 space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {searchTerm || filterStatus !== 'all' ? 'Tidak ada pesan yang sesuai filter.' : 'Belum ada pesan masuk.'}
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`border rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-lg animate-fade-in ${
                  !message.isRead
                    ? 'border-primary/30 bg-primary/5 hover:bg-primary/10'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-sm ${!message.isRead ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                      {message.name}
                    </h3>
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span>{message.projectType}</span>
                    <span>{message.budget}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail - Larger on larger screens */}
        <div className="lg:col-span-3">
          {selectedMessage ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedMessage.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {formatDateTime(selectedMessage.createdAt)}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="hover:shadow-md transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Message</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this message from {selectedMessage.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteMessage(selectedMessage.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedMessage.email}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedMessage.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Jenis Project
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedMessage.projectType}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-md transition-all duration-200">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Budget
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedMessage.budget}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                    Detail Project
                  </label>
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      const phoneNumber = selectedMessage.phone.replace(/\D/g, '');
                      const message = `Halo ${selectedMessage.name}, terima kasih atas minat Anda untuk project ${selectedMessage.projectType}. Tim kami akan segera menghubungi Anda untuk diskusi lebih lanjut.`;
                      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                      window.open(url, '_blank');
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      const subject = `Re: Konsultasi ${selectedMessage.projectType}`;
                      const body = `Halo ${selectedMessage.name},\n\nTerima kasih atas minat Anda untuk project ${selectedMessage.projectType}. Tim kami akan segera menghubungi Anda untuk diskusi lebih lanjut.\n\nSalam,\nFH Digital Team`;
                      const url = `mailto:${selectedMessage.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      window.open(url);
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Pilih pesan untuk melihat detail</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;
