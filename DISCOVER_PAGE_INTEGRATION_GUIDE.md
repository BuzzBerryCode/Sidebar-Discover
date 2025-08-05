# Discover Page Integration Guide

## Overview
This document provides a comprehensive guide for integrating the Discover page from `Main-Discover-Page-main` into the main Buzzberry dashboard. This integration involves replacing the mock Discover page with the actual functional Discover page while maintaining proper styling and functionality.

## Prerequisites

### Required Dependencies
Ensure these dependencies are installed in the main dashboard's `package.json`:
```json
{
  "@google/generative-ai": "^0.2.1",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-toggle": "^1.0.3",
  "@radix-ui/react-toggle-group": "^1.0.4",
  "@supabase/supabase-js": "^2.38.4"
}
```

### Environment Variables
Create/update `.env` file with:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://unovwhgnwenxbyvpevcz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVub3Z3aGdud2VueGJ5dnBldmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzY1NDAsImV4cCI6MjA2NzcxMjU0MH0.UgHG08bBKdJDo0mJNX61z-ihd3WPScaxNX_zmNDIHSs

# Gemini API Configuration
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBYRd9lJTe1mRgJLhpbp39butQbXDgBBMw

# Optional: If you need server-side environment variables (for edge functions)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Step 1: File Structure Setup

### Create Required Directories
```bash
mkdir -p src/components/dashboard/discover
mkdir -p src/components/sections/CreatorFilterSection
mkdir -p src/components/sections/CreatorListSection
mkdir -p src/components/sections/MetricsTitleSection
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/utils
```

### Copy Core Files
```bash
# Copy main Discover component
cp "Main-Discover-Page-main/src/components/dashboard/discover.tsx" "src/components/dashboard/"

# Copy Discover page content
cp "Main-Discover-Page-main/src/components/dashboard/discover/DiscoverPageContent.tsx" "src/components/dashboard/discover/"

# Copy section components
cp -r "Main-Discover-Page-main/src/components/sections/" "src/components/"

# Copy hooks
cp "Main-Discover-Page-main/src/hooks/useCreatorData.ts" "src/hooks/"

# Copy lib files
cp "Main-Discover-Page-main/src/lib/supabase.ts" "src/lib/"

# Copy types
cp "Main-Discover-Page-main/src/types/database.ts" "src/types/"

# Copy utils
cp "Main-Discover-Page-main/src/utils/formatters.ts" "src/utils/"
cp "Main-Discover-Page-main/src/utils/locationParser.ts" "src/utils/"
```

## Step 2: Update Main Discover Page Component

### Replace Mock DiscoverPage.tsx
Update `src/components/dashboard/pages/DiscoverPage.tsx`:

```tsx
import React from 'react';
import { Discover } from '../discover';

export function DiscoverPage() {
  return (
    <div className="min-h-full w-full" style={{ backgroundColor: '#000000' }}>
      <div className="p-[15px] lg:p-[20px] xl:p-[25px]">
        <Discover />
      </div>
    </div>
  );
}
```

## Step 3: CSS Configuration

### Update globals.css
Add the complete color scheme to `src/app/globals.css`:

