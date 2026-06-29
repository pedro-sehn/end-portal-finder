"use client";

import { Canvas } from "@react-three/fiber";
import { EndPortalForm } from "./end-portal-form";
import { ThemeProvider } from "./theme-provider";
import { LanguageToggle } from "./language-toggle";
import StarsShader from "./stars-shader";
import { I18nProvider } from "@/lib/i18n";

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
      <div className="fixed top-4 right-4 z-30">
        <LanguageToggle />
      </div>
      <EndPortalForm />
    </div>
  );
}

export default function AppShell() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </ThemeProvider>
  );
}
