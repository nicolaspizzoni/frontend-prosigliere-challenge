import { Divider } from "./Divider";
import { Grid } from "./Grid";
import { Item } from "./Item";

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
