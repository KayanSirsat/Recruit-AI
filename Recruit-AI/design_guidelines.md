# Recruit-AI Design Guidelines

## Design Approach
**System-Based Approach:** Material Design 3 principles adapted for professional recruitment workflow tools. This is a utility-focused productivity application where clarity, efficiency, and data readability are paramount.

## Typography Hierarchy
- **Primary Headings (Page Titles):** text-3xl md:text-4xl font-bold
- **Section Headers:** text-xl md:text-2xl font-semibold
- **Card Titles:** text-lg font-semibold
- **Body Text:** text-base leading-relaxed
- **Labels/Metadata:** text-sm font-medium
- **Footer/Auxiliary:** text-sm

**Font Stack:** System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto) for optimal performance and native feel

## Layout System
**Spacing Units:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 consistently
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Card gaps: gap-6
- Form field spacing: space-y-4

**Container Strategy:**
- Main container: max-w-7xl mx-auto px-6
- Two-column grids: grid md:grid-cols-2 gap-6 to gap-8
- Single column content: max-w-4xl mx-auto

## Component Library

### Navigation Bar
- Full-width with subtle border-bottom
- Height: h-16
- Logo: text-xl font-bold
- Nav links: Horizontal flex layout, text-sm font-medium, gap-8
- Sticky positioning: sticky top-0 z-50

### Form Components (Screening Page)
- **Textarea Fields:** 
  - Border with rounded corners (rounded-lg)
  - Padding: p-4
  - Min height: min-h-[300px]
  - Focus states with ring effect
  - Labels: text-sm font-medium mb-2
- **Primary Button:**
  - Padding: px-8 py-3
  - Font: text-base font-semibold
  - Rounded: rounded-lg
  - Full width on mobile, auto width on desktop

### Card Components (Evaluation Page)
- **Standard Card:**
  - Border with rounded corners (rounded-xl)
  - Padding: p-6
  - Shadow: subtle elevation (shadow-sm)
  - Spacing between cards: gap-6
  
- **Match Score Display:**
  - Large numeric value: text-5xl font-bold
  - Supporting text: text-sm
  - Centered alignment
  
- **List Cards (Strengths/Gaps):**
  - Bulleted lists with space-y-3
  - List items: text-base with consistent left padding
  - Maximum 4-5 items per card for scanability

### Action Buttons (Evaluation Page)
- **Secondary Button (Back):**
  - Border variant with transparent fill
  - Padding: px-6 py-2.5
  - Rounded: rounded-lg
  
- **Primary Button (Invite):**
  - Solid fill
  - Padding: px-6 py-2.5
  - Rounded: rounded-lg
  
- **Button Group:** flex gap-4, right-aligned on desktop

### Footer
- Border-top separator
- Center-aligned text
- Padding: py-8
- Text: text-sm

## Page-Specific Layouts

### Screening Page (/screening)
- Hero section: py-16, centered text, max-w-3xl mx-auto
- Title + subtitle stack with mb-2 spacing
- Two-column form grid: pt-12, gap-8
- Button: mt-8, centered or right-aligned
- Vertical spacing emphasizes workflow progression

### Candidate Evaluation Page (/candidate)
- Header with title + action buttons: flex justify-between items-center mb-8
- Two-column card grid for desktop, stacked on mobile
- First column: Match score card (larger emphasis)
- Second column: Stacked cards for Strengths, Gaps, Action
- Consistent card heights within columns for visual balance

## Interaction Patterns
- **Form Validation:** Inline error messages below fields, text-sm
- **Hover States:** Subtle opacity/shadow transitions (no animation needed)
- **Focus States:** Visible ring outlines for accessibility
- **Responsive Breakpoint:** md: (768px) for two-column layouts

## Images
**No hero images required.** This is a productivity tool focused on functionality over visual marketing. All visual hierarchy comes from typography, spacing, and card layouts.

## Key Principles
1. **Information Density:** Dense but organized - use cards to chunk related data
2. **Scanability:** Strong typographic hierarchy with clear labels
3. **Workflow Clarity:** Visual progression from input (screening) to output (evaluation)
4. **Professional Restraint:** Clean, corporate aesthetic suitable for HR/recruiting teams
5. **Data Emphasis:** Match scores and key insights are visually prominent