# AI Product Manager (AI PM)

AI PM is an enterprise-grade web application designed to help Product Managers streamline their workflow. With AI PM, users can effortlessly manage projects, construct comprehensive Product Requirements Documents (PRDs), and automatically generate dual 3-month product roadmaps powered by Google Gemini AI.

## 🌟 Key Features

- **Intelligent Roadmap Generation:** Provide a PRD and let AI PM generate two distinct, actionable 3-month roadmaps (e.g., Aggressive vs. Conservative, or MVP vs. Feature-rich).
- **Project & PRD Management:** Organize all your product initiatives and their requirements in a unified workspace.
- **Enterprise-Grade UI/UX:** A stunning, fully responsive interface built with glassmorphic elements, seamless dark/light mode integration, and fluid micro-animations.
- **Secure Authentication:** Frictionless Google Sign-In powered by NextAuth.js.
- **Modern Dashboard:** Track your overall project metrics, recent roadmaps, and team activities at a glance.

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI & Styling:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Motion (Framer Motion)](https://framer.com/motion)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Google Provider)
- **AI Integration:** [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Database:** PostgreSQL
- **Linting & Formatting:** [Biome](https://biomejs.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- A PostgreSQL database
- Google Cloud Platform (for OAuth credentials)
- Google AI Studio (for Gemini API Key)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anurags10/AI-Product-Manager.git
   cd AI-Product-Manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Database connection string
   DATABASE_URL="postgresql://user:password@localhost:5432/aipm"

   # Authentication (NextAuth)
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret_key"
   
   # Google OAuth Providers
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"

   # AI Integration
   GEMINI_API_KEY="your_gemini_api_key"
   ```

4. **Run Database Migrations:**
   Ensure your database schema is up-to-date (if using an ORM like Prisma or Drizzle, run the respective migration command).
   ```bash
   # e.g., using Prisma
   npx prisma db push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Code Quality (Biome)

This project strictly enforces code syntax, accessibility, and consistency using [Biome](https://biomejs.dev/). Standard Next.js and React eslint constraints are disabled in favor of Biome's ultra-fast rust-based engine.

- To check for errors: `npx biome check src/`
- To format and auto-fix: `npm run format`

## 🤝 Contribution

Feedback and contributions are welcome! Feel free to open an issue or submit a pull request if you want to improve the codebase.

## 📄 License

This project is licensed under the MIT License.
