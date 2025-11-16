# Deal Flow Management App - Development Plan

## Overview
Build a beautiful, clean, and simple deal flow management app with a central status board for tracking active deals.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4
- **Storage**: Local Storage (browser)

## Todo Items

### Phase 1: Project Setup
- [x] Initialize Next.js project with TypeScript
- [x] Configure Tailwind CSS v3
- [x] Set up project structure

### Phase 2: Core Data Layer
- [x] Define Deal type/interface
- [x] Create deal stages (Lead, Contacted, Proposal, Negotiation, Closed Won, Closed Lost)
- [x] Build local storage service for CRUD operations
- [x] Add React hooks for deal state management

### Phase 3: Status Board (Centerpiece)
- [x] Create kanban-style board layout
- [x] Build column components for each deal stage
- [x] Create deal card component with key info
- [x] Implement move functionality (click-based, simpler than drag-and-drop)

### Phase 4: Deal Management
- [x] Add new deal modal/form
- [x] Edit deal functionality
- [x] Delete deal with confirmation
- [x] View deal details (inline on card)

### Phase 5: Polish & UX
- [x] Clean, modern styling with Tailwind
- [x] Horizontal scroll for responsive design
- [x] Empty states and loading states
- [x] Basic statistics/summary header

### Phase 6: Dark Mode Implementation
- [x] Configure Tailwind for dark mode (class-based)
  - Add `darkMode: 'class'` to tailwind.config.ts
- [x] Add dark theme CSS variables to globals.css
  - Add dark mode body styles for proper backgrounds
- [x] Update layout.tsx with ThemeProvider wrapper
  - Create ThemeProvider component to manage theme state
  - Handle localStorage persistence
  - Detect system preferences as default
  - Apply 'dark' class to html element
- [x] Add dark: variants to DealCard component
  - Card background: white → gray-800
  - Text colors: gray-900 → gray-100
  - Border colors: gray-200 → gray-700
- [x] Add dark: variants to StageColumn component
  - Column body: gray-50 → gray-900
  - Header text and badges
- [x] Add dark: variants to DealModal component
  - Modal background: white → gray-800
  - Form inputs with dark styling
  - Button variants for dark mode
- [x] Update page.tsx with theme toggle button
  - Add toggle button in header (sun/moon icons)
  - Connect to theme context
  - Style header, stats bar, and loading state for dark mode
- [x] Test and verify all components work in both modes

## Key Design Decisions

1. **Simplicity First**: Minimal features, maximum clarity
2. **Local Storage**: No backend complexity, instant persistence
3. **Kanban Layout**: Intuitive visual representation of deal pipeline
4. **Card-Based UI**: Each deal as a scannable card with essential info

## Deal Properties (Minimal)
- ID (auto-generated via crypto.randomUUID)
- Title/Name
- Company
- Value ($)
- Stage (column position)
- Created date
- Last updated
- Notes (optional)

---

## Review Section

### Files Created

**Core Types & Data Layer**
- `src/types/deal.ts` - Type definitions for Deal and DealStage
- `src/lib/storage.ts` - LocalStorage CRUD operations
- `src/hooks/useDeals.ts` - React hook for deal state management

**UI Components**
- `src/components/DealCard.tsx` - Individual deal card with edit/delete actions
- `src/components/StageColumn.tsx` - Column for each pipeline stage
- `src/components/StatusBoard.tsx` - Main kanban board container
- `src/components/DealModal.tsx` - Modal form for creating/editing deals

**App Pages**
- `src/app/page.tsx` - Main page with full app logic
- `src/app/layout.tsx` - Updated metadata
- `src/app/globals.css` - Tailwind v3 directives

**Config**
- `tailwind.config.ts` - Tailwind v3 configuration
- `postcss.config.mjs` - PostCSS with Tailwind & Autoprefixer
- `package.json` - Dependencies (downgraded to Tailwind v3)

### Key Features Implemented

1. **Kanban Status Board** - 6 columns representing deal stages
2. **Deal Cards** - Display title, company, value, date, notes with inline actions
3. **Stage Transitions** - Hover over card to see move options to other stages
4. **CRUD Operations** - Create, read, update, delete deals
5. **Stats Header** - Total deals, active deals, pipeline value
6. **Empty State** - Friendly prompt when no deals exist
7. **Loading State** - Shows while hydrating from localStorage
8. **Delete Confirmation** - Browser confirm dialog prevents accidents

