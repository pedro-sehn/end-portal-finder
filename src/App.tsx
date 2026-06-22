import { Canvas } from "@react-three/fiber";
import { EndPortalForm } from "./components/end-portal-form";
import { ThemeProvider, useTheme } from "./components/theme-provider";
import StarsShader from "./components/stars-shader";

function AppContent() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 3] }}
        className="!absolute inset-0 -z-10"
      >
        <StarsShader />
      </Canvas>
      <EndPortalForm />
      {/* <div className=" absolute right-6 top-6">
        <ModeToggle />
      </div> */}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
