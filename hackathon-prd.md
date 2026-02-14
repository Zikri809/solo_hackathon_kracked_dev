# Product Requirements Document: KomunitiKita
## Digital Community Utility Platform

**Hackathon:** Krackathon Q1 2026  
**Build Time:** 3 Hours  
**Domain:** Cost of Living  
**Last Updated:** February 14, 2026

---

## 🎯 Executive Summary

**Problem Statement:**  
Malaysians struggle to find the cheapest grocery prices across different supermarkets and community food banks, leading to overspending on daily essentials.

**Solution:**  
KomunitiKita is a crowdsourced price comparison platform where community members share real-time grocery prices from local supermarkets and food banks, helping households save money on essentials.

**Target Impact:**  
- Help Malaysian families reduce grocery spending by 15-30%
- Build community solidarity through price transparency
- Connect people with affordable food resources including community food banks

---

## 🎪 Hackathon Requirements Checklist

### ✅ Must Have (Per Judging Criteria)
1. **Solve a real problem** - Cost of living: grocery price comparison
2. **Working demo** - Full CRUD functionality for price entries
3. **Simple deployment plan** - Vercel + Supabase (documented)
4. **Measurable community benefit** - Track savings calculations, active contributors

### 📋 Scope for 3-Hour Build
**IN SCOPE:**
- Price submission form (item, price, store, location)
- Real-time price comparison list/table
- Basic search by product name
- Store/location filter
- Estimated savings calculator
- Simple authentication (Supabase Auth)

**OUT OF SCOPE (Post-Hackathon):**
- Image uploads for receipts
- Mobile app
- Advanced analytics
- Barcode scanning
- Social features (comments, likes)
- Admin moderation panel

---

## 👥 User Personas

### Primary: Budget-Conscious Parent (Siti, 35)
- **Goals:** Stretch RM800/week grocery budget for family of 4
- **Pain Points:** No time to visit multiple stores; prices vary wildly
- **Use Case:** Checks app before weekly grocery run to find cheapest eggs, rice, cooking oil

### Secondary: Community Contributor (Ahmad, 28)
- **Goals:** Help neighbors save money
- **Pain Points:** Knows about cheap deals but no easy way to share
- **Use Case:** Submits prices while shopping, feels good helping others

---

## 🏗️ Technical Architecture

### Tech Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 14 (App Router) | Server components, fast builds |
| **Language** | TypeScript | Type safety, fewer bugs |
| **Styling** | Tailwind CSS | Rapid UI development |
| **UI Components** | shadcn/ui | Pre-built, accessible, customizable components |
| **Backend** | Supabase | Auth + Database + Real-time in one |
| **Data Fetching** | TanStack Query v5 | Caching, optimistic updates |
| **Deployment** | Vercel | Zero-config Next.js hosting |

### Database Schema (Supabase)

```sql
-- Table: price_entries
CREATE TABLE price_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  product_name TEXT NOT NULL,
  category TEXT, -- 'dairy', 'produce', 'grains', etc.
  price DECIMAL(10,2) NOT NULL,
  unit TEXT, -- 'kg', 'L', 'pack', etc.
  store_name TEXT NOT NULL,
  location TEXT NOT NULL, -- City/area
  submitted_by_name TEXT, -- Optional display name
  verified BOOLEAN DEFAULT FALSE
);

-- Table: user_profiles (optional, for display names)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  contribution_count INT DEFAULT 0
);

-- Indexes for performance
CREATE INDEX idx_product_name ON price_entries(product_name);
CREATE INDEX idx_store_name ON price_entries(store_name);
CREATE INDEX idx_location ON price_entries(location);
CREATE INDEX idx_created_at ON price_entries(created_at DESC);
```

### API Routes (Next.js API/Server Actions)

**Not needed for this build** - TanStack Query will directly use Supabase client

### shadcn/ui Configuration Notes

**Important Setup Details:**
1. During `npx shadcn-ui@latest init`, choose:
   - Style: **Default**
   - Base color: **Slate** (neutral, professional)
   - CSS variables: **Yes** (easier theming)
   