```css
@import url("https://fonts.googleapis.com/css?family=Inter:600,500,400,700");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .all-\[unset\] {
    all: unset;
  }
}

:root {
  /* Original custom colors */
  --abu-abu: #f8f9fa;
  --agak-putih: #ffffff;
  --basewhite: #ffffff;
  --graysblack: #000000;
  --neutral-100: #f8f9fa;
  --neutral-new100: #f8f9fa;
  --neutral-new900: #111827;
  
  /* Page Background & Layout */
  --page-bg: #000000;
  --section-bg: #0f1419;
  --card-bg: #ffffff;
  --card-bg-dark: #1f2937;
  
  /* Text Colors - Primary */
  --text-heading-main: #f8f9fa;
  --text-primary: #06152b;
  --text-primary-alt: #080d1c;
  --text-secondary: #71737c;
  --text-muted: #999999;
  --text-heading: #111827;
  --text-label: #374151;
  --text-button: #6b7280;
  --text-dark: #06152b;
  --text-medium: #71737c;
  --text-light: #999999;
  
  /* Brand Colors */
  --brand-blue: #557EDD;
  --brand-purple: #6C40E4;
  --brand-blue-hover: #4A6BC8;
  --brand-purple-hover: #5A36C7;
  
  /* Gradient Colors */
  --gradient-red: #FC4C4B;
  --gradient-pink: #CD45BA;
  --gradient-purple: #6E57FF;
  
  /* Border Colors - Light Mode */
  --border-light: #dbe2eb;
  --border-lighter: #f1f4f9;
  --border-divider: #e1e5e9;
  --border-section: #f3f4f6;
  --border-dropdown: #e5e7eb;
  --border-selected: #94c4fc;
  --border-pagination: #2463eb;
  --border-checkbox: #D9E1E7;
  --border-list-selected: #94c4fc;
  --border-gray: #dbe2eb;
  --border-light-gray: #f1f4f9;
  --input-border: #d1d5db;
  --action-border: #E5E7EB;
  
  /* Background Colors - Interactive */
  --bg-card: #F9FAFB;
  --bg-selected: #f1f6fe;
  --bg-hover: #f9fafb;
  --bg-hover-alt: #F0F0F0;
  --bg-input: #f9fafb;
  --bg-toggle-active: #f1f4f9;
  --bg-light: #f1f4f9;
  --bg-white: #ffffff;
  --hover-bg: #f9fafb;
  --selected-bg: #f1f6fe;
  
  /* Profile & Special Backgrounds */
  --bg-profile: #384455;
  --profile-bg: #384455;
  --ai-toggle-start: #E7CBFD;
  --ai-toggle-end: #E0DEEA;
  
  /* Status & Feedback Colors */
  --success-green: #1ad598;
  --error-red: #ea3a3d;
  
  /* Focus & Interactive States */
  --focus-ring: #3b82f6;
  --donut-stroke: #E5E7EB;
  
  /* Component-Specific Colors - Light Mode */
  --filter-button-active-bg: #3b82f6;
  --filter-button-active-border: #1d4ed8;
  --filter-button-inactive-bg: #ffffff;
  --filter-button-inactive-border: #dbe2eb;
  --filter-dropdown-bg: #ffffff;
  --filter-dropdown-border: #e5e7eb;
  
  --card-border-selected: #94c4fc;
  --card-border-unselected: #F1F4F9;
  --card-bg-selected: #f1f6fe;
  --card-bg-unselected: #ffffff;
  --metrics-bg: #F9FAFB;
  --buzz-score-bg: #F1F4F9;
  
  --toggle-active-bg-start: #E7CBFD;
  --toggle-active-bg-end: #E0DEEA;
  --toggle-inactive-bg: #ffffff;
  --toggle-border: #dbe2eb;
  
  --badge-primary-bg: #f0f9ff;
  --badge-primary-border: #dbe2eb;
  --badge-secondary-bg: #f0df4;
  --badge-secondary-border: #bbf7d0;
  --badge-text: #111827;
  
  /* Match Score Colors - Light Mode */
  --match-green: #22c55e;
  --match-green-bg: #dcfce7;
  --match-yellow: #eab308;
  --match-yellow-bg: #fef3c7;
  --match-orange: #f97316;
  --match-orange-bg: #fed7aa;
  --match-red: #ef4444;
  --match-red-bg: #fecaca;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --card: transparent;
    --card-foreground: 222.2 47.4% 11.2%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
    --ring: 215 20.2% 65.1%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
    --border: 216 34% 17%;
    --input: 216 34% 17%;
    --card: 220 13% 18%;
    --card-foreground: 213 31% 91%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --ring: 216 34% 17%;
    --radius: 0.5rem;
    
    /* Dark theme custom colors */
    --abu-abu: #1f2937;
    --agak-putih: #111827;
    --basewhite: #000000;
    --graysblack: #ffffff;
    --neutral-100: #1f2937;
    --neutral-new100: #1f2937;
    --neutral-new600: #9ca3af;
    --neutral-new900: #f9fafb;
    
    /* Page Background & Layout - Dark */
    --page-bg: #000000;
    --section-bg: #0f1419;
    --card-bg: #1f2937;
    --card-bg-dark: #1f2937;
    
    /* Text Colors - Dark Mode */
    --text-heading-main: #f9fafb;
    --text-primary: #f9fafb;
    --text-primary-alt: #f9fafb;
    --text-secondary: #9ca3af;
    --text-muted: #6b7280;
    --text-heading: #f9fafb;
    --text-label: #d1d5db;
    --text-button: #9ca3af;
    --text-dark: #f9fafb;
    --text-medium: #9ca3af;
    --text-light: #6b7280;
    
    /* Brand Colors - Same in dark mode */
    --brand-blue: #557EDD;
    --brand-purple: #6C40E4;
    --brand-blue-hover: #4A6BC8;
    --brand-purple-hover: #5A36C7;
    
    /* Gradient Colors - Same in dark mode */
    --gradient-red: #FC4C4B;
    --gradient-pink: #CD45BA;
    --gradient-purple: #6E57FF;
    
    /* Border Colors - Dark Mode */
    --border-light: #374151;
    --border-lighter: #1f2937;
    --border-divider: #374151;
    --border-section: #374151;
    --border-dropdown: #4b5563;
    --border-selected: #3b82f6;
    --border-pagination: #2463eb;
    --border-checkbox: #4b5563;
    --border-list-selected: #3b82f6;
    --border-gray: #374151;
    --border-light-gray: #1f2937;
    --input-border: #4b5563;
    --action-border: #4b5563;
    
    /* Background Colors - Dark Mode */
    --bg-card: #1f2937;
    --bg-selected: #1e3a8a;
    --bg-hover: #1f2937;
    --bg-hover-alt: #1f2937;
    --bg-input: #1f2937;
    --bg-toggle-active: #374151;
    --bg-light: #1f2937;
    --bg-white: #111827;
    --hover-bg: #1f2937;
    --selected-bg: #1e3a8a;
    
    /* Profile & Special Backgrounds - Dark */
    --bg-profile: #384455;
    --profile-bg: #384455;
    --ai-toggle-start: #7c3aed;
    --ai-toggle-end: #6366f1;
    
    /* Status & Feedback Colors - Same in dark mode */
    --success-green: #1ad598;
    --error-red: #ea3a3d;
    
    /* Focus & Interactive States - Dark */
    --focus-ring: #3b82f6;
    --donut-stroke: #4b5563;
    
    /* Component-Specific Colors - Dark Mode */
    --filter-button-active-bg: #3b82f6;
    --filter-button-active-border: #1d4ed8;
    --filter-button-inactive-bg: #1f2937;
    --filter-button-inactive-border: #374151;
    --filter-dropdown-bg: #1f2937;
    --filter-dropdown-border: #4b5563;
    
    --card-border-selected: #3b82f6;
    --card-border-unselected: #374151;
    --card-bg-selected: #1e3a8a;
    --card-bg-unselected: #1f2937;
    --metrics-bg: #1f2937;
    --buzz-score-bg: #374151;
    
    --toggle-active-bg-start: #7c3aed;
    --toggle-active-bg-end: #6366f1;
    --toggle-inactive-bg: #1f2937;
    --toggle-border: #374151;
    
    --badge-primary-bg: #1e3a8a;
    --badge-primary-border: #3b82f6;
    --badge-secondary-bg: #14532d;
    --badge-secondary-border: #4ade80;
    --badge-text: #f9fafb;
    
    /* Match Score Colors - Dark Mode */
    --match-green: #4ade80;
    --match-green-bg: #14532d;
    --match-yellow: #facc15;
    --match-yellow-bg: #713f12;
    --match-orange: #fb923c;
    --match-orange-bg: #9a3412;
    --match-red: #f87171;
    --match-red-bg: #7f1d1d;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
    background-color: black;
  }
}
```

