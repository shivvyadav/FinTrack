import { LoaderIcon } from "lucide-react";
function Spinner({ className = "", ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={`animate-spin text-neutral-700 ${className}`}
      {...props}
    />
  );
}

function SpinnerCustom() {
  return (
    <div className={`flex h-screen items-center justify-center`}>
      <Spinner className="size-8" />
    </div>
  );
}
export default SpinnerCustom;