2. The `components.json` config file:
```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

3. Global CSS (app/globals.css) will be updated with CSS variables:
```css
@layer base {
  :root {
    --primary: 142.1 76.2% 36.3%; /* Customize to emerald-600 */
    --radius: 0.5rem;
  }
}
```

---

## 🎨 Core Features (MVP)

### 1. Price Submission Form
**Priority:** P0 (Critical)  
**Time Estimate:** 45 minutes

**User Story:**  
As a community member, I want to submit grocery prices I see while shopping so others can benefit.

**Acceptance Criteria:**
- Form fields: Product name, Price, Unit (dropdown), Store name, Location
- Client-side validation (required fields, price > 0)
- Success toast notification
- Clears form after submission
- Mobile-responsive

**UI Components (shadcn/ui):**
```tsx
<Form {...form}>
  <Card>
    <CardHeader>
      <CardTitle>Submit a Price</CardTitle>
      <CardDescription>Help your community save money</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <FormField
        control={form.control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Eggs Grade A" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField name="price" ... />
        <FormField 
          name="unit" 
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="pack">pack</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <FormField name="storeName" ... />
      <FormField name="location" ... />
    </CardContent>
    <CardFooter>
      <Button type="submit" className="w-full">
        Submit Price
      </Button>
    </CardFooter>
  </Card>
</Form>
```

### 2. Price Comparison List
**Priority:** P0 (Critical)  
**Time Estimate:** 60 minutes

**User Story:**  
As a shopper, I want to see the cheapest prices for products so I can decide where to shop.

**Acceptance Criteria:**
- Display all price entries in a table/card layout
- Show: Product, Price, Unit, Store, Location, Time ago
- Sort by: Newest first (default), Price (low to high)
- Highlight the lowest price for each unique product
- Real-time updates (using Supabase subscriptions)

**Data Display (shadcn/ui Cards):**
```tsx
<Card>
  <CardHeader>
    <div className="flex items-start justify-between">
      <div>
        <CardTitle>Rice (Jasmine) 10kg</CardTitle>
        <CardDescription>NSK • Petaling Jaya</CardDescription>
      </div>
      <Badge variant="default">LOWEST</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-primary">RM45.90</span>
      <span className="text-sm text-muted-foreground">per 10kg</span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
  </CardContent>
</Card>

<Card>
  <CardHeader>
    <div className="flex items-start justify-between">
      <div>
        <CardTitle>Rice (Jasmine) 10kg</CardTitle>
        <CardDescription>Giant • Subang Jaya</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold">RM48.50</span>
      <span className="text-sm text-muted-foreground">per 10kg</span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
  </CardContent>
</Card>
```

### 3. Search & Filter
**Priority:** P1 (High)  
**Time Estimate:** 30 minutes

**Features:**
- Search bar: Filter by product name (fuzzy match)
- Filter dropdown: Store name
- Filter dropdown: Location
- Clear filters button

### 4. Savings Calculator Widget
**Priority:** P1 (High)  
**Time Estimate:** 20 minutes

**User Story:**  
As a user, I want to see how much I could save by shopping at the cheapest stores.

**Functionality:**
- Calculates difference between highest and lowest price for popular items
- Displays: "You could save RM15.60 this week on these 5 items!"
- Shows breakdown per item

### 5. Authentication
**Priority:** P1 (High)  
**Time Estimate:** 25 minutes

**Implementation:**
- Supabase Magic Link Auth (email only, fastest)
- Sign in/Sign out buttons
- Protected submission form (must be logged in)
- Display "Submitted by: [User]" on entries

---

## 📱 User Interface Design

### Design System (shadcn/ui + Tailwind)

**Component Library:**  
All UI components MUST use shadcn/ui. Do not create custom components from scratch.

**Required shadcn/ui Components:**
- `Button` - All CTAs and actions
- `Input` - Form fields
- `Label` - Form labels
- `Card` - Price entry cards
- `Form` - Price submission form
- `Select` - Dropdowns (unit, filters)
- `Toast` - Success/error notifications
- `Table` - Optional for price list view
- `Badge` - "Lowest Price" indicator
- `Skeleton` - Loading states

**Colors (shadcn/ui theme):**
```js
// tailwind.config.ts - customize shadcn theme
primary: "142.1 76.2% 36.3%" // emerald-600 for community/growth
destructive: "0 84.2% 60.2%" // red for errors
border: "214.3 31.8% 91.4%" // slate-200
input: "214.3 31.8% 91.4%"
ring: "142.1 76.2% 36.3%" // focus rings
```

**Typography (shadcn/ui defaults):**
- Headings: `text-2xl font-semibold tracking-tight`
- Body: `text-sm text-muted-foreground`
- Prices: `text-xl font-bold text-primary`

### Key Screens

#### Design Philosophy: shadcn/ui First
**CRITICAL:** Use shadcn/ui components for ALL UI elements. Do NOT create custom styled divs or basic HTML elements when a shadcn component exists.

**Component Mapping:**
- Buttons → `<Button variant="default|outline|ghost">`
- Forms → `<Form>` with `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`
- Cards → `<Card>` with `<CardHeader>`, `<CardContent>`, `<CardFooter>`
- Inputs → `<Input type="text|number|email">`
- Dropdowns → `<Select>` with `<SelectTrigger>`, `<SelectContent>`, `<SelectItem>`
- Notifications → `<Toast>` with `useToast()` hook
- Loading → `<Skeleton className="h-20 w-full">`

#### 1. Home/Dashboard (/)
```tsx
<div className="container mx-auto p-4 space-y-6">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">🏠 KomunitiKita</h1>
    <Button variant="outline">Sign In</Button>
  </div>

  {/* Search Bar */}
  <div className="flex gap-2">
    <Input 
      placeholder="Search products..." 
      className="flex-1"
    />
    <Button>Search</Button>
  </div>

  {/* Stats Card */}
  <Card>
    <CardHeader>
      <CardTitle>💰 Community Impact</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">RM 1,284</p>
      <p className="text-sm text-muted-foreground">
        saved by 156 families this week
      </p>
    </CardContent>
  </Card>

  {/* Price List */}
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Latest Prices</h2>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="lowest">Lowest Price</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    {/* Price Cards */}
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Rice (Jasmine) 10kg</CardTitle>
            <CardDescription>NSK • Petaling Jaya</CardDescription>
          </div>
          <Badge>BEST PRICE</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">RM45.90</span>
          <span className="text-sm text-muted-foreground">per 10kg</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
      </CardContent>
    </Card>
  </div>
</div>
```

#### 2. Submit Price (/submit)
```tsx
<div className="container mx-auto p-4 max-w-2xl">
  <Button variant="ghost" className="mb-4">
    ← Back to Prices
  </Button>

  <Card>
    <CardHeader>
      <CardTitle>📝 Submit a Price</CardTitle>
      <CardDescription>
        Help your community save money by sharing prices you see
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Eggs Grade A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (RM)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="12.80" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="pack">pack</SelectItem>
                      <SelectItem value="pcs">pcs</SelectItem>
                      <SelectItem value="bottle">bottle</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mydin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Shah Alam, Selangor" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Submit Price
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card>
</div>
```

---

## 🚀 Development Roadmap (3 Hours)

### Hour 1: Setup & Core Infrastructure (0:00 - 1:00)
**Minutes 0-15: Project Setup**
- [ ] Create Next.js project: `npx create-next-app@latest`
- [ ] Install dependencies: `npm i @supabase/supabase-js @tanstack/react-query`
- [ ] Initialize shadcn/ui: `npx shadcn-ui@latest init`
- [ ] Install required shadcn components: `npx shadcn-ui@latest add button input label card form select toast table`
- [ ] Configure Tailwind CSS
- [ ] Create Supabase project + get credentials

**Minutes 15-30: Database Setup**
- [ ] Create `price_entries` table in Supabase
- [ ] Set up Row Level Security (RLS) policies
- [ ] Enable realtime on table
- [ ] Seed 5-10 sample entries

**Minutes 30-45: Auth Setup**
- [ ] Configure Supabase Auth (Magic Link)
- [ ] Create auth context/provider
- [ ] Build SignIn/SignOut components

**Minutes 45-60: TanStack Query Setup**
- [ ] Configure QueryClientProvider
- [ ] Create custom hooks: `usePrices()`, `useSubmitPrice()`
- [ ] Test basic data fetching

### Hour 2: Core Features (1:00 - 2:00)
**Minutes 60-80: Price List Component**
- [ ] Create PriceCard using shadcn `Card`, `Badge`, `CardHeader`, `CardContent`
- [ ] Implement real-time subscription with loading `Skeleton`
- [ ] Add "lowest price" badge logic with `Badge variant="default"`
- [ ] Responsive grid layout with Tailwind

**Minutes 80-105: Price Submission Form**
- [ ] Build form using shadcn `Form` + React Hook Form
- [ ] Use `Input`, `Select`, `Button` components
- [ ] Connect to Supabase insert
- [ ] Add loading states with button disabled state
- [ ] Success/error with `useToast()` hook

**Minutes 105-120: Search & Filter**
- [ ] Add search `Input` with icon
- [ ] Add store/location `Select` dropdowns
- [ ] Implement filter logic with TanStack Query
- [ ] Add "Clear Filters" `Button variant="ghost"`

### Hour 3: Polish & Demo Prep (2:00 - 3:00)
**Minutes 120-140: Savings Calculator**
- [ ] Calculate savings from data
- [ ] Build display widget
- [ ] Add to dashboard

**Minutes 140-160: UI Polish**
- [ ] Improve spacing/colors
- [ ] Add loading skeletons
- [ ] Mobile responsive check
- [ ] Add sample data if needed

**Minutes 160-180: Deployment & Demo**
- [ ] Deploy to Vercel
- [ ] Test production build
- [ ] Prepare demo script
- [ ] Screenshot for submission

---

## 🧪 Testing Strategy (Built-In)

**3-Hour Build = Manual Testing Only**

### Pre-Demo Checklist
- [ ] Can create an account (Magic Link)
- [ ] Can submit a price (all fields)
- [ ] New price appears in list immediately
- [ ] Search works for product names
- [ ] Lowest price badge shows correctly
- [ ] Mobile view works (iPhone viewport)
- [ ] Can sign out and back in

---

## 📊 Success Metrics

**Demo Day Metrics:**
1. **Functionality:** All core features working live
2. **Data:** 15+ real price entries (from team + testers)
3. **Performance:** Page loads < 2s, no crashes
4. **UX:** Judge can submit a price in < 30 seconds

**Post-Hackathon (If Continued):**
- 100+ active users in first month
- 500+ price submissions
- Avg. RM50/week savings per active user

---

## 🚧 Known Limitations & Future Enhancements

### MVP Limitations
- No image upload (manual price entry only)
- No price verification system (trust-based)
- Limited to Malaysia (hardcoded)
- No historical price tracking

### Phase 2 Ideas (Post-Hackathon)
1. **Price Verification:** Community voting, receipt OCR
2. **Shopping List:** Users create lists, auto-calculate cheapest route
3. **Alerts:** Price drop notifications for saved items
4. **Analytics:** Price trends over time, inflation tracking
5. **Food Bank Integration:** Map view of community food resources
6. **Gamification:** Badges for top contributors

---

## 🎨 shadcn/ui Component Usage Guide

### Why shadcn/ui for This Project?

1. **Speed:** Pre-built, accessible components = faster development
2. **Consistency:** Professional design system out of the box
3. **Customization:** Components are copied to your project, fully editable
4. **Accessibility:** WCAG compliant, keyboard navigation built-in
5. **TypeScript:** Full type safety

### Component-Feature Mapping

| Feature | shadcn/ui Components Used |
|---------|---------------------------|
| **Price Submission Form** | `Form`, `FormField`, `Input`, `Select`, `Button`, `Card`, `Label` |
| **Price List** | `Card`, `Badge`, `Skeleton` (loading) |
| **Search & Filter** | `Input`, `Select`, `Button` |
| **Authentication** | `Input`, `Button`, `Form`, `Card` |
| **Notifications** | `Toast`, `useToast()` hook |
| **Loading States** | `Skeleton` |
| **Savings Calculator** | `Card`, `CardHeader`, `CardContent` |

### Component Variants to Use

**Buttons:**
```tsx
// Primary actions (Submit, Search)
<Button variant="default">Submit Price</Button>

// Secondary actions (Back, Cancel)
<Button variant="outline">Back</Button>

// Subtle actions (Sign out)
<Button variant="ghost">Sign Out</Button>
```

**Cards:**
```tsx
// Standard cards for price entries
<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Store • Location</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Price info */}
  </CardContent>