### Update layout.tsx
Ensure dark mode is enabled in `src/app/layout.tsx`:

```tsx
<html lang="en" className="dark">
```

### Update tailwind.config.js
Add color definitions and safelist to `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    // Match score colors - standard Tailwind colors
    'text-green-600', 'bg-green-100', 'dark:text-green-400', 'dark:bg-green-900/30',
    'text-yellow-600', 'bg-yellow-100', 'dark:text-yellow-400', 'dark:bg-yellow-900/30',
    'text-orange-600', 'bg-orange-100', 'dark:text-orange-400', 'dark:bg-orange-900/30',
    'text-red-600', 'bg-red-100', 'dark:text-red-400', 'dark:bg-red-900/30',
    // Section background
    'bg-section-bg',
    // Common classes that might not be detected
    'bg-black', 'dark',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Original custom colors
        "abu-abu": "var(--abu-abu)",
        "agak-putih": "var(--agak-putih)",
        "basewhite": "var(--basewhite)",
        "graysblack": "var(--graysblack)",
        "neutral-10": "rgba(255, 255, 255, 1)",
        "neutral-new200": "rgba(191, 204, 218, 1)",
        "neutral-new600": "rgba(78, 101, 127, 1)",
        "neutral-100": "#f8f9fa",
        "neutral-new100": "#f8f9fa",
        "neutral-new900": "#111827",
        
        // Radix UI colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Page Background & Layout
        "page-bg": "#000000",
        "section-bg": "#0f1419",
        "card-bg": "#ffffff",
        "card-bg-dark": "#1f2937",
        
        // Text Colors
        "text-heading-main": "#f8f9fa",
        "text-primary": "#06152b",
        "text-primary-alt": "#080d1c",
        "text-secondary": "#71737c",
        "text-muted": "#999999",
        "text-heading": "#111827",
        "text-label": "#374151",
        "text-button": "#6b7280",
        "text-dark": "#06152b",
        "text-medium": "#71737c",
        "text-light": "#999999",
        
        // Brand Colors
        "brand-blue": "#557EDD",
        "brand-purple": "#6C40E4",
        "brand-blue-hover": "#4A6BC8",
        "brand-purple-hover": "#5A36C7",
        
        // Gradient Colors
        "gradient-red": "#FC4C4B",
        "gradient-pink": "#CD45BA",
        "gradient-purple": "#6E57FF",
        
        // Border Colors - Light Mode
        "border-light": "#dbe2eb",
        "border-lighter": "#f1f4f9",
        "border-divider": "#e1e5e9",
        "border-section": "#f3f4f6",
        "border-dropdown": "#e5e7eb",
        "border-selected": "#94c4fc",
        "border-pagination": "#2463eb",
        "border-checkbox": "#D9E1E7",
        "border-list-selected": "#94c4fc",
        "border-gray": "#dbe2eb",
        "border-light-gray": "#f1f4f9",
        "input-border": "#d1d5db",
        "action-border": "#E5E7EB",
        
        // Background Colors - Interactive
        "bg-card": "#F9FAFB",
        "bg-selected": "#f1f6fe",
        "bg-hover": "#f9fafb",
        "bg-hover-alt": "#F0F0F0",
        "bg-input": "#f9fafb",
        "bg-toggle-active": "#f1f4f9",
        "bg-light": "#f1f4f9",
        "bg-white": "#ffffff",
        "hover-bg": "#f9fafb",
        "selected-bg": "#f1f6fe",
        
        // Profile & Special Backgrounds
        "bg-profile": "#384455",
        "profile-bg": "#384455",
        "ai-toggle-start": "#E7CBFD",
        "ai-toggle-end": "#E0DEEA",
        
        // Status & Feedback Colors
        "success-green": "#1ad598",
        "error-red": "#ea3a3d",
        
        // Focus & Interactive States
        "focus-ring": "#3b82f6",
        "donut-stroke": "#E5E7EB",
        
        // Component-Specific Colors - Light Mode
        "filter-button-active-bg": "#3b82f6",
        "filter-button-active-border": "#1d4ed8",
        "filter-button-inactive-bg": "#ffffff",
        "filter-button-inactive-border": "#dbe2eb",
        "filter-dropdown-bg": "#ffffff",
        "filter-dropdown-border": "#e5e7eb",
        
        "card-border-selected": "#94c4fc",
        "card-border-unselected": "#F1F4F9",
        "card-bg-selected": "#f1f6fe",
        "card-bg-unselected": "#ffffff",
        "metrics-bg": "#F9FAFB",
        "buzz-score-bg": "#F1F4F9",
        
        "toggle-active-bg-start": "#E7CBFD",
        "toggle-active-bg-end": "#E0DEEA",
        "toggle-inactive-bg": "#ffffff",
        "toggle-border": "#dbe2eb",
        
        "badge-primary-bg": "#f0f9ff",
        "badge-primary-border": "#dbe2eb",
        "badge-secondary-bg": "#f0df4",
        "badge-secondary-border": "#bbf7d0",
        "badge-text": "#111827",
        
        // Match Score Colors - Light Mode
        "match-green": "#22c55e",
        "match-green-bg": "#dcfce7",
        "match-yellow": "#eab308",
        "match-yellow-bg": "#fef3c7",
        "match-orange": "#f97316",
        "match-orange-bg": "#fed7aa",
        "match-red": "#ef4444",
        "match-red-bg": "#fecaca",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "xs": "475px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## Step 4: Color Implementation Strategy

### Critical Issue: shadcn/ui Component Overrides
The main challenge during integration was that `shadcn/ui` components (Button, Card) use `class-variance-authority` (cva) which has higher CSS specificity than custom styles. This caused colors to not apply properly.

### Solution: Hardcoded Hex Values
Instead of using CSS variables or Tailwind classes, use inline styles with hardcoded hex values:

```tsx
// Instead of this (doesn't work):
className="bg-card-bg-selected"

