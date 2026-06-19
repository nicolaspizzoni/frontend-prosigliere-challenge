import { Link, useParams, useRouter, useRouterState } from "@tanstack/react-router";

import { ArrowLeft, Shield } from "lucide-react";

export const Toolbar = () => {
  const router = useRouter();
  const routerState = useRouterState();
  // Read house from the layout URL without tying this shared component to a specific child route.
  const { house } = useParams({ strict: false });
  const isDetailRoute = routerState.location.pathname.includes("/character/");
  const handleChangeHouse = () => {
    router.navigate({ to: "/" });
  };

  return (
    <div className="flex items-center justify-between bg-amber-900/15 p-4">
      <div className="flex flex-1 items-center">
        <div className="mr-4 flex w-8 items-center justify-center">
          {isDetailRoute && house ? (
            <Link
              to="/$house"
              params={{ house }}
              search={true}
              className="text-amber-200 hover:text-amber-100"
              aria-label="Back to characters"
            >
              <ArrowLeft size={20} />
            </Link>
          ) : null}
        </div>
        <h1 className="text-xl font-medium text-amber-200">The Harry Potter App</h1>
      </div>

      <button
        onClick={handleChangeHouse}
        className="flex items-center gap-2 pr-9 text-amber-200 hover:text-amber-100"
        aria-label="Change house selection"
      >
        <span className="text-sm font-medium">Change House</span>
        <Shield size={20} />
      </button>
    </div>
  );
};
