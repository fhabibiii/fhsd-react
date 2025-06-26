import React, { useState, useEffect } from 'react';
import { GripVertical, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FeaturesListProps {
  features: string[];
  onChange: (features: string[]) => void;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ features, onChange }) => {
  const [localFeatures, setLocalFeatures] = useState<string[]>(features);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalFeatures(features);
  }, [features]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null) return;

    const newFeatures = [...localFeatures];
    const draggedItem = newFeatures[draggedIndex];
    
    newFeatures.splice(draggedIndex, 1);
    newFeatures.splice(dropIndex, 0, draggedItem);
    
    setLocalFeatures(newFeatures);
    onChange(newFeatures);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const addFeature = () => {
    const newFeatures = [...localFeatures, ''];
    setLocalFeatures(newFeatures);
    onChange(newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = localFeatures.filter((_, i) => i !== index);
    setLocalFeatures(newFeatures);
    onChange(newFeatures);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...localFeatures];
    newFeatures[index] = value;
    setLocalFeatures(newFeatures);
    onChange(newFeatures);
  };

  return (
    <div className="space-y-3">
      {localFeatures.map((feature, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 transition-all duration-200 ${
            draggedIndex === index ? 'opacity-50' : 'hover:shadow-md'
          }`}
        >
          <div className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-300" />
          </div>
          <Input
            value={feature}
            onChange={(e) => updateFeature(index, e.target.value)}
            placeholder={`Fitur ${index + 1}`}
            className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeFeature(index)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addFeature}
        className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Tambah Fitur
      </Button>
    </div>
  );
};

export default FeaturesList;
