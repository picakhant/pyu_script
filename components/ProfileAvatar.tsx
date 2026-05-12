"use client";

import { useState } from "react";

interface ProfileAvatarProps {
  src: string;
  alt: string;
}

export default function ProfileAvatar({ src, alt }: ProfileAvatarProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc("/profile.png")}
      className="w-full h-full object-cover"
    />
  );
}
