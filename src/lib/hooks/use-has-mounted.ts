"use client";

import { useEffect, useState } from "react";

/** `false` on server + first client paint — avoids hydration mismatches. */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
