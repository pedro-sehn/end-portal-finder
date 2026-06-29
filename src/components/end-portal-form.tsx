import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type Directions = "North" | "South" | "East" | "West";

type Result = { x: number; z: number } | "parallel" | null;

function calc(
  start: { x: number; z: number },
  distanceTravelled: number,
  facingDirection: Directions,
  h1: number,
  h2: number,
): Result {
  // Minecraft coords: +X is East, +Z is South.
  // Eye-of-Ender yaw points along (-sin(yaw), cos(yaw)).
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // First throw is from `start`; the second is after walking
  // `distanceTravelled` blocks in the facing direction.
  const travel: Record<Directions, { x: number; z: number }> = {
    North: { x: 0, z: -distanceTravelled },
    South: { x: 0, z: distanceTravelled },
    East: { x: distanceTravelled, z: 0 },
    West: { x: -distanceTravelled, z: 0 },
  };

  const p1 = start;
  const p2 = { x: start.x + travel[facingDirection].x, z: start.z + travel[facingDirection].z };

  const d1 = { x: -Math.sin(toRad(h1)), z: Math.cos(toRad(h1)) };
  const d2 = { x: -Math.sin(toRad(h2)), z: Math.cos(toRad(h2)) };

  // Intersect the two sight lines: p1 + t*d1 = p2 + s*d2.
  const det = d2.x * d1.z - d1.x * d2.z;
  if (Math.abs(det) < 1e-9) {
    // Lines are parallel — the angles don't converge on a point.
    return "parallel";
  }

  const t = ((p2.z - p1.z) * d2.x - (p2.x - p1.x) * d2.z) / det;

  const x = Math.round(p1.x + t * d1.x);
  const z = Math.round(p1.z + t * d1.z);

  return { x, z };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex w-full flex-col gap-1.5">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function EndPortalForm() {
  const { t } = useI18n();

  const [result, setResult] = useState<Result>(null);
  const [showHelp, setShowHelp] = useState(false);

  const [startX, setStartX] = useState("0");
  const [startZ, setStartZ] = useState("0");
  const [facingDirection, setFacingDirection] = useState<Directions | "">("");
  const [angle1, setAngle1] = useState("");
  const [distanceTravelled, setDistanceTravelled] = useState("");
  const [angle2, setAngle2] = useState("");

  const isValid =
    facingDirection !== "" &&
    angle1.trim() !== "" &&
    angle2.trim() !== "" &&
    distanceTravelled.trim() !== "" &&
    Number(distanceTravelled) > 0 &&
    !Number.isNaN(Number(angle1)) &&
    !Number.isNaN(Number(angle2)) &&
    !Number.isNaN(Number(startX)) &&
    !Number.isNaN(Number(startZ));

  function handleFind() {
    if (!isValid) return;
    setResult(
      calc(
        { x: Number(startX) || 0, z: Number(startZ) || 0 },
        Number(distanceTravelled),
        facingDirection,
        Number(angle1),
        Number(angle2),
      ),
    );
  }

  return (
    <>
      <div className="bg-background/90 backdrop-blur flex flex-col border rounded-xl p-8 gap-6 w-[min(28rem,calc(100vw-2rem))]">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-semibold">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      <button
        type="button"
        onClick={() => setShowHelp((v) => !v)}
        className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <HelpCircle className="size-4" />
        {showHelp ? t.hideInstructions : t.showInstructions}
      </button>

      {result === "parallel" && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          {t.parallelError}
        </div>
      )}

      {result && result !== "parallel" && (
        <div className="rounded-md border bg-muted/40 px-4 py-3 text-center">
          <span className="text-sm text-muted-foreground">
            {t.strongholdNear}
          </span>
          <div className="text-2xl font-semibold tabular-nums">
            X: {result.x}, Z: {result.z}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Field label={t.facingLabel}>
          <Select
            value={facingDirection}
            onValueChange={(direction) =>
              setFacingDirection(direction as Directions)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t.facingPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="North">{t.directions.north}</SelectItem>
              <SelectItem value="South">{t.directions.south}</SelectItem>
              <SelectItem value="East">{t.directions.east}</SelectItem>
              <SelectItem value="West">{t.directions.west}</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <div className="flex gap-4">
          <Field label={t.startX}>
            <Input
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={startX}
              onChange={(e) => setStartX(e.target.value)}
            />
          </Field>
          <Field label={t.startZ}>
            <Input
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={startZ}
              onChange={(e) => setStartZ(e.target.value)}
            />
          </Field>
        </div>

        <Field label={t.firstAngle}>
          <Input
            type="number"
            inputMode="decimal"
            placeholder={t.firstAnglePlaceholder}
            value={angle1}
            onChange={(e) => setAngle1(e.target.value)}
          />
        </Field>

        <Field label={t.distance}>
          <Input
            type="number"
            inputMode="decimal"
            placeholder={t.distancePlaceholder}
            value={distanceTravelled}
            onChange={(e) => setDistanceTravelled(e.target.value)}
          />
        </Field>

        <Field label={t.secondAngle}>
          <Input
            type="number"
            inputMode="decimal"
            placeholder={t.secondAnglePlaceholder}
            value={angle2}
            onChange={(e) => setAngle2(e.target.value)}
          />
        </Field>
      </div>

      <Button
        className="cursor-pointer w-full"
        size="lg"
        disabled={!isValid}
        onClick={handleFind}
      >
        {t.find}
      </Button>
      </div>

      {showHelp && (
        <aside
          className={cn(
            "fixed z-20 bg-background/90 backdrop-blur border rounded-xl p-6 shadow-lg",
            "inset-x-4 bottom-4 md:inset-x-auto md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2 md:w-80",
            "animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-right-4 duration-200",
          )}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-semibold">{t.helpTitle}</h2>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              aria-label={t.closeInstructions}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
          <ol className="text-sm text-muted-foreground list-decimal pl-5 space-y-1.5">
            {t.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </aside>
      )}
    </>
  );
}