</Card>
```

**Badges:**
```tsx
// Highlight lowest price
<Badge variant="default">LOWEST PRICE</Badge>

// Other info
<Badge variant="secondary">New</Badge>
<Badge variant="outline">Verified</Badge>
```

**Inputs:**
```tsx
// Text inputs
<Input type="text" placeholder="Product name" />

// Number inputs
<Input type="number" step="0.01" placeholder="0.00" />
```

### File Structure After shadcn/ui Init

```
your-project/
├── components/
│   └── ui/              # shadcn components (auto-generated)
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── select.tsx
│       ├── badge.tsx
│       ├── toast.tsx
│       └── ...
├── lib/
│   └── utils.ts         # cn() utility for className merging
└── app/
    └── ...
```

### Key shadcn/ui Utilities

**cn() Function** - For conditional styling:
```tsx
import { cn } from "@/lib/utils"

<Card className={cn(
  "transition-all",
  isLowestPrice && "ring-2 ring-primary"
)}>
```

**Form Validation** - Uses React Hook Form + Zod:
```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  price: z.number().min(0.01, "Price must be greater than 0")
})
```

### Common Patterns

**Loading State:**
```tsx
{isLoading ? (
  <Skeleton className="h-32 w-full" />
) : (
  <Card>...</Card>
)}
```

**Error Handling:**
```tsx
const { toast } = useToast()