// Use this (works):
style={{ backgroundColor: '#1e40af' }}
```

### Key Components to Update

#### 1. CreatorCard.tsx
Replace all color references with hardcoded values:

```tsx
// Card background and border
style={{
  borderColor: selected ? '#3b82f6' : '#374151',
  backgroundColor: selectedCreator?.id === creator.id ? '#1e40af' : '#1f2937',
  background: selectedCreator?.id === creator.id ? '#1e40af !important' : '#1f2937 !important'
}}

// Metrics cards
style={{ backgroundColor: '#374151' }}

// Buzz score bar
style={{ backgroundColor: '#374151' }}

// Thumbnail borders
style={{ borderColor: '#4b5563' }}

// Niche badges
style={{
  backgroundColor: niche.type === "primary" ? '#1e40af' : '#14532d',
  borderColor: niche.type === "primary" ? '#3b82f6' : '#4ade80',
  color: '#f9fafb'
}}

// Text colors
style={{ color: '#f9fafb' }}  // Username
style={{ color: '#9ca3af' }}  // Username tag and bio
```

#### 2. CreatorListSection.tsx
Update toggle button colors:

```tsx
style={{
  backgroundColor: viewMode === 'cards' ? '#374151' : 'transparent',
  color: viewMode === 'cards' ? '#f9fafb' : '#6b7280',
  background: viewMode === 'cards' ? '#374151 !important' : 'transparent !important'
}}

