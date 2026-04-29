"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="min-w-0 space-y-4">
      <div className="surface-card group relative aspect-[5/5] overflow-hidden rounded-[32px] bg-surface-muted mb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/10 via-transparent to-transparent" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
        {images.map((image, index) => (
          <motion.button
            key={`${image}-${index}`}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveImage(image)}
            className={`surface-card relative aspect-[4/5] min-w-[88px] flex-[0_0_88px] overflow-hidden rounded-2xl transition ${
              activeImage === image ? "ring-1 ring-dark" : "opacity-75 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`${alt} view ${index + 1}`}
              fill
              sizes="88px"
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
