# 🌿 GardenGlow - Gardening Community

**Live Site:** [https://gardening-community-cffec.web.app/](https://gardening-community-cffec.web.app/)

## 🌟 Project Description

**GardenGlow** is a vibrant community web application built for gardening enthusiasts. Users can explore gardening tips, connect with fellow gardeners, and share their own knowledge through tips and guides. Whether you're a beginner or a seasoned green thumb, GardenGlow offers a friendly platform to grow and glow together.

## 🚀 Key Features

- 🧱 **Responsive Layout with Theme Toggle:** Clean, modern UI with dark/light mode support and user-friendly navigation.
- 🔐 **Authentication System:** Email/password and Google pop-up login & registration using Firebase.
- 🏡 **Dynamic Home Page:** Features a slider banner, active gardener profiles, and trending tips from the database.
- 🌱 **Full CRUD on Garden Tips:** Users can create, read, update, and delete their garden tips. Only public tips are shown to others.
- 📊 **Tips Filtering and Like System:** Filter tips by difficulty level and like your favorites — likes are stored in the database.
- 👥 **Explore Gardeners Page:** Showcases gardener profiles with real-time data like experience and shared tips count.
- 🎬 **Bonus Integrations:** Includes Lottie React animations and React Simple Typewriter for enhanced UI/UX.
- ❌ **404 Page and Loading States:** Custom not-found page and elegant loading spinners during data fetching.

## 🛠️ Technologies Used

### Frontend
- **React.js** - JavaScript library for building the user interface
- **React Router DOM** - For application routing and navigation
- **Firebase** - Authentication and hosting
- **TailwindCSS & DaisyUI** - For responsive styling and UI components
- **React Icons** - For beautiful icon integration
- **Swiper** - For creating smooth slider components
- **Lottie React** - For engaging animations
- **React Simple Typewriter** - For text animation effects
- **React Helmet Async** - For managing document head
- **React Hot Toast** - For stylish notifications
- **SweetAlert2** - For interactive modal dialogs

### Development Tools
- **Vite** - Fast frontend build tool
- **ESLint** - For code linting
- **PostCSS** - For CSS processing
- **Autoprefixer** - For CSS compatibility

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gardening-community-client.git
   cd gardening-community-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or 
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   VITE_projectId=your_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_messaging_sender_id
   VITE_appId=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
src/
├── assets/            # Static assets and animations
├── Components/        # Reusable UI components
├── Layouts/           # Layout components
├── Pages/             # Page components
├── providers/         # Context providers
├── Routes/            # Routing configuration
├── App.jsx            # Main application component
└── main.jsx          # Application entry point
```

## 🔒 Authentication

The application uses Firebase Authentication with:
- Email/Password registration and login
- Google account login
- Protected routes for authenticated users
- User profile management

## 👥 User Features

- **Garden Tips Management:** Create, browse, update, and delete gardening tips
- **Content Privacy:** Make tips public or private
- **Engagement:** Like, comment, and share tips with the community
- **Profile Customization:** Update profile information and preferences
- **Theme Preference:** Switch between light and dark modes

## 🔄 API Integration

The application connects to a backend server for all data operations, handling:
- User profile data
- Tips storage and retrieval
- Likes and engagement metrics
- Gardener profiles and statistics

## 🏗️ Future Enhancements

- Comment system for tips
- User notifications
- Garden planning tools
- Seasonal gardening recommendations
- Plant identification feature
- Mobile application

---

Feel free to contribute or fork the project to create your own gardening hub! 🌸

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- UI components by [DaisyUI](https://daisyui.com/)
- Animation by [Lottie React](https://github.com/Gamote/lottie-react)
