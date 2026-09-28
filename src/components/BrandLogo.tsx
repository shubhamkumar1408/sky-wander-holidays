import React from 'react';
import logoImg from '../../logo.image.jpg';

interface BrandLogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  lightText = false,
}) => {
  const orange = '#FF7A00';
  const teal = '#1297AD';

  const dimensions = {
    sm: { height: 34, iconHeight: 32, iconWidth: 60, textPrimary: 'text-xs sm:text-sm', textSecondary: 'text-[9px]' },
    md: { height: 42, iconHeight: 40, iconWidth: 78, textPrimary: 'text-sm sm:text-base', textSecondary: 'text-[9px] sm:text-[10px]' },
    lg: { height: 54, iconHeight: 50, iconWidth: 98, textPrimary: 'text-lg sm:text-xl', textSecondary: 'text-xs' },
    xl: { height: 72, iconHeight: 66, iconWidth: 130, textPrimary: 'text-xl sm:text-2xl', textSecondary: 'text-sm' },
  }[size];

  const LogoImage = (
    <img
      src={logoImg}
      alt="Sky Wander Holidays"
      className="shrink-0"
      style={{ height: dimensions.iconHeight, width: 'auto', objectFit: 'contain' }}
    />
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center shrink-0 ${className}`}>{LogoImage}</div>;
  }

  const textLayout =
    variant === 'stacked' ? 'flex-col items-center text-center' : 'flex-row items-center';

  return (
    <div className={`inline-flex ${textLayout} items-center gap-2 sm:gap-2.5 shrink-0 select-none ${className}`}>
      {LogoImage}
      <div className="flex flex-col leading-tight whitespace-nowrap shrink-0">
        <span
          className={`${dimensions.textPrimary} font-black uppercase tracking-tight`}
          style={{ color: lightText ? '#ffffff' : teal }}
        >
          Sky Wander
        </span>
        <span
          className={`${dimensions.textSecondary} font-bold tracking-[0.25em] uppercase`}
          style={{ color: orange }}
        >
          Holidays
        </span>
      </div>
    </div>
  );
};