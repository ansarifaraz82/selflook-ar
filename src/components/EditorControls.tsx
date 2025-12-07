/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EditorControlsProps {
  onSelectPose: (poseIndex: number) => void;
  poseInstructions: string[];
  currentPoseIndex: number;
  onBackgroundChange: (prompt: string) => void;
  onImageEdit: (prompt: string) => void;
  isLoading: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({
  onSelectPose,
  poseInstructions,
  currentPoseIndex,
  onBackgroundChange,
  onImageEdit,
  isLoading,
}) => {
  const [bgPrompt, setBgPrompt] = useState('');
  const [editPrompt, setEditPrompt] = useState('');

  return (
    <div className="flex flex-col gap-6">
      {/* Pose Selection */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Poses</h4>
        <div className="grid grid-cols-2 gap-2">
          {poseInstructions.map((pose, index) => (
            <motion.button
              key={index}
              onClick={() => onSelectPose(index)}
              disabled={isLoading}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                currentPoseIndex === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } disabled:opacity-50`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {pose}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Background Change */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Background</h4>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={bgPrompt}
            onChange={(e) => setBgPrompt(e.target.value)}
            placeholder="e.g., beach sunset"
            disabled={isLoading}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
          />
          <button
            onClick={() => bgPrompt && onBackgroundChange(bgPrompt)}
            disabled={isLoading || !bgPrompt}
            className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            Change Background
          </button>
        </div>
      </div>

      {/* Image Edit */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Edit Image</h4>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="e.g., add sunglasses"
            disabled={isLoading}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
          />
          <button
            onClick={() => editPrompt && onImageEdit(editPrompt)}
            disabled={isLoading || !editPrompt}
            className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            Apply Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorControls;
