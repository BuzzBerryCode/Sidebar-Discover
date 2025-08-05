import React, { useState, useRef, useEffect } from "react";
import { Icon } from "./icon";
import { CreatorListMode } from "@/types/database";

interface AIToggleProps {
  value: CreatorListMode;
  onChange: (value: CreatorListMode) => void;
  className?: string;
}

export const AIToggle: React.FC<AIToggleProps> = ({ value, onChange, className = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target as Node) &&
        infoButtonRef.current &&
        !infoButtonRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Container - Vertical on mobile, horizontal on larger screens */}
      <div className="flex flex-col sm:flex-row bg-white border border-[#dbe2eb] rounded-[10px] p-0 overflow-hidden dark:bg-gray-800 dark:border-gray-600">
        {/* AI Recommendations Option */}
        <button
          onClick={() => onChange('ai')}
          className={`relative flex items-center justify-center gap-[3px] lg:gap-[4px] xl:gap-[6px] px-[6px] lg:px-[8px] xl:px-[12px] py-[4px] lg:py-[6px] xl:py-[8px] h-[28px] lg:h-[32px] xl:h-[36px] font-medium text-[11px] lg:text-[12px] xl:text-[13px] transition-all duration-200 rounded-[8px] ${
            value === 'ai'
              ? 'bg-gradient-to-r from-[#E7CBFD] to-[#E0DEEA] text-neutral-new900 dark:from-purple-600/40 dark:to-purple-500/30 dark:text-white dark:shadow-lg dark:shadow-purple-500/20'
              : 'bg-white text-neutral-new900 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span className="whitespace-nowrap">AI Recommendations</span>
          <div
            ref={infoButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
            className="flex items-center justify-center w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] xl:w-[20px] xl:h-[20px] flex-shrink-0 cursor-pointer"
          >
            <Icon
              name="InformationIcon.svg"
              className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] xl:w-[18px] xl:h-[18px] text-gray-500 dark:text-gray-400"
              alt="Information"
            />
          </div>
        </button>

        {/* All Creators Option */}
        <button
          onClick={() => onChange('all')}
          className={`flex items-center justify-center px-[6px] lg:px-[8px] xl:px-[12px] py-[4px] lg:py-[6px] xl:py-[8px] h-[28px] lg:h-[32px] xl:h-[36px] font-medium text-[11px] lg:text-[12px] xl:text-[13px] transition-all duration-200 rounded-[8px] ${
            value === 'all'
              ? 'bg-gradient-to-r from-[#E7CBFD] to-[#E0DEEA] text-neutral-new900 dark:from-purple-600/40 dark:to-purple-500/30 dark:text-white dark:shadow-lg dark:shadow-purple-500/20'
              : 'bg-white text-neutral-new900 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span className="whitespace-nowrap">All Creators</span>
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute top-full mt-2 w-[280px] sm:w-[320px] lg:w-[360px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 left-1/2 transform -translate-x-1/2 sm:left-0 sm:transform-none dark:bg-gray-800 dark:border-gray-600"
        >
          <div className="flex items-start gap-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 dark:text-gray-100">AI Recommendations</h3>
              <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">
                This shows creators matched based on your preferences from signup. AI recommendations are personalized to help you find the most relevant creators for your needs.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Want to modify your matching preferences? Head to your profile settings to update your preferences.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};