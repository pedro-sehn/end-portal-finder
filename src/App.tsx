import { useEffect, useState } from "react";

type Directions = "north" | "south" | "east" | "west";

function App() {
  const [result, setResult] = useState<{ x: number; z: number }>({
    x: 0,
    z: 0,
  });
  const [distanceTravelled, setDistanceTravelled] = useState<number>(250);
  const [facingDirection, setFacingDirection] = useState<Directions>("north");
  const [h, setH] = useState<{ h1: number; h2: number }>({ h1: 0, h2: 0 });

  function calc(
    distanceTravelled: number,
    facingDirection: Directions,
    h1: number,
    h2: number
  ) {
    const isFacingNorthSouth =
      facingDirection === "north" || facingDirection === "south";
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
    <div className="w-screen h-screen">
      <div className="text-xl">
        X: {result.x} Z: {result.z}
      </div>
      <div className="text-lg flex flex-col">
        <div>Facing Direction: {facingDirection}</div>
        <div>Distance Travelled: {distanceTravelled}</div>
        <input type="number" />
        <select
          value={facingDirection}
          onChange={(e) => setFacingDirection(e.target.value as Directions)}
          className="ml-4 border p-4"
        >
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>
        <input
          className="p-4 border"
          type="number"
          onChange={(e) => setDistanceTravelled(Number(e.target.value))}
        />
        <input
          className="p-4 border"
          type="number"
          onChange={(e) => setH({ h1: Number(e.target.value), h2: h.h2 })}
        />
        <input
          className="p-4 border"
          type="number"
          onChange={(e) => setH({ h1: h.h1, h2: Number(e.target.value) })}
        />
        <button
          className="cursor-pointer p-4 border"
          onClick={() => handleClick()}
        >
          Calc
        </button>
      </div>
    </div>
  );
}

export default App;
