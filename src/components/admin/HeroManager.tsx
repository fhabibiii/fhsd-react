
import React, { useState } from 'react';
import { Save, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const HeroManager = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [heroData, setHeroData] = useState({
    title: 'Wujudkan Website Impian Bisnis Anda!',
    description: 'Dari website sederhana hingga aplikasi web kompleks - Kami siap mengubah ide bisnis Anda menjadi solusi digital yang menguntungkan!'
  });

  const handleSave = () => {
    // Here you would normally save to a database or context
    toast({
      title: "Hero section berhasil diperbarui!",
      description: "Perubahan telah disimpan dan akan terlihat di halaman utama.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  return (
    <div className="p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Section Management</h2>
          <div className="flex gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Hero
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Batal
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Title Hero *
              </label>
              <Input
                type="text"
                value={heroData.title}
                onChange={(e) => setHeroData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Masukkan judul hero section"
                disabled={!isEditing}
                className="h-12 rounded-xl border-2 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Deskripsi Hero *
              </label>
              <Textarea
                value={heroData.description}
                onChange={(e) => setHeroData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Masukkan deskripsi hero section"
                rows={6}
                disabled={!isEditing}
                className="rounded-xl border-2 focus:border-primary resize-none"
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pl-8">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {heroData.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {heroData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Tips untuk Hero Section yang Efektif:</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Gunakan kata-kata yang menarik perhatian dan mudah dipahami</li>
            <li>• Fokus pada value proposition yang jelas untuk target audience</li>
            <li>• Jaga agar title tidak terlalu panjang (maksimal 60 karakter)</li>
            <li>• Deskripsi sebaiknya menjelaskan manfaat yang didapat klien</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroManager;
