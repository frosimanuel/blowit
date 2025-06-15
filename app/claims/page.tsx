import { Suspense } from "react";
import ClaimsList from "./ClaimsList";

export default function ClaimsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Posted Claims</h1>
      <Suspense fallback={<div>Loading claims...</div>}>
        <ClaimsList />
      </Suspense>
    </main>
  );
}