try {
  // ... operation
  toast({ title: "Success!" })
} catch (error) {
  toast({ 
    title: "Error", 
    description: error.message,
    variant: "destructive" 
  })
}
```

**Responsive Grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {prices.map(price => <PriceCard key={price.id} {...price} />)}
</div>
```

---

## 📚 Technical Documentation

### Environment Variables (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Key Code Snippets

**Supabase Client Setup:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Custom Hook:**
```typescript
// hooks/usePrices.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function usePrices() {
  return useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('price_entries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}
```

---

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables added to Vercel
- [ ] Supabase RLS policies tested
- [ ] Build passes locally: `npm run build`
- [ ] No TypeScript errors

### Deployment Steps
1. Push to GitHub
2. Import to Vercel (auto-detect Next.js)
3. Add environment variables
4. Deploy
5. Test production URL

### Demo Preparation
- [ ] Prepare 2-minute pitch script
- [ ] Have 3 example use cases ready
- [ ] Pre-load 10-15 sample entries
- [ ] Test on mobile device
- [ ] Backup video recording if live demo fails

---

## 🤝 Team Roles (If Applicable)

**Solo Builder:**
- Focus on backend/data flow first (hour 1)
- Use shadcn/ui components as-is without customization to save time
- Copy-paste shadcn examples from docs for forms
- UI can be basic but functional - no need to customize colors/spacing
- **Time-saver:** Use `npx shadcn-ui@latest add` for each component as needed

