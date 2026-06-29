import type { ReactNode } from "react";

export const LOCALES = ["en", "pt-br", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Human-readable names shown in the language switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  "pt-br": "Português",
  es: "Español",
};

/** Maps to the value used for the <html lang> attribute. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  "pt-br": "pt-BR",
  es: "es",
};

type Translation = {
  title: string;
  subtitle: string;
  showInstructions: string;
  hideInstructions: string;
  parallelError: string;
  strongholdNear: string;
  facingLabel: string;
  facingPlaceholder: string;
  directions: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  startX: string;
  startZ: string;
  firstAngle: string;
  firstAnglePlaceholder: string;
  distance: string;
  distancePlaceholder: string;
  secondAngle: string;
  secondAnglePlaceholder: string;
  find: string;
  helpTitle: string;
  closeInstructions: string;
  /** Ordered steps shown in the "How does this work?" panel. */
  steps: ReactNode[];
  languageLabel: string;
};

const kbd = (key: string) => (
  <kbd className="px-1 rounded bg-muted text-foreground">{key}</kbd>
);

export const translations: Record<Locale, Translation> = {
  en: {
    title: "End Portal Finder",
    subtitle:
      "Triangulate your Minecraft stronghold from two eye-of-ender throws.",
    showInstructions: "How does this work?",
    hideInstructions: "Hide instructions",
    parallelError:
      "The two angles point the same way, so they never cross. Walk further (or in a different direction) and read the angles again.",
    strongholdNear: "Stronghold near",
    facingLabel: "Facing direction (while walking)",
    facingPlaceholder: "Select a direction",
    directions: {
      north: "North (−Z)",
      south: "South (+Z)",
      east: "East (+X)",
      west: "West (−X)",
    },
    startX: "Starting X",
    startZ: "Starting Z",
    firstAngle: "First angle (°)",
    firstAnglePlaceholder: "e.g. -42.7",
    distance: "Distance travelled (blocks)",
    distancePlaceholder: "e.g. 250",
    secondAngle: "Second angle (°)",
    secondAnglePlaceholder: "e.g. -61.3",
    find: "Find",
    helpTitle: "How does this work?",
    closeInstructions: "Close instructions",
    steps: [
      <>
        Stand still and throw an eye of ender. Open the debug screen ({kbd("F3")}
        ) and read the horizontal <strong>Facing</strong> angle as the eye flies
        — that is your <strong>First angle</strong>.
      </>,
      <>
        (Optional) Enter your current X / Z from the debug screen so the result
        is in world coordinates. Leave them at 0 to get coordinates relative to
        where you stood.
      </>,
      <>
        Walk in a single cardinal direction (the one you chose below) and count
        the blocks travelled.
      </>,
      <>
        Throw a second eye and read its angle — that is your{" "}
        <strong>Second angle</strong>.
      </>,
      <>Hit Find to triangulate the stronghold&apos;s X and Z.</>,
    ],
    languageLabel: "Language",
  },
  "pt-br": {
    title: "Localizador de Portal do End",
    subtitle:
      "Triangule a fortaleza do seu Minecraft a partir de dois lançamentos de olho de ender.",
    showInstructions: "Como isso funciona?",
    hideInstructions: "Ocultar instruções",
    parallelError:
      "Os dois ângulos apontam para a mesma direção, então nunca se cruzam. Caminhe mais (ou em outra direção) e leia os ângulos novamente.",
    strongholdNear: "Fortaleza perto de",
    facingLabel: "Direção que está olhando (ao caminhar)",
    facingPlaceholder: "Selecione uma direção",
    directions: {
      north: "Norte (−Z)",
      south: "Sul (+Z)",
      east: "Leste (+X)",
      west: "Oeste (−X)",
    },
    startX: "X inicial",
    startZ: "Z inicial",
    firstAngle: "Primeiro ângulo (°)",
    firstAnglePlaceholder: "ex.: -42,7",
    distance: "Distância percorrida (blocos)",
    distancePlaceholder: "ex.: 250",
    secondAngle: "Segundo ângulo (°)",
    secondAnglePlaceholder: "ex.: -61,3",
    find: "Localizar",
    helpTitle: "Como isso funciona?",
    closeInstructions: "Fechar instruções",
    steps: [
      <>
        Fique parado e lance um olho de ender. Abra a tela de depuração (
        {kbd("F3")}) e leia o ângulo horizontal de <strong>Facing</strong>{" "}
        enquanto o olho voa — esse é o seu <strong>Primeiro ângulo</strong>.
      </>,
      <>
        (Opcional) Insira seu X / Z atual da tela de depuração para que o
        resultado fique em coordenadas do mundo. Deixe em 0 para obter
        coordenadas relativas ao ponto onde você estava.
      </>,
      <>
        Caminhe em uma única direção cardeal (a que você escolheu abaixo) e
        conte os blocos percorridos.
      </>,
      <>
        Lance um segundo olho e leia o ângulo dele — esse é o seu{" "}
        <strong>Segundo ângulo</strong>.
      </>,
      <>Clique em Localizar para triangular o X e Z da fortaleza.</>,
    ],
    languageLabel: "Idioma",
  },
  es: {
    title: "Buscador de Portal del End",
    subtitle:
      "Triangula la fortaleza de tu Minecraft a partir de dos lanzamientos de ojo de ender.",
    showInstructions: "¿Cómo funciona esto?",
    hideInstructions: "Ocultar instrucciones",
    parallelError:
      "Los dos ángulos apuntan en la misma dirección, así que nunca se cruzan. Camina más lejos (o en otra dirección) y vuelve a leer los ángulos.",
    strongholdNear: "Fortaleza cerca de",
    facingLabel: "Dirección a la que miras (al caminar)",
    facingPlaceholder: "Selecciona una dirección",
    directions: {
      north: "Norte (−Z)",
      south: "Sur (+Z)",
      east: "Este (+X)",
      west: "Oeste (−X)",
    },
    startX: "X inicial",
    startZ: "Z inicial",
    firstAngle: "Primer ángulo (°)",
    firstAnglePlaceholder: "p. ej. -42,7",
    distance: "Distancia recorrida (bloques)",
    distancePlaceholder: "p. ej. 250",
    secondAngle: "Segundo ángulo (°)",
    secondAnglePlaceholder: "p. ej. -61,3",
    find: "Buscar",
    helpTitle: "¿Cómo funciona esto?",
    closeInstructions: "Cerrar instrucciones",
    steps: [
      <>
        Quédate quieto y lanza un ojo de ender. Abre la pantalla de depuración (
        {kbd("F3")}) y lee el ángulo horizontal de <strong>Facing</strong>{" "}
        mientras el ojo vuela: ese es tu <strong>Primer ángulo</strong>.
      </>,
      <>
        (Opcional) Introduce tu X / Z actual de la pantalla de depuración para
        que el resultado esté en coordenadas del mundo. Déjalos en 0 para
        obtener coordenadas relativas al punto donde estabas.
      </>,
      <>
        Camina en una sola dirección cardinal (la que elegiste abajo) y cuenta
        los bloques recorridos.
      </>,
      <>
        Lanza un segundo ojo y lee su ángulo: ese es tu{" "}
        <strong>Segundo ángulo</strong>.
      </>,
      <>Pulsa Buscar para triangular la X y Z de la fortaleza.</>,
    ],
    languageLabel: "Idioma",
  },
};
