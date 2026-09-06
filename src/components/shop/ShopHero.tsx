const BANNER_IMAGE_SRC = '/hero-illustration.webp';
const HERO_IMAGE_CROP_POSITION = 'object-[15%_70%]';

export function ShopHero() {
  return (
    <div className="relative mx-auto flex w-full max-w-[500px] aspect-[532/354] items-center justify-center overflow-hidden">
      <img
        src={BANNER_IMAGE_SRC}
        alt="Shop today, pay later using mutual funds — no-cost EMIs, no credit score required"
        className={`h-full w-[109.44%] object-cover ${HERO_IMAGE_CROP_POSITION}`}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.style.display = 'none';
          const placeholder = img.nextElementSibling as HTMLElement | null;
          if (placeholder) placeholder.style.display = 'flex';
        }}
      />
      <div className="hidden h-full w-[109.44%] items-center justify-center bg-primary text-sm text-white/60">
        Banner image not found at {BANNER_IMAGE_SRC}
      </div>
    </div>
  );
}
