import { useEffect, useState } from "react";

/**
 * useMockFetch — simulates an async data load against local mock data, so
 * every data-driven page can show real loading/error/empty states without
 * a backend. `factory` returns the data (throw to simulate a failure).
 *
 * Returns { status: "loading" | "error" | "success", data, error }.
 */
export function useMockFetch(factory, { deps = [], delay = 500, failRate = 0 } = {}) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  // oxlint-disable-next-line react-hooks/exhaustive-deps -- `deps` mirrors a manual dependency list by design
  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    const timer = setTimeout(() => {
      if (cancelled) return;
      if (failRate > 0 && Math.random() < failRate) {
        setState({ status: "error", data: null, error: new Error("Something went wrong. Please try again.") });
        return;
      }
      try {
        setState({ status: "success", data: factory(), error: null });
      } catch (error) {
        setState({ status: "error", data: null, error });
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, deps);

  return state;
}
