import React, { useState } from "react";


type TooltipProps = {
  label: string;
  tooltipText: string;
};

const Tooltip: React.FC<TooltipProps> = ({ label, tooltipText }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="tooltip-label">{label}</span>
      {visible && <div className="tooltip-box">{tooltipText}</div>}
    </div>
  );
};

export default Tooltip;
