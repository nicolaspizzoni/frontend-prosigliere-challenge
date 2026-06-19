import "./index.css";
import ReactDOM from "react-dom/client";
import { ErrorComponent, RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spinner } from "./lib/components/Spinner";
import { StrictMode } from "react";

// Retry once on failure, refetch on window focus is not needed as we're using infinite stale time
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  context: {
    queryClient,
  },
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPendingComponent: () => (
    /**
     * Center the spinner in the page
     */
    <div className={`flex justify-center py-20`}>
      <Spinner />
    </div>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
