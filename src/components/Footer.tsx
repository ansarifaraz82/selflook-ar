/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface FooterProps {
  isOnDressingScreen: boolean;
}

const Footer: React.FC<FooterProps> = ({ isOnDressingScreen }) => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-sm border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-600">
      {isOnDressingScreen ? (
        <p>Enjoy creating your virtual outfits!</p>
      ) : (
        <p>SelfLook AR - Virtual Try-On Fashion Studio © 2024</p>
      )}
    </footer>
  );
};

export default Footer;
