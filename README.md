# PageSwap - Frontend Engineering Challenge

This company, product and roadmap are all fictitious, PageSwap is designed to create a scenario that helps guide your decisions when completing the task.
None of your work will be leveraged outside this task. AI is acceptable.

## The Product

**PageSwap** is a peer-to-peer book lending platform. List your pre-owned books for others to borrow, and discover titles available in your
community.

## Where We're At

PageSwap is in its infancy, the team was only recently put together.

### The Team (Today)
- **Founder/CEO** - Former librarian, product vision
- **CTO** - Backend engineer, built the API and started implementing the frontend however realised they lacked the technical skills to execute to a high level.
- **Designer** - Completed design system.
- **You** - Engineer #3, first frontend hire

The founder requested the 'User Management' feature be implemented first so they could at least start on-boarding friends and family. The CTO started to implement per the design handed off by the designer however quickly
realised they lack the skills to execute the foundational components and provided design to a high level.

PageSwap will be hiring 2-3 more frontend engineers once the foundation is established. Your patterns will be their blueprint.

### The Stack
The CTO (primarily a backend engineer) made these choices:

- **SPA React 19 + TypeScript** - Modern, type-safe, massive talent pool
- **Vite** - Fast iteration, great DX
- **CSS Modules** - Scoped styling, CTO doesn't like CSS-in-JS
- **Radix UI** - Accessible primitives, easy to customize, can get off the ground quickly.
- **TanStack Table** - Stable, production-ready

### What Exists
- ✅ Design system ( designed but yet to be implemented )
- ✅ Basic Navigation shell implemented by the CTO (sidebar, routing)
- ✅ The 'User Management' page has been partially implemented by the CTO
- ✅ Data layer (repository pattern -- UserRepository, ImageRepository. Not all repositories have been implemented / fleshed out but the things you need for your upcoming task all exist )

## Product Roadmap

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

## Your Task: Finish the 'User Management' page per the provided design

The CTO has attempted to implement the 'User Management' page however lacks the knowledge and skills to properly implement the design and building the foundational components.
The design can be found here at the following link ( you will need a Figma account to access it )
https://www.figma.com/design/Ncj9MxMsaVAw7SwC2WBmWf/Frontend-Take-Home-Assignment?node-id=0-1&p=f&t=F9NuiR1tlxhKoA3M-0


### Fix Existing Implementation Layout
- The current implementation has various layout and implementation issues that do not match the provided design. These will need to be remedied.

### Add User Dialog
- Use Radix Dialog primitive or leverage an alternative option you feel is more appropriate.
- Form with firstName, lastName, age fields
- Avatar picker (grid of selectable avatars from `src/data/avatars.ts`)
- Load avatars via ImageRepository
- Form validation (all fields required, age must be > 0)
- Save to UserRepository
- Show loading states during save

### Delete Confirmation Dialog
- Use Radix AlertDialog primitive or leverage an alternative option you feel is more appropriate.
- Show user's name in confirmation message
- Cancel and confirm actions
- Delete from UserRepository
- Handle errors gracefully

### What We're Looking For
- **Attention to detail**: Does your work match the provided design?
- **Reusability**: Could this dialog pattern work for Books? For Loans? Or some future feature that hasn't been concocted yet.
- **Composition**: How do form fields, buttons, and dialogs work together?
- **Justification**: Be ready to justify the decisions you make.
