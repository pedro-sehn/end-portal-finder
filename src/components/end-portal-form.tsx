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

type Directions = "North" | "South" | "East" | "West";

export function EndPortalForm() {
  const [result, setResult] = useState<{ x: number; z: number }>({
    x: 0,
    z: 0,
  });
  const [distanceTravelled, setDistanceTravelled] = useState<number>(250);
  const [facingDirection, setFacingDirection] = useState<Directions>("North");
  const [h, setH] = useState<{ h1: number; h2: number }>({ h1: 0, h2: 0 });

  function calc(
    distanceTravelled: number,
    facingDirection: Directions,
    h1: number,
    h2: number,
  ) {
    // Minecraft coords: +X is East, +Z is South.
    // Eye-of-Ender yaw points along (-sin(yaw), cos(yaw)).
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    // First throw is from the origin; the second is after walking
    // `distanceTravelled` blocks in the facing direction.
    const travel: Record<Directions, { x: number; z: number }> = {
      North: { x: 0, z: -distanceTravelled },
      South: { x: 0, z: distanceTravelled },
      East: { x: distanceTravelled, z: 0 },
      West: { x: -distanceTravelled, z: 0 },
    };

    const p1 = { x: 0, z: 0 };
    const p2 = travel[facingDirection];

    const d1 = { x: -Math.sin(toRad(h1)), z: Math.cos(toRad(h1)) };
    const d2 = { x: -Math.sin(toRad(h2)), z: Math.cos(toRad(h2)) };

    // Intersect the two sight lines: p1 + t*d1 = p2 + s*d2.
    const det = d2.x * d1.z - d1.x * d2.z;
    if (Math.abs(det) < 1e-9) {
      // Lines are parallel — the angles don't converge on a point.
      return { x: NaN, z: NaN };
    }

    const t = ((p2.z - p1.z) * d2.x - (p2.x - p1.x) * d2.z) / det;

    const x = Math.round(p1.x + t * d1.x);
    const z = Math.round(p1.z + t * d1.z);

    return { x, z };
  }

  function handleClick() {
    const newResult = calc(distanceTravelled, facingDirection, h.h1, h.h2);
    setResult(newResult);
  }

  return (
    <div className="bg-background flex flex-col border rounded-xl p-8 gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold">End Portal Finder</h1>
        {/* <p className="text-muted-foreground"></p> */}
      </div>
      {(Math.abs(result.x) > 0 || Math.abs(result.z) > 0) && (
        <div className="flex justify-center text-xl">
          X: {result.x}, Z: {result.z}
        </div>
      )}
      <div className="md:w-md flex flex-col items-center gap-4">
        <Select
          onValueChange={(direction) =>
            setFacingDirection(direction as Directions)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Facing Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="North">North</SelectItem>
            <SelectItem value="South">South</SelectItem>
            <SelectItem value="East">East</SelectItem>
            <SelectItem value="West">West</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="First Angle"
          onChange={(e) => setH({ h1: Number(e.target.value), h2: h.h2 })}
        />
        <Input
          placeholder="Distance Travelled"
          onChange={(e) => setDistanceTravelled(Number(e.target.value))}
        />
        <Input
          placeholder="Second Angle"
          onChange={(e) => setH({ h1: h.h1, h2: Number(e.target.value) })}
        />
      </div>
      <Button
        className="cursor-pointer w-full border p-4"
        onClick={() => handleClick()}
      >
        Find
      </Button>
    </div>
  );
}
