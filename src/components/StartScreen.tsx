/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StartScreenProps {
  onModelFinalized: (imageUrl: string) => void;
  hasSavedOutfit: boolean;
  onLoadOutfit: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  onModelFinalized,
  hasSavedOutfit,
  onLoadOutfit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onModelFinalized(imageUrl);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoadSampleImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/sample-images/model.svg');
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      onModelFinalized(url);
    } catch (error) {
      console.error('Failed to load sample image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md flex flex-col gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
          SelfLook AR
        </h1>
        <p className="text-lg text-gray-600">
          Virtual Try-On Fashion Studio
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isLoading}
          />
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:shadow-lg transition-shadow disabled:opacity-50">
            {isLoading ? 'Processing...' : 'Upload Your Photo'}
          </div>
        </label>

        <button
          onClick={handleLoadSampleImage}
          disabled={isLoading}
          className="bg-indigo-100 text-indigo-700 py-3 px-6 rounded-lg font-semibold border-2 border-indigo-300 hover:bg-indigo-50 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Try Sample Image'}
        </button>

        {hasSavedOutfit && (
          <button
            onClick={onLoadOutfit}
            className="bg-white text-gray-800 py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Load Saved Outfit
          </button>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Upload a photo of yourself or try the sample image</li>
          <li>Select garments from the wardrobe panel</li>
          <li>Adjust poses from studio controls</li>
          <li>Edit background with custom prompts</li>
          <li>Regenerate variations with the buttons</li>
        </ol>
      </div>
    </motion.div>
  );
};

export default StartScreen;
