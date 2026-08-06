import { describe, expect, it } from "vitest";
import {
  isAcceptableFeaturedImage,
  isRenderableBody,
  isSafeBodyHref,
  isValidBodyImage,
  isValidBodyVideo,
} from "@/sanity/bodyGuards";
import {
  isVideoProvider,
  toVideoEmbedUrl,
} from "../../sanity/validation/videoEmbed";

/**
 * Provere tela članka i ugrađenog medija.
 *
 * Sve je fail-closed: kad podatak nije očigledno ispravan, odgovor je „ne“.
 * Podaci su sintetički — nijedan stvarni članak, projekat ni video.
 */

const TEXT_BLOCK = {
  _type: "block",
  style: "normal",
  children: [{ _type: "span", text: "Rečenica." }],
};

describe("isSafeBodyHref", () => {
  it("prihvata internu putanju", () => {
    expect(isSafeBodyHref("/teme/test-tema")).toBe(true);
  });

  it("prihvata http i https", () => {
    expect(isSafeBodyHref("https://primer.rs/stranica")).toBe(true);
    expect(isSafeBodyHref("http://primer.rs/stranica")).toBe(true);
  });

  it("odbija protokol-relativnu adresu", () => {
    // „//host“ nasleđuje protokol stranice i vodi na spoljni host.
    expect(isSafeBodyHref("//primer.rs")).toBe(false);
  });

  it("odbija opasne i besmislene šeme", () => {
    for (const href of [
      "javascript:alert(1)",
      "data:text/html,<script>",
      "file:///C:/tajna.txt",
      "mailto:neko@primer.rs",
      "relativna/putanja",
      "",
      "   ",
    ]) {
      expect(isSafeBodyHref(href)).toBe(false);
    }
  });

  it("odbija vrednosti koje nisu string", () => {
    for (const href of [undefined, null, 42, {}, ["/teme"]]) {
      expect(isSafeBodyHref(href)).toBe(false);
    }
  });
});

describe("toVideoEmbedUrl", () => {
  it("prepoznaje samo dozvoljene provajdere", () => {
    expect(isVideoProvider("youtube")).toBe(true);
    expect(isVideoProvider("vimeo")).toBe(true);
    expect(isVideoProvider("dailymotion")).toBe(false);
    expect(isVideoProvider(undefined)).toBe(false);
  });

  it("sastavlja YouTube adresu iz identifikatora, bez kolačića", () => {
    expect(
      toVideoEmbedUrl("youtube", "https://www.youtube.com/watch?v=abcdefghij1"),
    ).toBe("https://www.youtube-nocookie.com/embed/abcdefghij1");

    expect(toVideoEmbedUrl("youtube", "https://youtu.be/abcdefghij1")).toBe(
      "https://www.youtube-nocookie.com/embed/abcdefghij1",
    );
  });

  it("sastavlja Vimeo adresu iz identifikatora, uz „do not track“", () => {
    expect(toVideoEmbedUrl("vimeo", "https://vimeo.com/123456789")).toBe(
      "https://player.vimeo.com/video/123456789?dnt=1",
    );
  });

  it("ne propušta parametre iz unete adrese u ugrađenu adresu", () => {
    const embed = toVideoEmbedUrl(
      "youtube",
      "https://www.youtube.com/watch?v=abcdefghij1&autoplay=1&list=zlo",
    );

    expect(embed).toBe("https://www.youtube-nocookie.com/embed/abcdefghij1");
    expect(embed).not.toContain("autoplay");
    expect(embed).not.toContain("list");
  });

  it("odbija host koji nije na listi, i kad provajder odgovara", () => {
    expect(
      toVideoEmbedUrl(
        "youtube",
        "https://youtube.com.napadac.rs/watch?v=abcdefghij1",
      ),
    ).toBeNull();
    expect(
      toVideoEmbedUrl("vimeo", "https://vimeo.napadac.rs/123456789"),
    ).toBeNull();
  });

  it("odbija neusklađen par provajder–adresa", () => {
    expect(toVideoEmbedUrl("vimeo", "https://youtu.be/abcdefghij1")).toBeNull();
    expect(
      toVideoEmbedUrl("youtube", "https://vimeo.com/123456789"),
    ).toBeNull();
  });

  it("odbija identifikator pogrešnog oblika", () => {
    expect(toVideoEmbedUrl("youtube", "https://youtu.be/prekratak")).toBeNull();
    expect(toVideoEmbedUrl("vimeo", "https://vimeo.com/nijebroj")).toBeNull();
  });

  it("odbija opasne šeme i besmislen ulaz", () => {
    expect(toVideoEmbedUrl("youtube", "javascript:alert(1)")).toBeNull();
    expect(toVideoEmbedUrl("youtube", "")).toBeNull();
    expect(toVideoEmbedUrl(undefined, undefined)).toBeNull();
  });
});

describe("isValidBodyImage", () => {
  it("traži asset i neprazan opis", () => {
    expect(
      isValidBodyImage({
        asset: { _ref: "image-abc-100x100-png" },
        alt: "Opis",
      }),
    ).toBe(true);
  });

  it("odbija sliku bez opisa", () => {
    expect(isValidBodyImage({ asset: { _ref: "image-abc" }, alt: "" })).toBe(
      false,
    );
    expect(isValidBodyImage({ asset: { _ref: "image-abc" } })).toBe(false);
  });

  it("odbija sliku bez asseta", () => {
    expect(isValidBodyImage({ alt: "Opis" })).toBe(false);
    expect(isValidBodyImage({ asset: {}, alt: "Opis" })).toBe(false);
  });
});

