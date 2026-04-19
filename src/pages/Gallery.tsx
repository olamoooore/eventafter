import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Image as ImageIcon, LoaderCircle } from 'lucide-react';
import { Image } from '@imagekit/react';
import { fetchApiJson } from '../lib/api';

type GalleryImage = {
  id: string;
  name: string;
  alt: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  tags: string[];
  filePath: string;
};

type GalleryResponse = {
  configured: boolean;
  images: GalleryImage[];
  message?: string;
};

const cardOffsets = ['lg:translate-y-10', 'lg:-translate-y-6', 'lg:translate-y-16', 'lg:translate-y-2'];

const quickStats = [
  { label: 'Captured moments', value: 'ImageKit live' },
  { label: 'Venue mood', value: 'Elegant, warm, polished' },
  { label: 'Ideal for', value: 'Weddings, socials, corporate events' },
];

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-[1.75rem] border border-sage/10 bg-white/60 p-4 shadow-[0_18px_45px_rgba(36,48,38,0.06)] ${cardOffsets[index % cardOffsets.length]}`}
        >
          <div className="aspect-[4/5] animate-pulse rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(106,117,87,0.12),rgba(229,177,100,0.18))]" />
          <div className="mt-4 h-4 w-2/3 animate-pulse rounded-full bg-sage/12" />
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded-full bg-gold/16" />
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadGallery() {
      setLoading(true);
      setErrorMessage('');

      try {
        const { response, data: payload } = await fetchApiJson<GalleryResponse>('/api/gallery');

        if (!active) {
          return;
        }

        setConfigured(payload.configured);
        setImages(payload.images || []);

        if (!response.ok) {
          setErrorMessage(payload.message || 'Unable to load the gallery right now.');
        }
      } catch (error) {
        if (!active) {
          return;
        }

        setConfigured(true);
        setImages([]);
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load the gallery right now.',
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      active = false;
    };
  }, []);

  const featuredImage = images[0];
  const galleryImages = featuredImage ? images.slice(1) : images;

  return (
    <div className="page-shell overflow-hidden px-6 pb-28 pt-36 md:px-10 lg:px-14">
      <section className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.4rem] border border-sage/10 bg-[linear-gradient(135deg,rgba(36,48,38,0.96),rgba(81,92,67,0.88))] px-8 py-12 text-bg-warm shadow-[0_30px_90px_rgba(36,48,38,0.16)] md:px-12 md:py-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,177,100,0.28),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_24%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-bg-warm/15 bg-bg-warm/8 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-gold-light">
                <ImageIcon size={14} />
                Live Gallery
              </span>
              <h1 className="max-w-4xl text-5xl font-serif leading-[0.98] md:text-7xl">
                A living gallery of <span className="italic text-gold-light">beautiful gatherings</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-bg-warm/76 md:text-lg">
                These images are loaded from ImageKit so the page can stay current as your event library grows. Use this page to showcase venue styling, celebrations, and the atmosphere guests can expect at Ever After.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {quickStats.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-bg-warm/10 bg-bg-warm/8 p-5 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold-light/80">{item.label}</p>
                  <p className="mt-2 text-lg font-serif text-bg-warm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        {loading ? (
          <div className="editorial-panel rounded-[2rem] p-8 md:p-10">
            <div className="mb-8 flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sage/80">
              <LoaderCircle size={16} className="animate-spin" />
              Loading gallery
            </div>
            <GallerySkeleton />
          </div>
        ) : null}

        {!loading && errorMessage ? (
          <div className="editorial-panel rounded-[2rem] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Gallery status</p>
            <h2 className="mt-4 text-3xl font-serif">The gallery needs attention</h2>
            <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
              {errorMessage}
              {!configured ? ' The page is ready, but the ImageKit server credentials need to be available when the app runs.' : ''}
            </p>
          </div>
        ) : null}

        {!loading && !errorMessage && featuredImage ? (
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.a
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              href={featuredImage.url}
              target="_blank"
              rel="noreferrer"
              className="group editorial-panel overflow-hidden rounded-[2rem] p-4"
            >
              <div className="relative overflow-hidden rounded-[1.65rem]">
                <Image
                  src={featuredImage.url}
                  alt={featuredImage.alt}
                  width={featuredImage.width || 1600}
                  height={featuredImage.height || 1100}
                  responsive={false}
                  loading="eager"
                  className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_32%,rgba(36,48,38,0.68))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-bg-warm md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold-light/90">Featured moment</p>
                  <h2 className="mt-3 text-3xl font-serif md:text-4xl">{featuredImage.alt}</h2>
                  <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-bg-warm/78">
                    Open the original ImageKit asset to view the full photo. This lead frame sets the tone for the rest of the gallery.
                  </p>
                </div>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="editorial-panel rounded-[2rem] p-8 md:p-10"
            >
              <span className="text-xs uppercase tracking-[0.24em] text-gold">Gallery Notes</span>
              <h2 className="mt-4 text-4xl font-serif leading-tight">
                Styled for a premium first impression
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink/70">
                The gallery is intentionally spacious and editorial so your photography does most of the talking. As you add or replace assets in ImageKit, this page updates without changing the frontend layout.
              </p>

              <div className="mt-8 grid gap-4">
                {featuredImage.tags.length > 0 ? (
                  <div className="rounded-[1.5rem] border border-sage/10 bg-white/70 p-5">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-sage/70">Tags</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featuredImage.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink/72">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="rounded-[1.5rem] border border-sage/10 bg-white/70 p-5">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-sage/70">What next</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/68">
                    If you want stricter curation later, the API can be narrowed to a folder or tag-based selection so only approved campaign images appear here.
                  </p>
                </div>

                <Link
                  to="/bookings"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-6 py-4 text-xs uppercase tracking-[0.24em] text-bg-warm transition-colors duration-300 hover:bg-gold hover:text-ink"
                >
                  Book Your Event
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}

        {!loading && !errorMessage && galleryImages.length > 0 ? (
          <div className="mt-10">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.24em] text-gold">More highlights</span>
                <h2 className="mt-3 text-4xl font-serif">Venue details, celebrations, and atmosphere</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-ink/62">
                Each card links to the source file in ImageKit, making it easy to review the original assets while keeping the on-page experience light and polished.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {galleryImages.map((image, index) => (
                <motion.a
                  key={image.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.04 * Math.min(index, 8) }}
                  href={image.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group overflow-hidden rounded-[1.75rem] border border-sage/10 bg-white/70 p-4 shadow-[0_18px_45px_rgba(36,48,38,0.06)] transition-transform duration-500 hover:-translate-y-1 ${cardOffsets[index % cardOffsets.length]}`}
                >
                  <div className="overflow-hidden rounded-[1.35rem]">
                    <Image
                      src={image.thumbnailUrl || image.url}
                      alt={image.alt}
                      width={image.width || 1200}
                      height={image.height || 900}
                      responsive={false}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-serif leading-tight text-ink">{image.alt}</h3>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-sage/70">
                        {image.filePath || 'ImageKit media library'}
                      </p>
                    </div>
                    <ArrowRight size={16} className="mt-1 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}