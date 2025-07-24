import { EndPortalForm } from "./components/end-portal-form";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <EndPortalForm />
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
