"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="surface-card relative aspect-[4/5] overflow-hidden bg-surface-muted">
        <Image
          src={activeImage}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`surface-card relative aspect-[4/5] overflow-hidden ${
              activeImage === image ? "ring-1 ring-dark" : "opacity-75 hover:opacity-100"
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
