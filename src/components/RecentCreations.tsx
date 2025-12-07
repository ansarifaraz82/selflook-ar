/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CreationItem } from '../types';
import { motion } from 'framer-motion';

interface RecentCreationsProps {
  items: CreationItem[];
  onView: (item: CreationItem) => void;
}

const RecentCreations: React.FC<RecentCreationsProps> = ({ items, onView }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-800">Recent Creations</h3>
      <div className="grid grid-cols-3 gap-2 max-h-[250px] overflow-y-auto">
        {items.slice(0, 9).map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onView(item)}
            className="relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.type === 'video' ? (
              <>
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  muted
                />
              </>
            ) : (
              <img src={item.url} alt="Creation" className="w-full h-full object-cover" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RecentCreations;