**2-Person Team:**
- Person A: Supabase + Data layer + Auth + TanStack Query setup
- Person B: shadcn/ui component integration + Form building + Page layouts

**3-Person Team:**
- Person A: Backend (Supabase, hooks, real-time subscriptions)
- Person B: UI/UX (shadcn components, responsive design, accessibility)
- Person C: Features (search, calculator, toasts, deployment)

---

## 📖 Resources

### Quick Reference
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Quick Start](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)

### shadcn/ui Setup Commands
```bash
# Initialize shadcn/ui (run after create-next-app)
npx shadcn-ui@latest init

# Install all required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add skeleton

# Or install multiple at once
npx shadcn-ui@latest add button input label card form select toast badge skeleton
```

### Code Templates
- Supabase Auth: https://supabase.com/docs/guides/auth/auth-helpers/nextjs
- TanStack Query Setup: https://tanstack.com/query/latest/docs/framework/react/quick-start
- shadcn/ui Forms: https://ui.shadcn.com/docs/components/form
- shadcn/ui Toast: https://ui.shadcn.com/docs/components/toast

### shadcn/ui Usage Examples

**Toast Notifications:**
```tsx
// hooks/use-toast.ts (auto-generated by shadcn)
import { useToast } from "@/components/ui/use-toast"

function SubmitButton() {
  const { toast } = useToast()
  
  const handleSubmit = async () => {
    // ... submit logic
    toast({
      title: "Price submitted!",
      description: "Thank you for helping the community save money.",
    })
  }
}
```

**Form with Validation:**
```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  price: z.number().positive("Price must be positive"),
  unit: z.string(),
  storeName: z.string().min(2, "Store name is required"),
  location: z.string().min(2, "Location is required"),
})

function PriceSubmissionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: 0,
      unit: "kg",
      storeName: "",
      location: "",
    },
  })
  
  // Use with <Form {...form}> component
}
```

**Loading Skeleton:**
```tsx
import { Skeleton } from "@/components/ui/skeleton"

function LoadingPriceCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-32" />
      </CardContent>
    </Card>
  )
}
```

---

## ✅ Final Submission Checklist

**Required Deliverables:**
- [ ] Working demo URL (Vercel link)
- [ ] GitHub repository (public)
- [ ] 2-minute video demo
- [ ] README with setup instructions
- [ ] Screenshots of key features

**Pitch Deck Slides (Optional):**
1. Problem: Cost of living crisis in Malaysia
2. Solution: Community-powered price transparency
3. Demo: Live walkthrough (submit + search)
4. Impact: "Help families save RM200+/month"
5. Future: Roadmap (food banks, shopping lists)

---

**Document Version:** 1.0  
**Build Target:** 3 hours max  
**Complexity:** Medium (achievable for intermediate developers)  
**Risk Level:** Low (proven tech stack, clear scope)
