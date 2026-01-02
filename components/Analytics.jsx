// components/Analytics.jsx
import { Suspense } from "react";
import AnalyticsClient from "./AnalyticsClient";

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsClient />
    </Suspense>
  );
}
