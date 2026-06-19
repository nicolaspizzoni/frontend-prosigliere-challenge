import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

// Removed HousePreferenceGateway and Toolbar — house choice is /, toolbar lives under /$house
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col gap-8">
      <Outlet />
    </div>
  );
}
