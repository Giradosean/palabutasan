import React from 'react';

interface EarDiagramProps {
  activePiercingId?: string;
  onSelectPiercing?: (id: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface EarPoint {
  id: string;
  name: string;
  x: number;
  y: number;
}

const EAR_POINTS: EarPoint[] = [
  { id: 'lobe', name: 'Lobe', x: 120, y: 310 },
  { id: 'upper-lobe', name: 'Upper Lobe', x: 145, y: 280 },
  { id: 'helix', name: 'Helix', x: 195, y: 95 },
  { id: 'forward-helix', name: 'Forward Helix', x: 95, y: 105 },
  { id: 'flat', name: 'Flat', x: 145, y: 110 },
  { id: 'conch', name: 'Conch', x: 155, y: 195 },
  { id: 'tragus', name: 'Tragus', x: 92, y: 205 },
  { id: 'daith', name: 'Daith', x: 115, y: 165 },
  { id: 'rook', name: 'Rook', x: 120, y: 125 },
  { id: 'industrial', name: 'Industrial', x: 160, y: 80 }
];

export const EarDiagram: React.FC<EarDiagramProps> = ({
  activePiercingId,
  onSelectPiercing,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-48 h-64',
    md: 'w-64 h-84',
    lg: 'w-80 h-104'
  }[size];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <div className={`relative ${sizeClasses}`}>
        <svg
          viewBox="0 0 240 360"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base background ear shape */}
          <path
            d="M 90 90 
               C 90 40, 190 20, 210 90 
               C 225 150, 210 240, 160 300 
               C 130 335, 100 340, 95 305 
               C 90 270, 115 255, 115 235 
               C 115 220, 85 220, 80 205 
               C 75 190, 85 180, 85 170 
               C 85 155, 105 150, 105 130 
               C 105 105, 90 100, 90 90 Z"
            fill="#FAFAF7"
            stroke="#111111"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Helix / Auricular Rim internal fold */}
          <path
            d="M 100 95 
               C 110 50, 185 45, 195 95 
               C 205 145, 190 220, 155 270 
               C 140 290, 125 295, 120 280"
            stroke="#E9E9E7"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Antihelix & Scapha */}
          <path
            d="M 160 120 
               C 145 135, 135 150, 135 180 
               C 135 220, 155 245, 140 260"
            stroke="#D5D5D1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Concha Bowl */}
          <path
            d="M 120 160 
               C 140 165, 165 175, 165 210 
               C 165 230, 140 240, 125 230"
            fill="#EFEFED"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Tragus flap */}
          <path
            d="M 80 195 
               C 88 190, 95 195, 96 205 
               C 97 215, 88 220, 80 215"
            fill="#FAFAF7"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Ear canal entry */}
          <ellipse
            cx="110"
            cy="208"
            rx="9"
            ry="14"
            fill="#111111"
            opacity="0.85"
          />

          {/* Antitragus ridge */}
          <path
            d="M 115 245 
               C 125 245, 135 250, 135 260"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Industrial bar indicator if active */}
          {activePiercingId === 'industrial' && (
            <line
              x1="98"
              y1="100"
              x2="198"
              y2="90"
              stroke="#A63D40"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
          )}

          {/* Piercing placement markers */}
          {EAR_POINTS.map((pt) => {
            const isActive = activePiercingId === pt.id;
            return (
              <g
                key={pt.id}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => onSelectPiercing?.(pt.id)}
                role="button"
                tabIndex={0}
                aria-label={`Placement point for ${pt.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPiercing?.(pt.id);
                  }
                }}
              >
                {/* Glow ring for active */}
                {isActive && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="12"
                    className="animate-pulse"
                    fill="#A63D40"
                    fillOpacity="0.25"
                  />
                )}

                {/* Outer ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? '7' : '5'}
                  fill={isActive ? '#A63D40' : '#FFFFFF'}
                  stroke={isActive ? '#A63D40' : '#111111'}
                  strokeWidth="2"
                  className="transition-colors duration-200"
                />

                {/* Inner center dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? '3' : '2'}
                  fill={isActive ? '#FFFFFF' : '#111111'}
                />
              </g>
            );
          })}
        </svg>

        {/* Labels for active element */}
        {EAR_POINTS.find(p => p.id === activePiercingId) && (
          <div className="mt-3 text-center">
            <span className="text-xs uppercase tracking-wider text-[#A63D40] font-bold">
              {EAR_POINTS.find(p => p.id === activePiercingId)?.name} Placement Site
            </span>
          </div>
        )}
      </div>

      <p className="text-[11px] text-[#777777] mt-2 text-center max-w-xs">
        Anatomical map. Click any marker to view the corresponding piercing procedure and healing specs.
      </p>
    </div>
  );
};
