# 🏠 KomunitiKita

**Digital Community Utility Platform for Cost of Living Savings**

Built for **Krackathon Q1 2026** • 3-Hour Challenge

---

## 🎯 Project Overview

**KomunitiKita** is a crowdsourced price comparison platform designed for Malaysians to tackle the rising cost of living. By sharing real-time grocery prices from local supermarkets and community food banks, households can make informed decisions and save significantly on daily essentials.

### 🔴 The Problem
Malaysians struggle to find the cheapest grocery prices across different supermarkets and community food banks, often leading to overspending on daily items like eggs, rice, and cooking oil.

### ✅ The Solution
A community-driven platform where transparency helps families reduce grocery spending by **15-30%** and connects them with affordable food resources.

---

## ✨ Key Features (MVP)

- **📝 Price Submission**: Real-time crowd-sourced entry for products, prices, and locations.
- **🔍 Smart Search & Filter**: Find the cheapest essentials by product name, store, or area.
- **🏷️ Lowest Price Badges**: Automatically highlight the best deals in the community.
- **💰 Savings Calculator**: See the tangible impact of community-shared data on your wallet.
- **🔐 Secure Auth**: Simple Magic Link authentication via Supabase.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | [Next.js 14+](https://nextjs.org/) (App Router) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Backend** | [Supabase](https://supabase.com/) (Auth, Database, Real-time) |
| **State Management** | [TanStack Query v5](https://tanstack.com/query/latest) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd solo_hackathon_kracked_dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📊 Database Schema

The project uses a simple yet effective Supabase schema:

- **`price_entries`**: Stores product names, categories, prices, units, store names, and locations.
- **`user_profiles`**: Tracks user contributions and display names.

---

## 🗺️ Roadmap (Future Enhancements)

- [ ] **Receipt OCR**: Automatically extract prices from supermarket receipts.
- [ ] **Map Integration**: Visualizing price "heatmaps" and nearby food banks.
- [ ] **Price Drop Alerts**: Notifications for saved items.
- [ ] **Gamification**: Badges and rewards for top community contributors.

---

## 👨‍💻 Contributing

This project was built as part of a solo hackathon. Feedback and suggestions are welcome!

---

*Built with ❤️ for the Malaysian Community.*
