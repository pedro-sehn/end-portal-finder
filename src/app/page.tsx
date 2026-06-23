"use client";

import dynamic from "next/dynamic";

// The whole interactive tree (WebGL canvas, theme provider reading
// localStorage) is browser-only, so render it client-side only and skip
// server prerendering.
const AppShell = dynamic(() => import("@/components/app-shell"), {
  ssr: false,
});

export default function Page() {
  return <AppShell />;
}
