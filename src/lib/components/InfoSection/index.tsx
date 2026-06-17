import { Divider } from "./Divider";
import { Grid } from "./Grid";
import { Item } from "./Item";

// Updated the InfoSection to use a 18px margin between the title and the children, 10px gap between the title and the icon, font bold and a 22px font size for the title, matching the design mockup.
export const InfoSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="mb-[18px] flex items-center gap-[10px] text-[22px] leading-[1.3] font-bold">
      {icon}
      {title}
    </h2>
    {children}
  </div>
);

InfoSection.Grid = Grid;
InfoSection.Item = Item;
InfoSection.Divider = Divider;
