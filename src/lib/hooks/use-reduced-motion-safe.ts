"use client";

import { useReducedMotion } from "framer-motion";
import { useHasMounted } from "./use-has-mounted";

/**
 * `useReducedMotion()` can differ between server and client. Until mounted,
 * return `false` so SSR and hydration markup stay aligned.
 */
export function useReducedMotionSafe() {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();
  if (!mounted) return false;
  return Boolean(prefersReduced);
}
