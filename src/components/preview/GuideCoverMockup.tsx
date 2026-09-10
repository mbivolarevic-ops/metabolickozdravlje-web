import { GUIDE_STATUS, GUIDE_WORKING_TITLE } from "@/site/preview";

/**
 * Maketa korica vodiča — čist CSS, bez ijedne slike.
 *
 * ⛔ Nema stock fotografije, nema ilustracije i nema lažnog bedža koji liči na
 * sertifikat (ADR-0002, odluke #5 i #6; docs/02 §2.3). Korice su tipografija i
 * dve površine, jer je to jedino što danas pošteno možemo da prikažemo — pravi
 * dizajn korica ne postoji.
 *
 * `aria-hidden` je namerno: radni naslov i status stoje kao pravi tekst u
 * heroju stranice. Da ih maketa ponovi, čitač ekrana bi ih izgovorio dvaput,
 * a slika koja ništa ne dodaje značenju je dekoracija.
 *
 * Server komponenta, bez klijentskog JS-a i bez animacije.
 */
export function GuideCoverMockup() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[17rem] sm:max-w-[19rem]"
    >
      {/*
       * Odnos stranica 1 : 1.4 je približno A-format. `aspect-[5/7]` ga daje
       * bez fiksne visine, pa se korice skaliraju i pri uvećanom sistemskom
       * fontu, umesto da se preliju.
       */}
      <div className="relative aspect-[5/7] overflow-hidden rounded-md bg-primary shadow-lg">
        {/* Hrbat: tanka tamnija traka uz levu ivicu. */}
        <div className="absolute inset-y-0 left-0 w-3 bg-black/20" />

        {/* Mek prelaz, da površina ne bude ravna. */}
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
          <div>
            <p className="font-sans text-xs font-semibold tracking-widest text-on-primary/80 uppercase">
              {GUIDE_STATUS}
            </p>
            <p className="mt-6 font-sans text-xl leading-tight font-semibold text-balance text-on-primary sm:text-2xl">
              {GUIDE_WORKING_TITLE}
            </p>
          </div>

          <div>
            <div className="h-px w-12 bg-on-primary/40" />
            <p className="mt-3 font-sans text-sm text-on-primary/80">
              Centar za metaboličko zdravlje
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-sans text-sm text-text-muted">
        Radna maketa korica
      </p>
    </div>
  );
}
