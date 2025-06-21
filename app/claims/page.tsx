import { Suspense } from "react";
import ClaimsList from "./ClaimsList";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ClaimsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Posted Claims</h1>
      <Suspense fallback={<LoadingSpinner text="Loading claims..." subtext="Fetching your posted claims." />}>
        <ClaimsList />
      </Suspense>
    </main>
  );
}
