# PageSwap - Frontend Engineering Challenge

> **Note:** This company, product, and roadmap are all fictitious. PageSwap is designed to create a realistic scenario that helps guide your technical decisions. None of your work will be used outside of this assessment. **AI usage is acceptable.**

---

## 📖 The Product

**PageSwap** is a peer-to-peer book lending platform that enables users to list pre-owned books for others to borrow and discover titles available in their community.

---

## 🏢 Context: Where We're At

PageSwap is in its infancy. The team was only recently assembled.

### The Team (Today)
- **Founder/CEO** - Former librarian with product vision
- **CTO** - Backend engineer who built the API and started the frontend, but realized they lacked the frontend expertise to execute to a high standard
- **Designer** - Completed the design system and handoffs
- **You** - Engineer #3, first frontend hire

### The Situation
The founder requested the **User Management** feature be implemented first so they could begin onboarding friends and family. The CTO attempted to implement it based on the designer's specs but became overwhelmed and couldn't execute the foundational components to the required standard.

**Your role:** PageSwap will be hiring 2-3 more frontend engineers once the foundation is established. **Your patterns will be their blueprint.** Code quality, architecture decisions, and component composition matter greatly.

---

## 🛠 The Stack

The CTO (primarily a backend engineer) made these technology choices:

| Technology | Rationale |
|------------|-----------|
| **React 19 + TypeScript** | Modern, type-safe, massive talent pool |
| **Vite** | Fast iteration, great DX |
| **CSS Modules** | Scoped styling (CTO doesn't like CSS-in-JS) |
| **Radix UI** | Accessible primitives, easy to customize |
| **TanStack Table** | Stable, production-ready table solution |

### What Already Exists
- ✅ Design system (designed but not yet fully implemented)
- ✅ Basic navigation shell (sidebar, routing)
- ✅ User Management page (partially implemented by CTO)
- ✅ Data layer using Repository pattern (`UserRepository`, `ImageRepository`)
- ✅ IndexedDB setup for local data persistence

---

## 🎯 Your Task: Complete the User Management Feature

The CTO attempted to implement the User Management feature but lacked the frontend expertise to properly implement the design. The feature needs to be broken down and completed incrementally.

### 📐 Design Reference
Access the Figma design file here (requires Figma account):
[**View Design in Figma**](https://www.figma.com/design/Ncj9MxMsaVAw7SwC2WBmWf/Frontend-Take-Home-Assignment?node-id=0-1&p=f&t=F9NuiR1tlxhKoA3M-0)

---

## 🎫 Tickets

### **Ticket 1: Add User Dialog**

**Priority:** High

#### Description
Implement a dialog that allows admins to create new users. The dialog should follow the design system and use reusable, composable components.

#### Requirements
- Use Radix Dialog primitive (or alternative if better justified)
- Form fields:
  - `firstName` (text input, required)
  - `lastName` (text input, required)
  - `age` (number input, required)
  - Avatar picker (grid of selectable avatars)
- Load avatar images using `ImageRepository.get(id)`
- Avatar grid should match the design (selectable, visual feedback for selection)
- Form validation:
  - All fields required
  - Age must be a positive number greater than 0
  - Show inline error messages
- Save user via `UserRepository.add(user)`
- Loading states:
  - Show loading indicator during save
  - Disable form inputs while saving
- Success/error handling:
  - Show success feedback on successful save
  - Show error message if save fails
  - Close dialog on success

#### Acceptance Criteria
- [ ] Dialog opens when "Add User" button is clicked
- [ ] All form fields are present and match design specs
- [ ] Avatar grid displays all avatars from `src/data/avatars.ts`
- [ ] User can select exactly one avatar (visual selection state)
- [ ] Validation errors display inline when fields are invalid
- [ ] Form cannot be submitted when validation fails
- [ ] Loading state is visible during save operation
- [ ] Success message appears after successful save
- [ ] Error message appears if save fails
- [ ] Dialog closes automatically on success
- [ ] New user appears in the table after creation
- [ ] Form resets when dialog is closed and reopened

#### Technical Notes
- Avatar data is available in `src/data/avatars.ts` (exports `AVATAR_IDS` array)
- Use `ImageRepository.get(id)` to resolve avatar URLs
- Consider extracting reusable form components (Input, Select, etc.)
- Dialog should be keyboard accessible (ESC to close, focus management)

---

### **Ticket 2: Delete Confirmation Dialog**

**Priority:** High

#### Description
Implement a confirmation dialog that appears when a user clicks the delete action for a user. This prevents accidental deletions.

#### Requirements
- Use Radix AlertDialog primitive (or alternative if better justified)
- Dialog content:
  - Show user's full name in the confirmation message
  - Clear, actionable copy (e.g., "Are you sure you want to delete [User Name]? This action cannot be undone.")
- Actions:
  - "Cancel" button (secondary style, closes dialog)
  - "Delete" button (destructive/danger style)
- Delete user via `UserRepository.delete(userId)`
- Loading states:
  - Show loading indicator during delete
  - Disable both buttons while deleting
- Success/error handling:
  - Show success feedback on successful deletion
  - Show error message if delete fails with retry option
  - Close dialog on success

#### Acceptance Criteria
- [ ] Dialog opens when delete action is clicked on any user row
- [ ] User's full name appears in the confirmation message
- [ ] "Cancel" button closes dialog without deleting
- [ ] "Delete" button initiates deletion
- [ ] Loading state is visible during delete operation
- [ ] Both buttons are disabled during delete
- [ ] Success message appears after successful deletion
- [ ] Error message appears if deletion fails
- [ ] User is removed from table after successful deletion
- [ ] Dialog closes automatically on success
- [ ] ESC key closes dialog (same as Cancel)

#### Technical Notes
- Consider creating a reusable `ConfirmDialog` component for future use (e.g., deleting books, loans)
- Handle race conditions (user deleted while dialog is open)
- Ensure dialog is accessible (proper ARIA labels, focus trap)

---

### **Ticket 3: Fix Existing Implementation Issues**

**Priority:** Medium

#### Description
The CTO's initial implementation has several layout and styling issues that don't match the design. Review the existing implementation against the Figma design and fix all discrepancies.

#### Known Issues (Examples - investigate for more)
- Table layout doesn't match design spacing/alignment
- Typography (font sizes, weights, colors) inconsistent with design system
- Button styles don't match design system
- Spacing/padding issues throughout the page
- Missing hover/focus states
- Responsive behavior issues
- Color palette not matching design tokens

#### Requirements
- Compare existing implementation to Figma design
- Fix all visual discrepancies (layout, spacing, typography, colors)
- Ensure design system variables are used consistently (no hard-coded values)
- Verify all interactive states (hover, focus, active, disabled)
- Test with different data sets (0 users, 100 users, 5000 users)

#### Acceptance Criteria
- [ ] Page layout matches Figma design precisely
- [ ] Typography (sizes, weights, line-heights) matches design system
- [ ] Spacing and padding match design specs
- [ ] Colors use design system CSS variables (no hard-coded hex values)
- [ ] All buttons match design system button styles
- [ ] Hover states work on all interactive elements
- [ ] Focus states are visible and accessible
- [ ] Table columns align with design specs
- [ ] Avatar display in table matches design
- [ ] Empty state (0 users) is handled gracefully
- [ ] Large data sets (1000+ users) perform well with proper virtualization/pagination
- [ ] No console errors or warnings

#### Technical Notes
- Review `UsersPage.tsx` and `UsersPage.module.css`
- Check if design tokens exist and are being used properly
- Consider refactoring CSS to use more design system variables
- Test scrolling performance with large datasets

---

## ⏱ Time Expectations

**Total Time Budget:** 3 hours maximum

**Important:** There is deliberately more than 3 hours of work here. This simulates a real-world backlog where you must prioritize and deliver incrementally.

**We expect:**
- Focus on **quality over quantity**
- Complete at least **Ticket 1** to a production-ready standard
- If time permits, tackle Ticket 2 and/or Ticket 3
- Could you're implementations executed for Ticket 1 be leveraged in Ticket 2 and 3?
- **Partial completion is acceptable** - we'd rather see one ticket done excellently than three done poorly

In a real-world scenario, you'd complete Ticket 1, submit a PR, and continue with Tickets 2 and 3 in subsequent PRs.

---

## 🎯 Evaluation Criteria

### Code Quality
- **Production-ready code:** No TODOs, console.logs, or quick hacks
- **TypeScript usage:** Proper types, no `any`, good type inference
- **Error handling:** All failure cases handled gracefully
- **Accessibility:** Keyboard navigation, focus management, ARIA labels

### Architecture & Reusability
- **Component composition:** How well do components work together?
- **Reusability:** Could these patterns work for Books? Loans? Future features? Could the interfaces and components you implement for Ticket 1 be leveraged in Ticket 2 and Ticket 3?
- **Abstraction level:** Right balance between DRY and over-engineering

### Design Implementation
- **Attention to detail:** Does it match the Figma design?
- **Design system adherence:** Uses design tokens consistently

### Decision Making & Communication
- **Justification:** Can you explain your architectural decisions?
- **Trade-offs:** Do you understand what you optimized for?
- **PR description:** Clear explanation of what was completed and why
- **Code comments:** Appropriate documentation for complex logic

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org/en/download))
- **Git** configured with SSH or HTTPS access
- **Figma account** (free) to view designs

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone git@github.com:josh-sinclair/PageSwap.git
   # or via HTTPS:
   # git clone https://github.com/josh-sinclair/PageSwap.git
   ```

2. **Create your feature branch**
   ```bash
   cd PageSwap
   git checkout -b john-smith
   # Use your actual name: firstname-lastname
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Generate seed data**
   ```bash
   npm run seed 100
   # This creates fake user data in public/users.json
   # You can adjust the number (e.g., npm run seed 5000)
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)
   - Click "Users" in the sidebar to view the User Management page

### Understanding the Dev Utilities

You'll notice **"Dev Utilities"** buttons at the bottom of the sidebar. These are **NOT part of the design** and are included only for development convenience:

- **Clear Users:** Wipes all users from IndexedDB
- **Import Users:** Loads users from `public/users.json` into IndexedDB

The app uses **IndexedDB** (browser-based database) for data persistence. Use these utilities to reset to a clean state during development.

---

## 📦 Submission Instructions

### Before Submitting
1. **Test your implementation**
   - Test add/delete flows thoroughly
   - Test error cases (validation, network failures)
   - Test with 0 users, 100 users, 5000 users
   - Verify no console errors

2. **Run linting**
   ```bash
   npm run lint
   ```

3. **Verify build succeeds**
   ```bash
   npm run build
   ```

### Submission Process

1. **Commit your work**
   ```bash
   git add .
   git commit -m "feat: implement user management dialogs"
   # Use conventional commit messages
   ```

2. **Push your branch**
   ```bash
   git push origin john-smith --set-upstream
   ```

3. **Create a Pull Request**
   - Go to [https://github.com/josh-sinclair/PageSwap](https://github.com/josh-sinclair/PageSwap)
   - Click "Compare & pull request"
   - **Write a detailed PR description:**
     - What tickets did you complete?
     - What architectural decisions did you make?
     - What trade-offs did you consider?
     - What would you do differently with more time?
     - Any known issues or limitations?

4. **Deadline**
   - Submit by **11:59 PM the day before your interview**
   - Example: Interview on Dec 12 at 11am → Submit by Dec 11 at 11:59pm

---

## 💡 Tips for Success

### Do's ✅
- **Read the entire README before starting**
- **Explore the existing codebase first** (15-20 minutes)
- **Reference the Figma design frequently**
- **Write clean, self-documenting code**
- **Handle edge cases** (empty states, errors, loading)
- **Test your work thoroughly**
- **Use Git commits to show your thought process**
- **Leave thoughtful code comments for complex logic**

### Don'ts ❌
- **Don't try to complete everything** - focus on quality
- **Don't skip error handling** - production code handles failures
- **Don't hard-code values** - use design tokens/constants
- **Don't ignore TypeScript errors** - fix them properly
- **Don't leave console.logs or TODOs** in final submission
- **Don't spend time on features outside the tickets**
- **Don't forget to test edge cases**

---

## 🔍 Key Files to Explore

Before starting, familiarize yourself with:

- **`src/pages/UsersPage.tsx`** - Main user management page
- **`src/components/UserTable.tsx`** - Table component
- **`src/data/UserRepository.ts`** - User data access layer
- **`src/data/ImageRepository.ts`** - Avatar image loading
- **`src/data/avatars.ts`** - Available avatar IDs
- **`src/types/IUser.ts`** - User type definition

---

## 📞 Questions?

If you encounter blockers or have questions about requirements:
- **Technical issues:** Reach out to [contact email]
- **Clarifications:** Document assumptions in your PR description

---

**Good luck! We're excited to see how you approach this challenge.** 🚀
