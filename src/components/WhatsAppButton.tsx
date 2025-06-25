
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { apiService } from '../services/api';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  
  const defaultMessage = "Halo! Saya tertarik dengan layanan FH Digital Solutions. Bisakah kita diskusi lebih lanjut?";
  
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await apiService.getContactInfo();
      if (response.success && response.data) {
        setWhatsappUrl(response.data.whatsApp);
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
      // Fallback to default WhatsApp number
      setWhatsappUrl('https://wa.me/6281225510099');
    }
  };

  const handleWhatsAppClick = () => {
    if (whatsappUrl) {
      const url = whatsappUrl.includes('?') 
        ? `${whatsappUrl}&text=${encodeURIComponent(defaultMessage)}`
        : `${whatsappUrl}?text=${encodeURIComponent(defaultMessage)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className={`absolute right-full mr-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}>
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
            Chat WhatsApp Sekarang!
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
