import { useState } from "react";

const SecretClick = ({ onAdminUnlock }: { onAdminUnlock: () => void }) => {
  const [clicks, setClicks] = useState<number[]>([]);

  const handleClick = () => {
    const now = Date.now();
    const newClicks = [...clicks.filter((time) => now - time < 1000), now]; // Keep recent clicks within 500ms
    setClicks(newClicks);
    if (newClicks.length === 4) {
      onAdminUnlock();
      setClicks([]); // Reset clicks after activation
    }
  };

  return <div onClick={handleClick} className="h-24 w-24 absolute z-50  top-16 left-0" />;
};

export default SecretClick;