### Architecture Notes

- **Client Components**: All interactive components use 'use client' directive
- **SSR-Safe Storage**: localStorage operations check for window existence
- **Optimistic Updates**: UI updates immediately, syncs to storage
- **Derived State**: Stats calculated from deals array, not stored separately
- **Type Safety**: Full TypeScript coverage with strict types

### What's NOT Included (Intentionally Simple)

- No drag-and-drop (click-to-move is simpler)
- No authentication/users
- No database/backend
- No complex animations
- No search/filter (simple enough to not need it yet)

### Running the App

```bash
npm run dev     # Development server at http://localhost:3000
npm run build   # Production build
npm run start   # Start production server
```

### Future Enhancements (If Needed)

1. Drag-and-drop deal movement
2. Search and filter deals
3. Date-based sorting options
4. Export/Import deals as JSON
5. Contact information on deals
6. Deal activity/history log

---

## Phase 7: Add Deal Sourcing Fields

### Overview
Add key deal sourcing characteristics to track for private market acquisitions.

### New Fields to Add
- City (text)
- State (text)
- Industry (text)
- Revenue (currency)
- Earnings (currency)
- Asking Price (rename existing `value` field)
- Source (text)

### Tasks
- [x] Update Deal interface in `src/types/deal.ts` - add new optional fields
- [x] Update DealModal form with new input fields
- [x] Update DealCard to display new information
- [x] Ensure backward compatibility with existing deals

### Review

**Files Modified:**
- `src/types/deal.ts` - Added city, state, industry, revenue, earnings, source fields; renamed value to askingPrice
- `src/components/DealModal.tsx` - Added form inputs for all new fields with grid layout for City/State and Revenue/Earnings
- `src/components/DealCard.tsx` - Displays location, industry, revenue/earnings, source when available
- `src/app/page.tsx` - Updated pipeline value calculation to use askingPrice
- `src/components/StageColumn.tsx` - Updated column total calculation to use askingPrice

**Implementation Details:**
- All new fields are optional to maintain backward compatibility with existing deals
- Revenue and Earnings display as currency when provided
- Location shows as "City, State" format
- Source displays at bottom of card
- Form uses 2-column grid for related fields (City/State, Revenue/Earnings)

---

## Phase 6 Review: Dark Mode Implementation

### Files Modified

**Configuration**
- `tailwind.config.ts` - Added `darkMode: 'class'` for class-based dark mode switching

**Styling**
- `src/app/globals.css` - Added `.dark` selector with inverted CSS variables for background colors

**New Components**
- `src/components/ThemeProvider.tsx` - React context provider managing theme state with:
  - localStorage persistence (key: 'theme')
  - System preference detection via `matchMedia('prefers-color-scheme: dark')`
  - Dynamic class toggling on `<html>` element

**Updated Components (with dark: variants)**
- `src/app/layout.tsx` - Wrapped children in ThemeProvider, added `suppressHydrationWarning`
- `src/app/page.tsx` - Added theme toggle button with sun/moon icons, all UI elements with dark variants
- `src/components/DealCard.tsx` - Card backgrounds, text colors, borders, buttons
- `src/components/StageColumn.tsx` - Column headers, body backgrounds, move buttons
- `src/components/DealModal.tsx` - Modal background, form inputs, labels, buttons

### Key Implementation Details

1. **Theme Toggle Button** - Located in header with moon icon (light mode) / sun icon (dark mode)
2. **Color Mapping Pattern**:
   - Backgrounds: `bg-white dark:bg-gray-800`, `bg-gray-50 dark:bg-gray-900`
   - Text: `text-gray-900 dark:text-gray-100`, `text-gray-500 dark:text-gray-400`
   - Borders: `border-gray-200 dark:border-gray-700`
   - Accents: `text-green-600 dark:text-green-400`
3. **No External Libraries** - Pure React hooks (useState, useEffect) and Tailwind utilities
4. **System Preference Respect** - Defaults to OS dark mode setting if no stored preference

### Summary

Successfully implemented dark mode using Tailwind's class-based strategy. All components support both light and dark themes with smooth transitions. Theme preference persists across sessions via localStorage and respects system preferences as the default.
