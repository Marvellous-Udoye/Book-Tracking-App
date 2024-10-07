import Loader from "./components/loader";
import Home from "./pages";
import { Suspense } from "react";

export default function Homee() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    </div>
  );
}
