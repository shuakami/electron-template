import { JSX, useState, useEffect } from "react";
import backgroundImage from "./assets/image/background.jpg";

// Define the type for our exposed API
declare global {
  interface Window {
    native: {
      openExternal: (url: string) => Promise<void>;
    };
  }
}

interface GetStartedPageProps {
  onBack: () => void;
  isVisible: boolean;
}

function GetStartedPage({ onBack, isVisible }: GetStartedPageProps): JSX.Element {
  return (
    <div
      className={`absolute inset-0 h-full w-full bg-zinc-50 dark:bg-zinc-950 p-8 transition-opacity duration-500 ease-in-out overflow-y-auto ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-4xl mx-auto antialiased">
        <button
          onClick={onBack}
          className="mb-8 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          &larr; Go Back
        </button>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Getting Started
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          This template provides a solid foundation for your Electron application
          using React and TypeScript. Here’s a guide to the key files and how to
          get started.
        </p>

        <div className="mt-12 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
              Key Files & Structure
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              The project is organized into two main parts: the Electron setup and the
              React frontend.
            </p>
            <pre className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-zinc-200 overflow-x-auto">
              <code>
                {`
  electron/
  ├─ main/index.ts        # Electron main process. Handles window creation & system events.
  └─ preload/index.ts     # Bridges the gap between Node.js and the renderer process.

  src/renderer/
  ├─ App.tsx              # The main React component where the UI starts.
  ├─ main.tsx             # The entry point for the React application.
  ├─ contexts/
  │  └─ ThemeContext.tsx   # Manages the light/dark mode theme across the app.
  └─ assets/              # Contains static files like CSS and images.

  electron.vite.config.ts # Vite configuration for Electron.
  tailwind.config.js      # Tailwind CSS configuration.
                `}
              </code>
            </pre>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
              How It Works
            </h2>
            <ul className="mt-4 list-disc list-inside space-y-3 text-zinc-600 dark:text-zinc-400">
              <li>
                <strong>Main Process (<code>electron/main/index.ts</code>):</strong> This
                is the backbone of your desktop app. It creates the browser window and
                handles all interactions with the operating system.
              </li>
              <li>
                <strong>Renderer Process (<code>src/renderer/</code>):</strong> This is
                your React application. It runs inside the Electron browser window and
                is responsible for all the UI.
              </li>
              <li>
                <strong>Preload Script (<code>electron/preload/index.ts</code>):</strong> A
                secure bridge that exposes specific Node.js/Electron APIs to your
                React app. For example, it's used to safely open external links.
              </li>
              <li>
                <strong>Theme Management (<code>ThemeContext.tsx</code>):</strong> We use
                React Context to provide a global, persistent dark mode. It respects
                system settings on the first visit and saves user preference in
                localStorage.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
              Available Scripts
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Use these commands to develop and build your application.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-mono text-sm text-zinc-800 dark:text-zinc-200">
                  npm run dev
                </p>
                <p className="text-sm text-zinc-500">
                  Starts the development server with hot-reloading.
                </p>
              </div>
              <div>
                <p className="font-mono text-sm text-zinc-800 dark:text-zinc-200">
                  npm run build
                </p>
                <p className="text-sm text-zinc-500">
                  Bundles the app for production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGetStartedPage, setShowGetStartedPage] = useState(false);

  useEffect(() => {
    if (showGetStartedPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight / 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (!showGetStartedPage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showGetStartedPage]);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <div
        className={`h-[200vh] transition-opacity duration-500 ${
          showGetStartedPage ? "opacity-0" : "opacity-100"
        }`}
      >
        <main
          className={`fixed inset-0 flex flex-col items-center justify-center text-center p-4 antialiased transition-opacity duration-1000 ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-bold tracking-[-0.03em] text-zinc-900 dark:text-zinc-100">
              Connections,
              <br />
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                Redefined.
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
              The new standard for managing your servers. Secure, fast, and
              designed for modern workflows. Built for professionals.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setShowGetStartedPage(true)}
                className="bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Get Started
              </button>
              <button
                onClick={() =>
                  window.native.openExternal(
                    "https://github.com/shuakami/electron-template"
                  )
                }
                className="border border-zinc-300 dark:border-zinc-700 font-semibold px-6 py-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                ⭐ Give me a star
              </button>
            </div>
          </div>
          <div
            className={`absolute bottom-10 animate-subtle-bounce transition-opacity duration-300 ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          >
            <svg
              className="w-6 h-6 text-zinc-400 dark:text-zinc-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </main>

        <div
          className={`h-screen w-full fixed top-0 left-0 transition-opacity duration-1000 ${
            isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 -z-10">
            <img
              src={backgroundImage}
              alt="background"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-black/30">
            <h2 className="text-4xl md:text-7xl font-bold text-white text-center">
              Enjoy the view.
              <br />
              <span className="text-2xl md:text-4xl font-normal">
                A better way to start your work.
              </span>
            </h2>
          </div>
        </div>
      </div>
      <GetStartedPage
        onBack={() => setShowGetStartedPage(false)}
        isVisible={showGetStartedPage}
      />
    </div>
  );
}

export default App;