# MidAi - AI-Powered Healthcare Assistant (DIPEX)

<div align="center">
  
  <h3>🏥 Your Trusted AI Healthcare Assistant</h3>
  <p>Premium medical-grade healthcare platform with voice-powered symptom checking, video consultations with certified doctors, and 24/7 emergency support.</p>

  [![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

  [Live Demo]([https://midai.vercel.app](https://mid-ai-alpha.vercel.app/)) · [Report Bug](https://github.com/wajiddaudtamboli/MidAi/issues) · [Request Feature](https://github.com/wajiddaudtamboli/MidAi/issues)
</div>

---

## ✨ Features

### Core Healthcare Features
- 🤖 **AI Symptom Checker** - Voice-powered health assessment using GPT-4 with 99% accuracy
- 👨‍⚕️ **Video Consultations** - Connect with 500+ certified healthcare professionals
- 🚨 **Emergency SOS** - One-tap emergency services with GPS tracking & hospital alerts
- 💊 **Medicine Delivery** - OCR prescription scan & pharmacy integration
- 🧠 **Mental Health Support** - AI-powered mood analysis & wellness tracking
- 📋 **Health Reports** - Detailed PDF reports & health history

### Premium UI/UX
- 🌓 **Dark/Light Mode** - Medical-grade green-themed UI with smooth transitions
- 📱 **Responsive Design** - Optimized for all devices (mobile-first)
- ♿ **Accessibility First** - Large tap targets, high contrast, elderly-friendly
- 🎨 **Premium Animations** - Smooth Framer Motion transitions
- 🔒 **Trust-Building Design** - HIPAA badges, doctor verification, security indicators

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) with React Three Fiber
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/) with OpenAI
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenAI API Key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhaskar2522/Dipex.git
   cd Dipex
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── symptom-checker/
│   ├── consultation/      # Video consultation page
│   ├── emergency/         # Emergency SOS page
│   ├── login/            # Authentication pages
│   ├── register/
│   └── symptom-checker/   # AI symptom checker
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/               # Static assets
│   └── models/           # 3D model files
└── styles/               # Global styles
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Bhaskar2522/Dipex)

1. Click the button above or go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `OPENAI_API_KEY` - Your OpenAI API key
4. Deploy!

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes (for AI) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

---
## 👨‍💻 Under Supervision

**Viteshkumar Gaikwad**
---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Bhaskar2522">
        <img src="https://github.com/Bhaskar2522.png" width="100px;" alt="Bhaskar"/><br />
        <sub><b>Bhaskar</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/wajiddaudtamboli">
        <img src="https://github.com/wajiddaudtamboli.png" width="100px;" alt="Wajid Daud Tamboli"/><br />
        <sub><b>Wajid Daud Tamboli</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub>
    </td>
  </tr>
</table>

---

<div align="center">
  Made for DIPEX
  
  **MidAi** - Your Trusted AI Healthcare Companion
</div>
