// Updated the Item to use a 8px margin between the label and the value, variable cream text color and font normal for the value, and a 16px font size for the label, matching the design mockup.
export const Item = ({ label, value }: { label?: string; value: React.ReactNode }) => (
  <div>
    {label ? <p className="mb-2 text-base leading-[1.3] text-amber-50/30">{label}</p> : null}
    <p className="text-cream leading-[1.3] font-normal">{value}</p>
  </div>
);
