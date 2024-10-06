import Image from "next/image";
import Home from "./pages";
import { Suspense } from "react";

export default function Homee() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </div>
  );
}
