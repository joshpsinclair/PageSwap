# PageSwap - Frontend Engineering Challenge

## The Product

**PageSwap** is a platform where readers swap or loan pre-owned books. Users list books they've finished, browse what others have available, and arrange temporary loans or permanent swaps. Think library meets social network, but for personal book collections.

## Where We're At

### The Team (Today)
- **Founder/CEO** - Former librarian, product vision
- **CTO** - Backend engineer, built the API
- **Designer** - Completed design system, handed off `design.png`
- **You** - Engineer #3, first frontend hire

We're hiring 2-3 more frontend engineers once the foundation is established. Your patterns will be their blueprint.

### The Stack
The CTO (primarily a backend engineer) made these choices:

- **SPA React 19 + TypeScript** - Modern, type-safe, massive talent pool
- **Vite** - Fast iteration, great DX
- **CSS Modules** - Scoped styling, CTO doesn't like CSS-in-JS
- **Radix UI** - Accessible primitives, easy to customize
- **TanStack Table** - Stable, production-ready

### What Exists
- ✅ Backend API (ready)
- ✅ Design system (complete)
- ✅ Basic user table (CTO's initial implementation)
- ✅ Data layer (repository pattern -- UserRepository, ImageRepository. Not all repositories have been implemented / fleshed out)
- ✅ Basic Navigation shell (sidebar, routing)

## Roadmap

### Alpha → 1,000 Users (2 months)
- User management (admin tools)
- Book listings
- Basic swap/loan requests
- Manual moderation

### Beta → 10,000 Users (6 months)
- Public launch
- Automated matching
- Shipping integration
- Payment/insurance for valuable books
- Ratings and trust scores

## Your Role

You're the **architecture lead** for frontend. Your job:

1. **Review & refine** - Assess the CTO's initial patterns
2. **Establish conventions** - Create the component library foundation
3. **Document decisions** - Make it easy for the next hires
4. **Build for scale** - These patterns will be used across the entire app

**Success = Other engineers can look at your code and instantly understand "the PageSwap way."**

## Task 1: Review Current Architecture

The CTO has implemented a basic user management interface. Your first task:

**Review what's been built:**
- Examine the component structure (UserTable, Button, UserAvatar)
- Check the styling approach (CSS Modules usage)
- Assess the data flow (UserRepository, state management)
- Look at the table implementation (TanStack Table setup)

**Document your findings:**
- What works well?
- What would you refactor?
- What patterns should we standardize?
- What's missing for scale?

**Consider:**
- Will these patterns work for Books and Loans?
- How would you handle forms across the app?
- What about loading states, errors, empty states?
- Accessibility concerns?

## Task 2: Implement User Dialogs

Now that you understand the existing patterns, implement the missing pieces:

### Add User Dialog
- Use Radix Dialog primitive
- Form with firstName, lastName, age fields
- Avatar picker (grid of avatars from `src/data/avatars.ts`)
- Load avatars via ImageRepository (simulated network delay)
- Form validation (all fields required, age must be > 0)
- Save to UserRepository
- Show loading states during save

### Delete Confirmation Dialog
- Use Radix AlertDialog primitive
- Show user's name in confirmation message
- Cancel and confirm actions
- Delete from UserRepository
- Handle errors gracefully

### Key Considerations
- **Reusability**: Could this dialog pattern work for Books? For Loans?
- **Composition**: How do form fields, buttons, and dialogs work together?
- **State management**: Where does form state live? How do you handle validation?
- **Error handling**: What if the save fails? What if avatars don't load?
- **Accessibility**: Keyboard navigation, focus management, ARIA labels

## What We're Looking For

### Technical Excellence
- Clean, type-safe TypeScript
- Accessible components (keyboard + screen reader)
- Proper error handling
- Thoughtful loading states

### System Thinking
- Patterns that scale to other features
- Components that compose well
- Smart abstractions (not too little, not too much)
- Edge cases handled gracefully

### Communication
- Can you explain your architectural decisions?
- Are your component APIs intuitive?
- Would the next engineer understand your code?
- Did you document the non-obvious parts?

## Getting Started

1. Run `npm install && npm run dev`
2. Review the existing codebase (start with `src/App.tsx`, `src/components/UserTable.tsx`)
3. Check out `design.png` for the complete design
4. Document your architecture review findings
5. Implement the Add User and Delete User dialogs
6. Be ready to discuss your choices

**Remember:** You're not just building dialogs. You're establishing how PageSwap builds UI. Make every decision count. 📚
