"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { DestinationImage } from "@/lib/destination-guides";

type DestinationGalleryProps = {
  images: DestinationImage[];
  title: string;
  variant?: "card" | "immersive";
};

export function DestinationGallery({ images, title, variant = "immersive" }: DestinationGalleryProps) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set());
  const activeImage = images[index];

  useEffect(() => {
    if (!fullscreen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setFullscreen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [fullscreen]);

  function move(direction: number) {
    setIndex((current) => (current + direction + images.length) % images.length);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStart === null) return;
    const delta = clientX - touchStart;
    setTouchStart(null);
    if (Math.abs(delta) < 48) return;
    move(delta > 0 ? -1 : 1);
  }

  function markImageFailed(src: string) {
    setFailedImages((current) => {
      if (current.has(src)) return current;
      const next = new Set(current);
      next.add(src);
      return next;
    });
  }

  function markImageLoaded(src: string) {
    setLoadedImages((current) => {
      if (current.has(src)) return current;
      const next = new Set(current);
      next.add(src);
      return next;
    });
  }

  if (!activeImage) return null;

  const height = variant === "card" ? "h-64" : "h-[72vh] min-h-[520px]";
  const activeImageFailed = failedImages.has(activeImage.src);

  return (
    <>
      <div
        className={`group relative overflow-hidden ${height} touch-pan-y bg-black`}
        onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
        onTouchEnd={(event) => {
          const touch = event.changedTouches[0];
          if (touch) handleTouchEnd(touch.clientX);
        }}
      >
        {images.map((image, imageIndex) => {
          const visible = imageIndex === index;
          const failed = !image.src || failedImages.has(image.src);
          const loaded = image.src ? loadedImages.has(image.src) : false;
          if (!visible) return null;

          return failed ? (
            <GalleryFallback
              key={`${image.caption}-${imageIndex}`}
              caption={image.caption}
              category={image.category}
              title={title}
              visible={visible}
              variant={variant}
            />
          ) : (
            <div
              key={image.src}
              className={`absolute inset-0 transition duration-700 ${
                visible ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            >
              <ImageLoadingPlaceholder visible={visible && !loaded} />
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={variant === "card" ? "(max-width: 768px) 82vw, 360px" : "100vw"}
                priority={variant === "immersive" && imageIndex === 0}
                loading={variant === "immersive" && imageIndex === 0 ? undefined : "lazy"}
                onLoad={() => markImageLoaded(image.src)}
                onError={() => markImageFailed(image.src)}
                className={`object-cover transition duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/36 via-transparent to-black/10" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="border border-brass/50 bg-black/45 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass backdrop-blur">
            {activeImage.category}
          </span>
          <span className="hidden border border-white/15 bg-black/35 px-3 py-2 text-xs text-ivory/70 backdrop-blur sm:inline-flex">
            {index + 1} / {images.length}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{title}</p>
          <h3 className={`${variant === "card" ? "text-3xl" : "text-5xl sm:text-7xl"} mt-2 font-serif leading-none text-white`}>
            {activeImage.caption}
          </h3>
        </div>

        <div className="absolute right-4 top-4 flex gap-2">
          <button className="focus-ring flex h-10 w-10 items-center justify-center border border-white/15 bg-black/40 text-white backdrop-blur transition hover:bg-white hover:text-ink" onClick={() => setFullscreen(true)} aria-label={`View ${title} gallery fullscreen`}>
            <Maximize2 size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 hidden gap-2 sm:flex">
          <button className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition hover:bg-white hover:text-ink" onClick={() => move(-1)} aria-label="Previous image">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition hover:bg-white hover:text-ink" onClick={() => move(1)} aria-label="Next image">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="absolute inset-x-4 bottom-0 flex translate-y-1/2 gap-1">
          {images.map((image, imageIndex) => (
            <button
              key={`${image.src || image.caption}-${imageIndex}`}
              onClick={() => setIndex(imageIndex)}
              className={`focus-ring h-1 flex-1 rounded-full transition ${imageIndex === index ? "bg-brass" : "bg-white/25 hover:bg-white/50"}`}
              aria-label={`Open ${image.category} image`}
            />
          ))}
        </div>
      </div>

      {fullscreen ? (
        <div className="fixed inset-0 z-[80] bg-black">
          {!activeImage.src || activeImageFailed ? (
            <GalleryFallback caption={activeImage.caption} category={activeImage.category} title={title} visible variant="fullscreen" />
          ) : (
            <Image src={activeImage.src} alt={activeImage.alt} fill sizes="100vw" onError={() => markImageFailed(activeImage.src)} className="object-contain" />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{activeImage.category}</p>
            <h2 className="mt-2 font-serif text-4xl text-white sm:text-6xl">{activeImage.caption}</h2>
          </div>
          <button className="focus-ring absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-white hover:text-ink" onClick={() => setFullscreen(false)} aria-label="Close fullscreen gallery">
            <X size={20} aria-hidden="true" />
          </button>
          <button className="focus-ring absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-white hover:text-ink" onClick={() => move(-1)} aria-label="Previous fullscreen image">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button className="focus-ring absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-white hover:text-ink" onClick={() => move(1)} aria-label="Next fullscreen image">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}

function ImageLoadingPlaceholder({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,168,111,0.2),transparent_28%),linear-gradient(135deg,#f8f1e7,#dac7a6_48%,#f7efe4)] transition duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.42),transparent)]" />
    </div>
  );
}

function GalleryFallback({
  caption,
  category,
  title,
  visible,
  variant
}: {
  caption: string;
  category: DestinationImage["category"];
  title: string;
  visible: boolean;
  variant: "card" | "immersive" | "fullscreen";
}) {
  const scale = visible ? "scale-100 opacity-100" : "scale-105 opacity-0";
  const fullscreen = variant === "fullscreen";

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(200,168,111,0.24),transparent_28%),linear-gradient(135deg,#050505,#14100b_45%,#050505)] transition duration-700 ${scale}`}
      aria-hidden={!visible}
    >
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="absolute -left-16 top-8 h-px w-2/3 rotate-[-18deg] bg-brass/45" />
      <div className="absolute bottom-10 right-0 h-px w-1/2 rotate-[-18deg] bg-white/15" />
      <div className={`absolute inset-x-5 ${fullscreen ? "top-1/2 -translate-y-1/2 text-center" : "top-1/2 -translate-y-1/2"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">{category}</p>
        <p className={`${fullscreen ? "text-5xl sm:text-7xl" : variant === "card" ? "text-3xl" : "text-5xl sm:text-7xl"} mt-3 font-serif leading-none text-white`}>
          {title}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm uppercase tracking-[0.16em] text-ivory/55">{caption}</p>
      </div>
    </div>
  );
}
