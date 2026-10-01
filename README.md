# SocietySphere 🌐

A unified recruitment and discovery portal for NSUT college societies — browse clubs, view open roles, and apply, all in one place.

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router)](https://reactrouter.com/)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-orange)](https://lucide.dev/)

## 🔗 Live Preview

Check out the live deployment: [SocietySphere on Vercel](https://society-sphere-six.vercel.app/)


## ✨ Features

### 🎓 Student Profile & Authentication
- **Student Profiles**: Complete record of Roll Number, Department/Branch, Year, Phone, Portfolio, and GitHub/LinkedIn links.
- **Authentication Modal**: Sign In / Registration with persistent multi-tab session management.
- **Auto-fill on Applications**: Automatically pre-populates society application forms with student profile info, with manual "Sync With Profile" button.
- **Application Tracker**: Track all submitted applications, neatly color-coded by society category, with submission date tracking and application withdrawal options.
- **Saved Societies (Bookmarks)**: Bookmark societies of interest and access them directly from the profile or navigation bar.

### 🏛️ Society Directory & Smart Discovery
- **Interactive Society Directory**: Filter across specific club categories Tech, Literary, Sports, etc.
- **Dynamic Multi-Filters & Search**: Filter by open recruitments, categories, saved status, and real-time keyword query. Dynamic open/closed status indicators where closed societies automatically restrict new submissions.
- **Detailed Society Profiles**: Comprehensive club pages featuring descriptions, recruitment criteria, events, and open positions.

### 📅 Campus Events & Deadlines Calendar
- **Interactive Calendar**: Full month and list view of upcoming campus recruitment deadlines, orientations, workshops, and hackathons.
- **Countdown Timers**: Real-time dynamic urgency countdowns for closing recruitment windows.

### 🧭 Recommendation Quiz
- **Society Recommendation Quiz**: A quick interactive questionnaire that suggests the best-fit campus clubs based on user interests.

### 🎨 Theme & Performance
- **Dark Mode Default**: Clean design system utilizing plain CSS custom properties with a persistent light/dark theme toggle.
- **Fully Responsive**: Mobile-first architecture optimized for seamless usage across devices.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) (Vite)
- **Routing**: [React Router 7](https://reactrouter.com/) for client-side routing and dynamic paths
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: CSS Custom Properties
- **Persistence**: `localStorage`

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Steps 

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shauryakushwaha08/SocietySphere.git
   cd SocietySphere
   ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```

4. **Open your browser and navigate** to http://localhost:5173.