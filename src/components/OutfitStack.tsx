/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OutfitLayer } from '../types';
import { motion } from 'framer-motion';

interface OutfitStackProps {
  outfitHistory: OutfitLayer[];
  onRemoveLastGarment: () => void;
}

const OutfitStack: React.FC<OutfitStackProps> = ({
  outfitHistory,
  onRemoveLastGarment,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-800">Outfit Layers</h3>
      <div className="flex flex-col gap-2">
        {outfitHistory.map((layer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-700">
              {layer.garment ? layer.garment.name : 'Base Model'}
            </span>
            {layer.garment && index === outfitHistory.length - 1 && (
              <button
                onClick={onRemoveLastGarment}
                className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
              >
                Remove
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OutfitStack;
