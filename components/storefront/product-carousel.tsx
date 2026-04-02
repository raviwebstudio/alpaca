"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/storefront/product-card";

type ProductCarouselProps = {
  products: Product[];
};

export function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });
  const [dragging, setDragging] = useState(false);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: products.length > 0,
  });

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const updateScrollState = () => {
      const maxScrollLeft = element.scrollWidth - element.clientWidth;

      setScrollState({
        canScrollLeft: element.scrollLeft > 8,
        canScrollRight: element.scrollLeft < maxScrollLeft - 8,
      });
    };

    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products.length]);

  const scrollByAmount = (direction: number) => {
    scrollRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragState.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };

    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;

    if (Math.abs(distance) > 6) {
      dragState.current.moved = true;
    }

    event.currentTarget.scrollLeft = dragState.current.scrollLeft - distance;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) {
      return;
    }

    dragState.current.active = false;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!dragState.current.moved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragState.current.moved = false;
  };

  return (
    <div className="relative">
      <div className="mb-6 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          aria-label="Scroll products left"
          onClick={() => scrollByAmount(-1)}
          disabled={!scrollState.canScrollLeft}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-dark transition hover:-translate-y-0.5 hover:border-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Scroll products right"
          onClick={() => scrollByAmount(1)}
          disabled={!scrollState.canScrollRight}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-dark transition hover:-translate-y-0.5 hover:border-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
        onClickCapture={handleClickCapture}
        className={clsx(
          "no-scrollbar overflow-x-auto cursor-grab scroll-smooth rounded-[28px] [scrollbar-width:none] active:cursor-grabbing",
          "touch-pan-y select-none",
          dragging && "cursor-grabbing",
        )}
      >
        <div className="flex gap-6 px-1 py-1 snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.slug}
              className="min-w-[280px] max-w-[320px] flex-[0_0_300px] snap-start"
            >
              <ProductCard product={product} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
