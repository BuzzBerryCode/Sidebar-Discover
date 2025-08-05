'use client';

import React, { useEffect, useState } from 'react';

export default function DebugPage() {
  const [cssVariables, setCssVariables] = useState<any>({});

  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const variables = {
      // Card variables
      cardBgUnselected: computedStyle.getPropertyValue('--card-bg-unselected'),
      cardBgSelected: computedStyle.getPropertyValue('--card-bg-selected'),
      cardBorderUnselected: computedStyle.getPropertyValue('--card-border-unselected'),
      cardBorderSelected: computedStyle.getPropertyValue('--card-border-selected'),
      cardVariable: computedStyle.getPropertyValue('--card'),
      
      // Toggle variables
      bgToggleActive: computedStyle.getPropertyValue('--bg-toggle-active'),
      textHeading: computedStyle.getPropertyValue('--text-heading'),
      textMuted: computedStyle.getPropertyValue('--text-muted'),
      
      // Badge variables
      badgePrimaryBg: computedStyle.getPropertyValue('--badge-primary-bg'),
      badgeSecondaryBg: computedStyle.getPropertyValue('--badge-secondary-bg'),
      badgePrimaryBorder: computedStyle.getPropertyValue('--badge-primary-border'),
      badgeSecondaryBorder: computedStyle.getPropertyValue('--badge-secondary-border'),
      badgeText: computedStyle.getPropertyValue('--badge-text'),
      
      // Background variables
      backgroundVariable: computedStyle.getPropertyValue('--background'),
      pageBg: computedStyle.getPropertyValue('--page-bg'),
      sectionBg: computedStyle.getPropertyValue('--section-bg'),
      
      // Text variables
      textPrimary: computedStyle.getPropertyValue('--text-primary'),
      textSecondary: computedStyle.getPropertyValue('--text-secondary'),
      
      // Dark mode
      isDarkMode: root.classList.contains('dark'),
      htmlClasses: root.className
    };
    
    setCssVariables(variables);
  }, []);

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">CSS Variables Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Card Variables</h2>
          <div className="space-y-2 text-sm">
            <div><strong>--card-bg-unselected:</strong> <span className="text-green-400">{cssVariables.cardBgUnselected || 'undefined'}</span></div>
            <div><strong>--card-bg-selected:</strong> <span className="text-green-400">{cssVariables.cardBgSelected || 'undefined'}</span></div>
            <div><strong>--card-border-unselected:</strong> <span className="text-green-400">{cssVariables.cardBorderUnselected || 'undefined'}</span></div>
            <div><strong>--card-border-selected:</strong> <span className="text-green-400">{cssVariables.cardBorderSelected || 'undefined'}</span></div>
            <div><strong>--card:</strong> <span className="text-green-400">{cssVariables.cardVariable || 'undefined'}</span></div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Toggle Variables</h2>
          <div className="space-y-2 text-sm">
            <div><strong>--bg-toggle-active:</strong> <span className="text-green-400">{cssVariables.bgToggleActive || 'undefined'}</span></div>
            <div><strong>--text-heading:</strong> <span className="text-green-400">{cssVariables.textHeading || 'undefined'}</span></div>
            <div><strong>--text-muted:</strong> <span className="text-green-400">{cssVariables.textMuted || 'undefined'}</span></div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Badge Variables</h2>
          <div className="space-y-2 text-sm">
            <div><strong>--badge-primary-bg:</strong> <span className="text-green-400">{cssVariables.badgePrimaryBg || 'undefined'}</span></div>
            <div><strong>--badge-secondary-bg:</strong> <span className="text-green-400">{cssVariables.badgeSecondaryBg || 'undefined'}</span></div>
            <div><strong>--badge-primary-border:</strong> <span className="text-green-400">{cssVariables.badgePrimaryBorder || 'undefined'}</span></div>
            <div><strong>--badge-secondary-border:</strong> <span className="text-green-400">{cssVariables.badgeSecondaryBorder || 'undefined'}</span></div>
            <div><strong>--badge-text:</strong> <span className="text-green-400">{cssVariables.badgeText || 'undefined'}</span></div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Background Variables</h2>
          <div className="space-y-2 text-sm">
            <div><strong>--background:</strong> <span className="text-green-400">{cssVariables.backgroundVariable || 'undefined'}</span></div>
            <div><strong>--page-bg:</strong> <span className="text-green-400">{cssVariables.pageBg || 'undefined'}</span></div>
            <div><strong>--section-bg:</strong> <span className="text-green-400">{cssVariables.sectionBg || 'undefined'}</span></div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Text Variables</h2>
          <div className="space-y-2 text-sm">
            <div><strong>--text-primary:</strong> <span className="text-green-400">{cssVariables.textPrimary || 'undefined'}</span></div>
            <div><strong>--text-secondary:</strong> <span className="text-green-400">{cssVariables.textSecondary || 'undefined'}</span></div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Dark Mode Status</h2>
          <div className="space-y-2 text-sm">
            <div><strong>Is Dark Mode:</strong> <span className="text-green-400">{cssVariables.isDarkMode ? 'Yes' : 'No'}</span></div>
            <div><strong>HTML Classes:</strong> <span className="text-green-400">{cssVariables.htmlClasses || 'none'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
} 