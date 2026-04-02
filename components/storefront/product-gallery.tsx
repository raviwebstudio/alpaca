"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="surface-card group relative aspect-[4/5] overflow-hidden rounded-[32px] bg-surface-muted">
        <Image
          src={activeImage}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/10 via-transparent to-transparent" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`surface-card relative aspect-[4/5] min-w-[88px] flex-[0_0_88px] overflow-hidden rounded-2xl transition ${
              activeImage === image
                ? "ring-1 ring-dark"
                : "opacity-75 hover:-translate-y-0.5 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`${alt} view ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 16vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