describe("isAcceptableFeaturedImage", () => {
  const FEATURED = {
    asset: { _id: "image-abc-1600x900-jpg" },
    alt: "Sintetički opis naslovne slike",
  };

  it("odsutna naslovna slika je dozvoljena", () => {
    expect(isAcceptableFeaturedImage(undefined)).toBe(true);
    expect(isAcceptableFeaturedImage(null)).toBe(true);
  });

  it("potpuna naslovna slika prolazi", () => {
    expect(isAcceptableFeaturedImage(FEATURED)).toBe(true);
    expect(
      isAcceptableFeaturedImage({
        ...FEATURED,
        caption: "Potpis.",
        credit: "Izvor",
        crop: { top: 0.1, bottom: 0.1, left: 0, right: 0 },
        hotspot: { x: 0.5, y: 0.5, width: 0.5, height: 0.5 },
      }),
    ).toBe(true);
  });

  it("prisutna slika bez asseta pada", () => {
    expect(isAcceptableFeaturedImage({ alt: "Opis" })).toBe(false);
    expect(isAcceptableFeaturedImage({ asset: {}, alt: "Opis" })).toBe(false);
    expect(isAcceptableFeaturedImage({ asset: null, alt: "Opis" })).toBe(false);
  });

  it("prisutna slika bez alt teksta pada", () => {
    expect(isAcceptableFeaturedImage({ ...FEATURED, alt: "" })).toBe(false);
    expect(isAcceptableFeaturedImage({ ...FEATURED, alt: "   " })).toBe(false);
    expect(isAcceptableFeaturedImage({ ...FEATURED, alt: undefined })).toBe(
      false,
    );
  });

  it("prisutna ali malformirana vrednost pada", () => {
    // Prazan objekat, pogrešan tip, lista — ništa od toga nije „nema slike“.
    for (const value of [{}, "image-abc", 42, [], true]) {
      expect(isAcceptableFeaturedImage(value)).toBe(false);
    }
  });
});

describe("isValidBodyVideo", () => {
  const VIDEO = {
    provider: "youtube",
    url: "https://youtu.be/abcdefghij1",
    title: "Naslov videa",
    transcript: "Tekst transkripta.",
  };

  it("prihvata potpun i bezbedan video", () => {
    expect(isValidBodyVideo(VIDEO)).toBe(true);
  });

  it("odbija video bez transkripta", () => {
    expect(isValidBodyVideo({ ...VIDEO, transcript: "  " })).toBe(false);
    expect(isValidBodyVideo({ ...VIDEO, transcript: undefined })).toBe(false);
  });

  it("odbija video bez naslova", () => {
    expect(isValidBodyVideo({ ...VIDEO, title: "" })).toBe(false);
  });

  it("odbija video sa nedozvoljenom adresom", () => {
    expect(
      isValidBodyVideo({
        ...VIDEO,
        url: "https://napadac.rs/embed/abcdefghij1",
      }),
    ).toBe(false);
  });
});

describe("isRenderableBody", () => {
  it("prihvata telo sa poznatim blokovima", () => {
    expect(
      isRenderableBody([
        TEXT_BLOCK,
        {
          _type: "imageWithCaption",
          asset: { _ref: "image-abc" },
          alt: "Opis",
        },
        {
          _type: "videoEmbed",
          provider: "vimeo",
          url: "https://vimeo.com/123456789",
          title: "Naslov",
          transcript: "Transkript.",
        },
      ]),
    ).toBe(true);
  });

  it("odbija prazno telo i telo koje nije lista", () => {
    expect(isRenderableBody([])).toBe(false);
    expect(isRenderableBody(null)).toBe(false);
    expect(isRenderableBody("tekst")).toBe(false);
  });

  it("odbija CELO telo zbog jednog nepoznatog bloka", () => {
    // Tiho preskakanje bi značilo da tekst izgubi deo sadržaja neprimetno.
    expect(isRenderableBody([TEXT_BLOCK, { _type: "priceTable" }])).toBe(false);
  });

  it("odbija telo sa `h1` stilom", () => {
    expect(isRenderableBody([{ ...TEXT_BLOCK, style: "h1" }])).toBe(false);
  });

  it("odbija blok sa nebezbednim linkom u anotaciji", () => {
    expect(
      isRenderableBody([
        {
          ...TEXT_BLOCK,
          markDefs: [{ _key: "a", _type: "link", href: "javascript:alert(1)" }],
        },
      ]),
    ).toBe(false);
  });

  it("odbija blok sa nepoznatom anotacijom", () => {
    expect(
      isRenderableBody([
        { ...TEXT_BLOCK, markDefs: [{ _key: "a", _type: "cena", href: "/x" }] },
      ]),
    ).toBe(false);
  });

  it("odbija telo sa neispravnim medijem", () => {
    expect(
      isRenderableBody([
        TEXT_BLOCK,
        { _type: "imageWithCaption", asset: { _ref: "image-abc" } },
      ]),
    ).toBe(false);
  });
});
