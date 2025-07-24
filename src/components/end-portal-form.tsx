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
    h2: number
  ) {
    const isFacingNorthSouth =
      facingDirection === "North" || facingDirection === "South";
    const tan1 = Math.tan((h1 * Math.PI) / 180);
    const tan2 = Math.tan((h2 * Math.PI) / 180);

    const x =
      ((distanceTravelled * (isFacingNorthSouth ? 1 : tan1)) / (tan1 - tan2)) *
      (isFacingNorthSouth ? 1 : -1);
    const z =
      ((distanceTravelled * (!isFacingNorthSouth ? 1 : tan1)) / (tan1 - tan2)) *
      (!isFacingNorthSouth ? 1 : -1);

    return { x, z };
  }

  function handleClick() {
    const newResult = calc(distanceTravelled, facingDirection, h.h1, h.h2);
    setResult(newResult);
  }

  return (
    <div>
      <div className="flex justify-center text-xl">
        X: {result.x}, Z: {result.z}
      </div>
      <div className="md:w-md flex flex-col items-center gap-4 m-6 p-6">
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
          placeholder="Distance Travelled"
          onChange={(e) => setDistanceTravelled(Number(e.target.value))}
        />
        <Input
          placeholder="First Angle"
          onChange={(e) => setH({ h1: Number(e.target.value), h2: h.h2 })}
        />
        <Input
          placeholder="Second Angle"
          onChange={(e) => setH({ h1: h.h1, h2: Number(e.target.value) })}
        />
        <Button
          className="cursor-pointer w-full border p-4"
          onClick={() => handleClick()}
        >
          Find
        </Button>
      </div>
    </div>
  );
}