// Toggle container
style={{ borderColor: '#4b5563', backgroundColor: '#1f2937' }}

// Toggle divider
style={{ backgroundColor: '#4b5563' }}
```

#### 3. CreatorFilterSection.tsx
Update filter button colors:

```tsx
// Niche filter buttons
style={{
  backgroundColor: selectedCategories.has(category) ? '#1e40af' : '#1e3a8a',
  borderColor: selectedCategories.has(category) ? '#3b82f6' : '#3b82f6',
  color: '#f9fafb',
  background: selectedCategories.has(category) ? '#1e40af !important' : '#1e3a8a !important'
}}

// Clear All button
style={{
  backgroundColor: selectedCategories.size === 0 ? '#374151' : '#1f2937',
  borderColor: selectedCategories.size === 0 ? '#4b5563' : '#374151',
  color: selectedCategories.size === 0 ? '#6b7280' : '#f9fafb',
  background: selectedCategories.size === 0 ? '#374151 !important' : '#1f2937 !important'
}}

// View All button
style={{
  backgroundColor: '#1f2937',
  borderColor: '#374151',
  color: '#f9fafb',
  background: '#1f2937 !important'
}}

// Dropdown menu
style={{
  backgroundColor: '#1f2937',
  borderColor: '#374151'
}}

