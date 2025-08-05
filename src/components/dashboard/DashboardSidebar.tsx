"use client"

import {
  ChevronRightIcon,
  Menu,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface DashboardSidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  onFeedbackClick: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// Navigation menu items data
const getNavItems = (activeItem: string) => [
  {
    iconSelected: "/AISearchIconSelected.svg",
    iconUnselected: "/AISearchIconUnselected.svg",
    label: "AI Search",
    active: activeItem === "AI Search",
    id: "AI Search",
  },
  {
    iconSelected: "/DiscoverIconSelected.svg",
    iconUnselected: "/DiscoverIconUnselected.svg",
    label: "Discover",
    active: activeItem === "Discover",
    id: "Discover",
  },
  {
    iconSelected: "/MyListIconSelected.svg",
    iconUnselected: "/MyListIconUnselected.svg",
    label: "My Lists",
    active: activeItem === "My Lists",
    id: "My Lists",
  },
  {
    iconSelected: null,
    iconUnselected: "/OutreachIconUnusable.svg",
    label: "Outreach",
    active: activeItem === "Outreach",
    id: "Outreach",
    comingSoon: true,
    disabled: true,
  },
];

// Footer menu items data
const getFooterItems = (activeItem: string) => [
  {
    iconSelected: "/FeedbackIconSelected.svg",
    iconUnselected: "/FeedbackIconUnselected.svg",
    label: "Feedback",
    active: activeItem === "Feedback",
    id: "Feedback",
  },
  {
    iconSelected: "/SettingsIconSelected.svg",
    iconUnselected: "/SettingsIconUnselected.svg",
    label: "Settings",
    active: activeItem === "Settings",
    id: "Settings",
  },
];

export function DashboardSidebar({ activeItem, onNavigate, onFeedbackClick, isCollapsed, onToggleCollapse }: DashboardSidebarProps) {
  const navItems = getNavItems(activeItem);
  const footerItems = getFooterItems(activeItem);
  
  // State to track if we're on mobile (client-side only)
  const [isClientMobile, setIsClientMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Effect to handle client-side mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsClientMobile(window.innerWidth < 768);
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Auto-collapse on mobile screens
  const shouldCollapse = isCollapsed || isClientMobile;

  const handleItemClick = (item: any) => {
    if (item.disabled) return;
    if (item.id === "Feedback") {
      onFeedbackClick();
    } else {
      onNavigate(item.id);
    }
    // Close mobile menu after navigation
    if (isClientMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile top navigation bar
  if (isClientMobile) {
    return (
      <>
        {/* Mobile Top Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0f1419] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <Image
            className="w-[120px] h-[28px] object-contain"
            alt="Buzzberry Logo"
            src="/BuzzberryLogo.svg"
            width={120}
            height={28}
            priority
            loading="eager"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="w-10 h-10 p-2 text-white hover:bg-[#1a1f2e] active:bg-[#1a1f2e]"
          >
            {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
            <div 
              className="fixed top-[61px] left-0 right-0 bg-[#0f1419] border-b border-gray-800 max-h-[calc(100vh-61px)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 space-y-4">
                {/* Navigation menu */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <Button
                      key={index}
                      variant={item.active ? "default" : "ghost"}
                      disabled={item.disabled}
                      onClick={() => handleItemClick(item)}
                      className={`w-full h-12 justify-start px-4 ${
                        item.active ? "bg-[#aec6ff] hover:bg-[#aec6ff]" : "hover:bg-[#1a1f2e]"
                      } ${item.disabled ? "cursor-not-allowed opacity-60" : ""} rounded-[10px] flex items-center gap-3 transition-all duration-200`}
                    >
                      <Image 
                        src={item.active && item.iconSelected ? item.iconSelected : item.iconUnselected} 
                        alt={item.label} 
                        width={item.label === "AI Search" ? 23 : 24} 
                        height={item.label === "AI Search" ? 23 : 24} 
                      />
                      <span
                        className={`font-medium text-base ${
                          item.active ? "text-[#0e121b]" : "text-white"
                        } ${item.comingSoon ? "text-[#606979]" : ""}`}
                      >
                        {item.label}
                      </span>
                      {item.comingSoon && (
                        <Badge
                          variant="outline"
                          className="ml-auto bg-[#1a1f2e] rounded-2xl"
                        >
                          <span className="text-gray-400 text-sm">Coming Soon</span>
                        </Badge>
                      )}
                    </Button>
                  ))}
                </nav>

                <Separator className="bg-gray-800" />

                {/* Footer menu */}
                <div className="space-y-2">
                  {footerItems.map((item, index) => (
                    <Button
                      key={index}
                      variant={item.active ? "default" : "ghost"}
                      onClick={() => handleItemClick(item)}
                      className={`w-full h-12 justify-start px-4 ${
                        item.active ? "bg-[#aec6ff] hover:bg-[#aec6ff]" : "hover:bg-[#1a1f2e]"
                      } rounded-[10px] flex items-center gap-3 transition-all duration-200`}
                    >
                      <Image 
                        src={item.active ? item.iconSelected : item.iconUnselected} 
                        alt={item.label} 
                        width={item.label === "Feedback" ? 23 : 24} 
                        height={item.label === "Feedback" ? 23 : 24} 
                      />
                      <span className={`font-medium text-base ${
                        item.active ? "text-[#0e121b]" : "text-white"
                      }`}>
                        {item.label}
                      </span>
                    </Button>
                  ))}
                </div>

                <Separator className="bg-gray-800" />

                {/* User profile section */}
                <div className="p-4 bg-[#1a2232] rounded-[15px]">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-[35px] h-[35px] bg-[#d9d9d9] rounded-[999px]" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-50 text-[15px]">
                        Emillia Caitin
                      </div>
                      <div className="font-medium text-white text-[13px] tracking-[-0.08px] leading-5">
                        hey@agency.com
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-0.5 rounded-md hover:bg-[#2a3142] active:bg-[#323a4d] transition-colors duration-200"
                    >
                      <Image src="/ExpandButton.svg" alt="Profile Settings" width={20} height={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar (existing code)
  return (
    <aside className="flex h-screen items-stretch gap-[15px] pl-0 pr-[15px] py-0 relative bg-black overflow-hidden md:relative fixed md:translate-x-0 z-50">
      <div className={`flex flex-col items-start justify-between pt-5 pb-[15px] relative h-full bg-[#0f1419] rounded-[0px_15px_15px_0px] transition-all duration-300 ${
        shouldCollapse ? 'w-[70px] px-[15px]' : 'w-[262px] px-[15px] md:w-[262px]'
      }`}>
        <div className={`flex flex-col items-start gap-5 relative flex-[0_0_auto] ${
          shouldCollapse ? 'w-[40px] items-center' : 'w-[232px]'
        }`}>
          {/* Header with logo and collapse button */}
          <div className={`flex items-center pl-1.5 pr-0 py-0 relative flex-[0_0_auto] ${
            shouldCollapse ? 'w-[40px] justify-center pl-0 pr-0' : 'justify-between self-stretch w-full'
          }`}>
            {!shouldCollapse && (
              <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                <Image
                  className="relative w-[140px] h-[32px] object-contain"
                  alt="Buzzberry Logo"
                  src="/BuzzberryLogo.svg"
                  width={140}
                  height={32}
                  priority
                  loading="eager"
                />
              </div>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={onToggleCollapse}
              className="w-10 h-10 p-2 bg-[#1a1f2e] rounded-[10px] border border-solid border-gray-700 hover:bg-[#252b3a] hover:border-gray-600 active:bg-[#2a3142] transition-colors duration-200"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${shouldCollapse ? 'rotate-180' : ''}`}
              >
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" fill="#F9FAFB"/>
              </svg>
            </Button>
          </div>

          <Separator className={`bg-gray-800 ${shouldCollapse ? 'w-[40px]' : 'w-full'}`} />

          {/* Navigation menu */}
          <nav className={`flex flex-col items-start gap-[5px] relative flex-[0_0_auto] ${
            shouldCollapse ? 'w-[40px] items-center' : 'self-stretch w-full'
          }`}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                className={`h-10 py-2 justify-center ${
                  item.active ? "bg-[#aec6ff] hover:bg-[#aec6ff]" : "hover:bg-[#1a1f2e]"
                } ${item.disabled ? "cursor-not-allowed opacity-60" : ""} rounded-[10px] flex items-center transition-all duration-200 ${
                  shouldCollapse ? 'w-10 px-2' : 'px-1.5 justify-start self-stretch w-full gap-2.5'
                }`}
              >
                <Image 
                  src={item.active && item.iconSelected ? item.iconSelected : item.iconUnselected} 
                  alt={item.label} 
                  width={item.label === "AI Search" ? 23 : 24} 
                  height={item.label === "AI Search" ? 23 : 24} 
                />
                {!shouldCollapse && <span
                  className={`font-medium text-base ${
                    item.active ? "text-[#0e121b]" : "text-white"
                  } ${item.comingSoon ? "text-[#606979]" : ""}`}
                >
                  {item.label}
                </span>}
                {item.comingSoon && (
                  !shouldCollapse && <Badge
                    variant="outline"
                    className="ml-auto bg-[#1a1f2e] rounded-2xl"
                  >
                    <span className="text-gray-400 text-sm">Coming Soon</span>
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>

        <div className={`flex flex-col items-center justify-center gap-2 relative flex-[0_0_auto] ${
          shouldCollapse ? 'w-[40px]' : 'w-[234px]'
        }`}>
          {/* Footer menu */}
          <div className={`flex flex-col items-start gap-[5px] relative flex-[0_0_auto] ${
            shouldCollapse ? 'w-[40px] items-center' : 'self-stretch w-full'
          }`}>
            {footerItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                onClick={() => handleItemClick(item)}
                className={`h-10 py-2 justify-center ${
                  item.active ? "bg-[#aec6ff] hover:bg-[#aec6ff]" : "hover:bg-[#1a1f2e]"
                } rounded-[10px] flex items-center transition-all duration-200 ${
                  shouldCollapse ? 'w-10 px-2' : 'px-1.5 justify-start self-stretch w-full gap-2.5'
                }`}
              >
                <Image 
                  src={item.active ? item.iconSelected : item.iconUnselected} 
                  alt={item.label} 
                  width={item.label === "Feedback" ? 23 : 24} 
                  height={item.label === "Feedback" ? 23 : 24} 
                />
                {!shouldCollapse && <span className={`font-medium text-base ${
                  item.active ? "text-[#0e121b]" : "text-white"
                }`}>
                  {item.label}
                </span>}
              </Button>
            ))}
          </div>

          {/* User profile section */}
          <div className={`flex h-[60px] items-center relative ${
            shouldCollapse ? 'w-[40px] justify-center' : 'w-[232px] justify-around gap-[90px]'
          }`}>
            {shouldCollapse ? (
              <Avatar className="w-[35px] h-[35px] bg-[#d9d9d9] rounded-[999px]" />
            ) : (
              <div className="flex flex-col items-start gap-2.5 p-2.5 relative flex-1 grow bg-[#1a2232] rounded-[15px] overflow-hidden">
                <div className="flex h-10 items-center gap-2.5 relative self-stretch w-full">
                  <Avatar className="w-[35px] h-[35px] bg-[#d9d9d9] rounded-[999px]" />
                  <div className="flex flex-col h-10 items-start justify-center relative flex-1 grow">
                    <div className="relative w-fit font-medium text-gray-50 text-[15px]">
                      Emillia Caitin
                    </div>
                    <div className="relative w-fit -mt-px font-medium text-white text-[13px] tracking-[-0.08px] leading-5">
                      hey@agency.com
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0.5 rounded-md hover:bg-[#2a3142] active:bg-[#323a4d] transition-colors duration-200"
                  >
                    <Image src="/ExpandButton.svg" alt="Profile Settings" width={20} height={20} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}