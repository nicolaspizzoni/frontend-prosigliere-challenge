// Updated the Grid to use a 18px gap between items, matching the design mockup.
export const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">{children}</div>
);
