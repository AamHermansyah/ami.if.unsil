import { LucideIcon } from "lucide-react";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}


export const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 p-4 rounded-md border hover:bg-muted transition-all">
    <div className="flex-shrink-0 mt-0.5">
      <Icon className="h-5 w-5 text-primary dark:text-secondary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground break-words capitalize">{value}</p>
    </div>
  </div>
);