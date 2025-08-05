'use client'

import React, { useState } from 'react'
import { DashboardSidebar } from './DashboardSidebar'
import { AISearchPage } from './pages/AISearchPage'
import { DiscoverPage } from './pages/DiscoverPage'
import { MyListsPage } from './pages/MyListsPage'
import { FeedbackModal } from './modals/FeedbackModal'
import { SettingsModal } from './modals/SettingsModal'

export function DashboardLayout() {
  const [activeItem, setActiveItem] = useState('AI Search')
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleNavigate = (item: string) => {
    if (item === 'Settings') {
      setShowSettingsModal(true)
    } else {
      setActiveItem(item)
    }
  }

  const handleFeedbackClick = () => {
    setShowFeedbackModal(true)
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const renderActivePage = () => {
    switch (activeItem) {
      case 'AI Search':
        return <AISearchPage />
      case 'Discover':
        return <DiscoverPage />
      case 'My Lists':
        return <MyListsPage />
      default:
        return <AISearchPage />
    }
  }

  return (
    <main className="flex h-screen overflow-hidden relative">
      <DashboardSidebar 
        activeItem={activeItem}
        onNavigate={handleNavigate}
        onFeedbackClick={handleFeedbackClick}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <div className="flex-1 overflow-y-auto md:ml-0 transition-all duration-300 pt-[73px] md:pt-0">
        {renderActivePage()}
      </div>
      <FeedbackModal 
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
      <SettingsModal 
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </main>
  )
}