/**
 * The Shop page banner — a single image (badge, headline, subtext, and
 * product illustration are all baked into the image itself, so no text is
 * rendered here). Wrapper fixed at 532x354, centered horizontally via
 * mx-auto (as a block) with the image centered inside it via flex
 * justify-center.
 *
 * CROP BIAS & Y-AXIS POSITIONING:
 * Which part of the image survives the crop is controlled by HERO_IMAGE_CROP_POSITION.
 * Note: object-fit: cover scales the source image (~1.499:1) to cover the <img> box.
 * The <img> box is set to 582.2px wide (for horizontal bleed) and 354px high (matching
 * the container height). Because 582.2 / 354 = 1.645 aspect ratio, covering the width
 * causes the image height to scale to ~388.4px inside a 354px box.
 * This gives ~34.4px of vertical sliding room, allowing object-position Y-axis
 * percentages (e.g. object-[15%_83%], object-top, object-bottom) to smoothly shift
 * the image vertically.
 */
const BANNER_IMAGE_SRC = '/hero-illustration.webp';
// const HERO_IMAGE_CROP_POSITION = 'object-center';
const HERO_IMAGE_CROP_POSITION = 'object-[15%_70%]';
export function ShopHero() {
  return (
    <div className="overflow-hidden w-[532px] h-[354px] flex justify-center items-center mx-auto">
      <img
        src={BANNER_IMAGE_SRC}
        alt="Shop today, pay later using mutual funds — no-cost EMIs, no credit score required"
        className={`w-[582.2px] h-[354px] object-cover ${HERO_IMAGE_CROP_POSITION}`}
        onError={(e) => {
          // Fails gracefully if the image hasn't been added yet — hides
          // the broken-image icon instead of showing it, and leaves a
          // placeholder box the same shape so layout doesn't jump.
          const img = e.currentTarget as HTMLImageElement;
          img.style.display = 'none';
          const placeholder = img.nextElementSibling as HTMLElement | null;
          if (placeholder) placeholder.style.display = 'flex';
        }}
      />
      {/* Fallback shown only if the image fails to load — keeps the same
          fixed size/shape so the page doesn't jump once the real image is added. */}
      <div className="hidden w-[582.2px] h-[354px] bg-primary items-center justify-center text-white/60 text-sm">
        Banner image not found at {BANNER_IMAGE_SRC}
      </div>
    </div>
  );
}
