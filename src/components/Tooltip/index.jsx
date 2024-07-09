import { useState } from 'react';
import './Tooltip.css';
export default function Tooltip({ infoText, children }) {
  // State to manage tooltip visibility
  const [showTooltip, setShowToolTip] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      {children}

      <div className={`tooltip ${showTooltip ? 'open' : ''}`}>{infoText}</div>
    </div>
  );
}
