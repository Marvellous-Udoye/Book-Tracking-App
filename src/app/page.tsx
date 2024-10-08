import Loader from "./components/loader";
import BookApp from "./pages";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <BookApp />
      </Suspense>
    </div>
  );
}
