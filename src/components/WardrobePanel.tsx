/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WardrobeItem } from '../types';
import { motion } from 'framer-motion';

interface WardrobePanelProps {
  onGarmentSelect: (file: File, garmentInfo: WardrobeItem) => void;
  activeGarmentIds: string[];
  isLoading: boolean;
  wardrobe: WardrobeItem[];
}

const WardrobePanel: React.FC<WardrobePanelProps> = ({
  onGarmentSelect,
  activeGarmentIds,
  isLoading,
  wardrobe,
}) => {
  const [customGarments, setCustomGarments] = useState<WardrobeItem[]>([]);

  const handleAddGarment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const id = `custom-${Date.now()}`;
      const reader = new FileReader();
      reader.onload = (e) => {
        const garmentInfo: WardrobeItem = {
          id,
          name: file.name,
          url: e.target?.result as string,
        };
        setCustomGarments((prev) => [...prev, garmentInfo]);
        onGarmentSelect(file, garmentInfo);
      };
      reader.readAsDataURL(file);
    }
  };

  const allGarments = [...wardrobe, ...customGarments];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800">Wardrobe</h3>

      <label className="relative cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleAddGarment}
          className="hidden"
          disabled={isLoading}
        />
        <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold text-center hover:shadow-md transition-shadow disabled:opacity-50 text-sm">
          Add Garment
        </div>
      </label>

      <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
        {allGarments.map((garment) => {
          const isActive = activeGarmentIds.includes(garment.id);
          return (
            <motion.button
              key={garment.id}
              onClick={() => {
                // For custom garments, we need to create a File object
                const file = new File([garment.url], garment.name, {
                  type: 'image/jpeg',
                });
                onGarmentSelect(file, garment);
              }}
              disabled={isLoading}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                isActive
                  ? 'border-green-500 ring-2 ring-green-300'
                  : 'border-gray-300 hover:border-gray-400'
              } disabled:opacity-50`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={garment.url}
                alt={garment.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-end justify-center p-2">
                <p className="text-white text-xs font-semibold text-center line-clamp-1">
                  {garment.name}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default WardrobePanel;