// Dropdown selection
style={{
  backgroundColor: selectedCategories.has(category) ? '#1e40af' : 'transparent'
}}
```

#### 4. CreatorListView.tsx
Update list view selection:

```tsx
// Row selection
selectedCreator?.id === creator.id ? 'bg-[#1e40af] dark:bg-blue-900/20' : ''
```

## Step 5: Troubleshooting Common Issues

### Issue 1: Colors Not Applying
**Symptoms**: Components remain white despite color changes
**Root Cause**: shadcn/ui component overrides
**Solution**: Use inline styles with `!important` and hardcoded hex values

### Issue 2: TypeScript Errors
**Symptoms**: Import/export errors, syntax errors
**Solution**: 
1. Check file structure matches
2. Ensure all imports are correct
3. Run `npx tsc --noEmit` to check for errors

### Issue 3: UI Breaking
**Symptoms**: Barebones UI, console errors
**Solution**:
1. Remove debugging `useEffect` blocks
2. Clear `.next` cache: `rm -rf .next`
3. Restart development server

### Issue 4: CSS Variables Not Working
**Symptoms**: Variables resolve to light mode values in dark mode
**Root Cause**: CSS specificity issues with `:root` vs `.dark`
**Solution**: Use hardcoded hex values instead of CSS variables

## Step 6: Testing and Verification

### 1. Server Health Check
```bash
curl -s "http://localhost:3000" | head -3
```

### 2. TypeScript Check
```bash
npx tsc --noEmit
```

### 3. Visual Verification
- Check all creator cards have proper dark backgrounds
- Verify niche badges match between cards and filters
- Ensure text is readable against dark backgrounds
- Confirm selection colors are subtle and consistent

## Complete Color Scheme Reference

### Page Background & Layout
- **Main Page Background**: `#000000` (black)
- **Section Background**: `#0f1419` (dark gray)
- **Card Background (Dark)**: `#1f2937` (dark gray)

### Text Colors (Dark Mode)
- **Primary Text**: `#f9fafb` (white)
- **Secondary Text**: `#9ca3af` (light gray)
- **Muted Text**: `#6b7280` (darker gray)

### Brand Colors
- **Brand Blue**: `#557EDD`
- **Brand Purple**: `#6C40E4`
- **Gradient Colors**: `#FC4C4B`, `#CD45BA`, `#6E57FF`

### Border Colors (Dark Mode)
- **Border Light**: `#374151`
- **Border Divider**: `#374151`
- **Border Selected**: `#3b82f6`

### Component-Specific Colors
- **Creator Cards**: `#1f2937` (unselected), `#1e40af` (selected)
- **Filter Buttons**: `#1e3a8a` (unselected), `#1e40af` (selected)
- **Niche Badges**: `#1e40af` (primary), `#14532d` (secondary)
- **Metrics Cards**: `#374151`
- **Buzz Score Bar**: `#374151`
- **Thumbnail Borders**: `#4b5563`

### Interactive States
- **Hover States**: Proper dark mode hover colors
- **Selected States**: `#1e40af` (subtle blue)
- **Focus States**: `#3b82f6` (focus ring)

## Final Notes

1. **Always use hardcoded hex values** instead of CSS variables for critical components
2. **Test thoroughly** after each major change
3. **Clear cache** if UI breaks: `rm -rf .next && npm run dev`
4. **Check TypeScript** regularly: `npx tsc --noEmit`
5. **Verify server health** after changes

This integration guide should provide a smooth, error-free process for future Discover page integrations. 