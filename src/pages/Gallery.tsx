import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { fetchApiJson } from '../lib/api';

type GalleryItem = {
  id: string;
  url: string;
};

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const goNext = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);
  const goPrev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const image = images[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(36,48,38,0.96)] backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 z-10">
        <span className="text-[11px] uppercase tracking-[0.26em] text-white/40 font-light">
          {current + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 md:left-6"
        aria-label="Previous photo"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={image.url}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          src={image.url}
          alt="Gallery photo"
          className="max-h-[88vh] max-w-[86vw] rounded-2xl object-contain shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 md:right-6"
        aria-label="Next photo"
      >
        <ChevronRight size={22} />
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetchApiJson<{ images: GalleryItem[] }>('/api/gallery')
      .then(({ data }) => {
        if (active) setImages(data.images || []);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div className="page-shell overflow-hidden px-6 pb-28 pt-36 md:px-10 lg:px-14">
        {/* Hero */}
        <section className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2.4rem] border border-sage/10 bg-[linear-gradient(135deg,rgba(36,48,38,0.96),rgba(81,92,67,0.88))] px-8 py-12 text-bg-warm shadow-[0_30px_90px_rgba(36,48,38,0.16)] md:px-12 md:py-16"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,177,100,0.28),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_24%)]" />
            <div className="relative">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-bg-warm/15 bg-bg-warm/8 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-gold-light">
                <Camera size={14} />
                Photo Gallery
              </span>
              <h1 className="max-w-4xl text-5xl font-serif leading-[0.98] md:text-7xl">
                A gallery of{' '}
                <span className="italic text-gold-light">beautiful gatherings</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-bg-warm/76 md:text-lg">
                Browse moments captured at Ever After — elegant weddings, vibrant socials, and refined
                corporate events. Click any photo to view it in full.
              </p>
              {!loading && images.length > 0 && (
                <p className="mt-4 text-sm text-gold-light/60">
                  {images.length} photos
                </p>
              )}
            </div>
          </motion.div>
        </section>

        {/* Grid */}
        <section className="mx-auto mt-10 max-w-7xl">
          {loading ? (
            <div className="columns-2 gap-3 md:columns-3 xl:columns-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{ aspectRatio: i % 3 === 0 ? '4/5' : i % 2 === 0 ? '1/1' : '5/4' }}
                  className="mb-3 break-inside-avoid animate-pulse rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(106,117,87,0.12),rgba(229,177,100,0.14))]"
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="rounded-[2rem] border border-sage/10 bg-white/60 p-12 text-center">
              <p className="text-ink/50">No photos found in the gallery folder.</p>
            </div>
          ) : (
            <div className="columns-2 gap-3 md:columns-3 xl:columns-4">
              {images.map((image, index) => (
                <motion.button
                  key={image.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.015 * Math.min(index, 24) }}
                  className="group mb-3 block w-full break-inside-avoid cursor-pointer overflow-hidden rounded-[1.35rem] border border-sage/10 bg-white/60 shadow-[0_8px_24px_rgba(36,48,38,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(36,48,38,0.14)]"
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.url}
                      alt=""
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20">
                      <span className="scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
                          <Camera size={18} />
                        </div>
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}