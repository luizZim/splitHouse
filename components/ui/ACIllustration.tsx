export function ACIllustration({ color = '#2E3192', size = 52 }: { color?: string; size?: number }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 120 60" fill="none" style={{ opacity: 0.55 }}>
      <rect x="5" y="12" width="110" height="36" rx="8" fill={color} fillOpacity=".15" stroke={color} strokeWidth="2" />
      <rect x="18" y="24" width="6" height="12" rx="2" fill={color} />
      <rect x="28" y="22" width="6" height="16" rx="2" fill={color} fillOpacity=".7" />
      <rect x="38" y="18" width="6" height="20" rx="2" fill={color} />
      <rect x="48" y="22" width="6" height="16" rx="2" fill={color} fillOpacity=".7" />
      <rect x="58" y="26" width="6" height="10" rx="2" fill={color} fillOpacity=".5" />
      <circle cx="96" cy="30" r="10" fill={color} fillOpacity=".2" stroke={color} strokeWidth="1.5" />
      <path d="M92 30h8M96 26v8" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
