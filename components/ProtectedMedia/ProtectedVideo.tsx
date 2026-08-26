import React from 'react';

interface ProtectedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  className?: string;
}

export default function ProtectedVideo({
  className = '',
  ...props
}: ProtectedVideoProps) {
  
  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

  return (
    <video
      {...props}
      className={className}
      controlsList="nodownload"
      disablePictureInPicture
      draggable={false}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
    />
  );
}
