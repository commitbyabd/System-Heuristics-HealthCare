import { LucideProvider } from "lucide-react";

function IconProvider({ children }) {
  return (
    <LucideProvider className="icon" strokeWidth={2}>
      {children}
    </LucideProvider>
  );
}

export default IconProvider;
