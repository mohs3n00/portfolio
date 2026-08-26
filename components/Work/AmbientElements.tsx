import React from 'react';

export const CloudSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 400 250" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#000" floodOpacity="0.1" />
    </filter>
    <path 
      d="M320.5 135C320.5 101.863 293.637 75 260.5 75C252.122 75 244.143 76.7163 236.877 79.791C225.568 47.3828 194.887 25 158.5 25C112.936 25 76 61.9365 76 107.5C76 109.13 76.0472 110.749 76.1398 112.355C41.6914 116.892 15 146.438 15 182.5C15 222.541 47.4594 255 87.5 255H295C336.421 255 370 221.421 370 180C370 148.625 349.467 121.733 320.5 135Z" 
      fill="#FFFFFF" 
      filter="url(#cloudShadow)"
    />
    {/* Inner shadow/highlight for tactile feel */}
    <path 
      d="M260.5 80C289.479 80 313.251 102.327 315.342 130.825C316.398 128.536 317.5 125.756 317.5 122.5C317.5 90.7436 291.756 65 260.5 65C252.373 65 244.646 66.7142 237.591 69.7566C227.324 38.3847 197.351 15 162.5 15C118.041 15 82 51.0411 82 95.5C82 97.4367 82.0683 99.356 82.2012 101.252C47.2882 105.827 20 135.952 20 172.5C20 205.807 42.6468 233.861 73.5358 242.477C68.9184 238.414 65.2676 233.242 63.0232 227.184C55.0838 205.748 64.9128 180.795 86.3486 172.855C107.784 164.916 132.738 174.745 140.677 196.181C145.485 209.167 143.089 223.367 135.481 234.332H295C335.041 234.332 367.5 201.873 367.5 161.832C367.5 133.024 348.423 108.069 322.25 99.0969C317.818 87.7288 306.969 80 294.5 80H260.5Z" 
      fill="#F5F7FA" 
    />
  </svg>
);

export const PaperAirplaneSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="planeShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.15" />
    </filter>
    <g filter="url(#planeShadow)">
      <path d="M10 90L95 10L35 60L10 90Z" fill="#F0F0F0" />
      <path d="M95 10L50 90L35 60L95 10Z" fill="#FFFFFF" />
      <path d="M35 60L50 90L38 75L35 60Z" fill="#D0D0D0" />
    </g>
  </svg>
);

export const DriftingLeafSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 50 50" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="leafShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="2" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1" />
    </filter>
    <path 
      d="M25 5C15 5 5 15 5 25C5 35 15 40 25 45C35 40 45 35 45 25C45 15 35 5 25 5Z" 
      fill="#FAD993" 
      filter="url(#leafShadow)"
    />
    <path d="M25 10V40" stroke="#E3C075" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DistantBirdSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 40 20" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10Q10 5 20 15Q30 5 35 10Q28 2 20 10Q12 2 5 10Z" fill="#8898AA" opacity="0.6" />
  </svg>
);
