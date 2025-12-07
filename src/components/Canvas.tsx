/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Spinner from './Spinner';

interface CanvasProps {
  displayImageUrl?: string;
  onStartOver: () => void;
  isLoading: boolean;
  loadingMessage: string;
  onUndo: () => void;
  onRedo: () => void;
  onRegenerate: () => void;
  canUndo: boolean;
  canRedo: boolean;
  canRegenerate: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  displayImageUrl,
  onStartOver,
  isLoading,
  loadingMessage,
  onUndo,
  onRedo,
  onRegenerate,
  canUndo,
  canRedo,
  canRegenerate,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
        {displayImageUrl ? (
          <img
            src={displayImageUrl}
            alt="Canvas"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-400">
            <p>No image yet</p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
            <Spinner />
            {loadingMessage && (
              <p className="text-white text-center font-medium">{loadingMessage}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={onUndo}
          disabled={!canUndo || isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-colors"
        >
          Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo || isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-colors"
        >
          Redo
        </button>
        <button
          onClick={onRegenerate}
          disabled={!canRegenerate || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          Regenerate
        </button>
        <button
          onClick={onStartOver}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 hover:bg-red-600 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Canvas;
