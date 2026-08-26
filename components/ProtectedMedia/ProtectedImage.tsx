import React from 'react';
import Image, { ImageProps } from 'next/image';

interface ProtectedImageProps extends Partial<ImageProps> {
  src: string | any;
  alt?: string;
  useNative?: boolean;
  className?: string;
  [key: string]: any;
}

export default function ProtectedImage({
  className = '',
  useNative = false,
  blockInteraction, // Extract to prevent passing to DOM
  watermark,        // Extract to prevent passing to DOM
  ...props
}: ProtectedImageProps) {
  
  // Note: we remove watermark and blockInteraction overlay props from the signature 
  // because relying on an overlay div requires a wrapper, which breaks user layout.
  // We instead enforce purely native event-based protection on the img directly.

  const commonStyle = {
    ...props.style,
    // Add lightweight inline protection
    userSelect: 'none' as any,
    WebkitUserSelect: 'none' as any,
    WebkitUserDrag: 'none' as any,
  };

  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

  if (useNative) {
    return (
      <img
        {...props}
        className={className}
        style={commonStyle}
        alt={props.alt || ''}
        draggable={false}
        onContextMenu={preventDefault}
        onDragStart={preventDefault}
      />
    );
  }

  return (
    <Image
      {...(props as ImageProps)}
      className={className}
      style={commonStyle}
      alt={props.alt || ''}
      draggable={false}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
    />
  );
}
