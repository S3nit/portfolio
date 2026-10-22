/**
 * Gizmo Avatar Component
 * Displays an isolated character asset for Gizmo with seamless SVG fallback
 * matching the character sheet specification:
 * - Mushroom cap (#F5EDE2) with green spots (#A7D7B7) and small leaf sprout
 * - Large expressive green eyes
 * - Brown explorer cloak (#6B4E3F)
 * - Golden gear buckle (#F6C85F)
 * - Glowing magic teal crystal (#4DD0B6)
 */

import React, { useState } from 'react';

export type GizmoMode =
  | 'welcome'
  | 'happy'
  | 'curious'
  | 'thinking'
  | 'celebrating'
  | 'excited'
  | 'surprised'
  | 'helping'
  | 'sleepy';

interface GizmoAvatarProps {
  mode?: GizmoMode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showStaff?: boolean;
}

export const GizmoAvatar: React.FC<GizmoAvatarProps> = ({
  mode = 'happy',
  size = 'md',
  className = '',
  showStaff = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Map mode to asset filename
  const assetName =
    mode === 'welcome' || mode === 'happy'
      ? 'gizmo-happy'
      : mode === 'curious'
      ? 'gizmo-curious'
      : mode === 'thinking' || mode === 'helping'
      ? 'gizmo-thinking'
      : mode === 'celebrating' || mode === 'excited'
      ? 'gizmo-excited'
      : mode === 'surprised'
      ? 'gizmo-surprised'
      : 'gizmo-sleepy';

  const assetSrc = `/assets/gizmo/${assetName}.png`;

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    hero: 'w-full max-w-[420px] aspect-square',
  }[size];

  // If a real isolated image file is exported in public/assets/gizmo/, it will render.
  // Otherwise, the fallback renders an inline SVG.
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      {!imageError ? (
        <img
          src={assetSrc}
          alt={`Gizmo the Workshop Wizard - ${mode}`}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain filter drop-shadow-md"
        />
      ) : (
        /* High-fidelity Vector Wizard Avatar */
        <svg
          viewBox="0 0 160 180"
          className="w-full h-full filter drop-shadow-lg overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="tealGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4DD0B6" stopOpacity="1" />
              <stop offset="60%" stopColor="#184E46" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4DD0B6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="goldGear" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F6C85F" />
            </linearGradient>
            <linearGradient id="cloakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C5948" />
              <stop offset="100%" stopColor="#553D32" />
            </linearGradient>
          </defs>

          {/* Wooden Staff with glowing teal crystal if requested */}
          {showStaff && (
            <g className="animate-pulse-glow" transform="translate(118, 30)">
              {/* Staff stick */}
              <rect x="10" y="24" width="6" height="110" rx="3" fill="#6B4E3F" />
              {/* Gear ornament on staff */}
              <circle cx="13" cy="24" r="14" fill="#F6C85F" stroke="#B45309" strokeWidth="2" />
              <circle cx="13" cy="24" r="6" fill="#184E46" />
              {/* Glowing Teal Gem */}
              <polygon points="13,10 23,24 13,38 3,24" fill="#4DD0B6" filter="drop-shadow(0 0 8px #4DD0B6)" />
              <polygon points="13,14 19,24 13,34 7,24" fill="#A7F3D0" />
            </g>
          )}

          {/* Body / Explorer Cloak */}
          <path
            d="M 50 115 Q 80 108 110 115 L 122 170 Q 80 178 38 170 Z"
            fill="url(#cloakGrad)"
            stroke="#452E24"
            strokeWidth="2"
          />

          {/* Golden Gear Buckle */}
          <g transform="translate(80, 140)">
            <circle cx="0" cy="0" r="10" fill="url(#goldGear)" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#452E24" />
            {/* Gear teeth */}
            {[-45, 0, 45, 90, 135, 180, 225, 270].map((rot) => (
              <rect
                key={rot}
                x="-2"
                y="-13"
                width="4"
                height="4"
                fill="#F6C85F"
                transform={`rotate(${rot})`}
              />
            ))}
          </g>

          {/* Glowing Teal Crystal Pendant */}
          <polygon
            points="80,118 88,128 80,138 72,128"
            fill="#4DD0B6"
            stroke="#E6FFFA"
            strokeWidth="1.5"
            className="animate-pulse"
          />

          {/* Chibi Face / Head */}
          <ellipse cx="80" cy="92" rx="36" ry="32" fill="#FFE8D6" />

          {/* Soft Cheeks */}
          <ellipse cx="58" cy="98" rx="6" ry="4" fill="#FFB7B2" opacity="0.6" />
          <ellipse cx="102" cy="98" rx="6" ry="4" fill="#FFB7B2" opacity="0.6" />

          {/* Large Expressive Green Eyes */}
          {mode === 'sleepy' ? (
            <g stroke="#184E46" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M 60 92 Q 67 98 74 92" />
              <path d="M 86 92 Q 93 98 100 92" />
            </g>
          ) : (
            <g>
              {/* Left Eye */}
              <ellipse cx="66" cy="90" rx="9" ry="12" fill="#184E46" />
              <ellipse cx="66" cy="92" rx="7" ry="9" fill="#2E7D6F" />
              <circle cx="63" cy="86" r="3.5" fill="#FFFFFF" />
              <circle cx="68" cy="94" r="1.5" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="94" cy="90" rx="9" ry="12" fill="#184E46" />
              <ellipse cx="94" cy="92" rx="7" ry="9" fill="#2E7D6F" />
              <circle cx="91" cy="86" r="3.5" fill="#FFFFFF" />
              <circle cx="96" cy="94" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Mouth Expression */}
          {mode === 'excited' || mode === 'celebrating' || mode === 'happy' || mode === 'welcome' ? (
            <path d="M 74 102 Q 80 110 86 102" fill="#C53030" stroke="#7B2D26" strokeWidth="1.5" />
          ) : mode === 'thinking' ? (
            <ellipse cx="82" cy="103" rx="3.5" ry="3.5" fill="#7B2D26" />
          ) : (
            <path d="M 75 103 Q 80 106 85 103" stroke="#7B2D26" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}

          {/* Mushroom Cap (Cream #F5EDE2) with green spots */}
          <path
            d="M 22 75 C 20 25, 140 25, 138 75 C 130 84, 30 84, 22 75 Z"
            fill="#F5EDE2"
            stroke="#D4C8B5"
            strokeWidth="2.5"
          />
          {/* Mushroom Cap Underside rim */}
          <path
            d="M 22 75 Q 80 86 138 75 Q 80 82 22 75 Z"
            fill="#E5DC handle"
            opacity="0.3"
          />

          {/* Leaf Green Spots on Mushroom Cap */}
          <ellipse cx="50" cy="50" rx="10" ry="7" fill="#A7D7B7" transform="rotate(-15 50 50)" />
          <ellipse cx="92" cy="42" rx="12" ry="8" fill="#A7D7B7" transform="rotate(10 92 42)" />
          <ellipse cx="120" cy="62" rx="7" ry="5" fill="#A7D7B7" />
          <circle cx="36" cy="64" r="5" fill="#A7D7B7" />

          {/* Cute Sprout Leaf on Cap Top */}
          <path
            d="M 80 32 Q 74 16 88 12 Q 90 24 80 32 Z"
            fill="#52A478"
            stroke="#184E46"
            strokeWidth="1.5"
          />
          <path
            d="M 80 32 Q 86 20 74 18 Q 72 26 80 32 Z"
            fill="#7BC599"
            stroke="#184E46"
            strokeWidth="1.5"
          />

          {/* Thinking / Curious bubble indicator if in thinking mode */}
          {mode === 'thinking' && (
            <g transform="translate(120, 10)">
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#4DD0B6" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#184E46" fontSize="16" fontWeight="bold">?</text>
            </g>
          )}

          {/* Sparkles if in celebrating/excited mode */}
          {(mode === 'celebrating' || mode === 'excited') && (
            <g fill="#F6C85F">
              <polygon points="20,20 22,26 28,28 22,30 20,36 18,30 12,28 18,26" />
              <polygon points="140,25 142,30 147,32 142,34 140,39 138,34 133,32 138,30" />
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
