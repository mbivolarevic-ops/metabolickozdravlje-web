# 05 — Komercijalna i marketinška strategija

**Verzija 1.0** · 17. avgust 2026.
**Status:** Prihvaćeno (izričito odobrio vlasnik projekta)
**Nadređeni dokument:** `docs/00-CMZ-OPERATING-SYSTEM.md` · **Odluka:** [ADR-0008](adr/ADR-0008-ethical-commerce-consent-and-sponsorship.md)

> **Ovaj dokument je jedinstveni izvor istine za komercijalni model.** Kada se
> bilo koji drugi dokument razilazi sa njim oko prihoda, marketinga ili
> saglasnosti, važi ovaj — osim kada je u sukobu sa `docs/00`, koji ostaje ustav.

> ⛔ **Ovo je strategija, ne dozvola za implementaciju.** Nijedan checkout, forma,
> pixel, pravni tekst ni kampanja se ne prave na osnovu ovog dokumenta. Svaki
> element traži zasebno odobrenje — vidi „Obavezne spoljne kapije".

---

## 1. Cilj i ekonomika

| Stavka | Vrednost |
|---|---|
| Cena vodiča | **1.999 RSD** |
| Ciljni bruto prihod | **400.000 RSD mesečno do 12. meseca** |
| **Potrebno prodaja mesečno** | **201** |

Računica: `400.000 / 1.999 = 200,1`, pa je najmanji ceo broj koji dostiže cilj
**201**. Kontrola: `201 × 1.999 = 401.799 RSD` (cilj dostignut), `200 × 1.999 =
399.800 RSD` (ispod cilja). Broj nije zaokružen naviše iz opreza nego zato što
200 matematički ne stiže do cilja.

**Šta 201 prodaja mesečno znači u praksi:** oko 7 prodaja dnevno, svakog dana.
To nije broj koji donosi jedan viralni tekst, nego posledica sistema koji radi
svakodnevno. Zato je težište na sadržaju koji se akumulira, ne na kampanji koja
se potroši.

### Jedinična ekonomika

| Veličina | Vrednost | Napomena |
|---|---|---|
| Bruto po prodaji | 1.999 RSD | pre provizija i poreza |
| Ciljni CAC | **600–700 RSD** | vidi KPI |
| Ciljni ROAS | **≥ 3** nakon optimizacije | vidi KPI |

⚠️ **Neto marža nije izračunata u ovom dokumentu.** Provizija banke, porez i
troškovi alata nisu poznati bez zvanične merchant dokumentacije i računovodstvene
potvrde. Svaki broj o neto marži bio bi izmišljen, pa ga ovde nema — izračunava
se kada podaci postoje.

---

## 2. Flagship proizvod i pozicioniranje

**Jedan vodič, ne katalog.** Drugi proizvod traži novu odluku vlasnika
(ADR-0008).

| Stavka | Vrednost |
|---|---|
| Autor | dr Snežana Bivolarević, specijalista opšte medicine i subspecijalista bolesti zavisnosti |
| Planirani institucionalni recenzent | Naučni odbor Adria LifeMed Association (ALMA) |
| Prodavac | Edukativni Centar CMZ PR Snežana Bivolarević, PIB 115841920, MB 68681375 |

⛔ **ALMA se ne pominje javno** — ni u marketingu, ni u vodiču, ni na sajtu — dok
ne postoje dokumentovana saglasnost i **ime odgovorne osobe** koja recenziju
potpisuje. Institucija bez imenovanog potpisnika nije recenzent, a „planirano"
nije „potvrđeno".

### Pozicioniranje

Vodič se prodaje kao **prošireni praktični materijal**, ne kao pristup
informaciji. Ono što čitaocu treba da razume nalaz ili da zna kada da se javi
lekaru ostaje besplatno (ADR-0008, „Šta se prodaje, a šta ostaje besplatno").

Obećanje je **razumevanje i bolji razgovor sa lekarom** — isto ono iz `docs/00`
§1.1. Nije ishod, nije rezultat, nije promena nalaza.

| Sme se tvrditi | Ne sme se tvrditi |
|---|---|
| objašnjava šta nalaz znači | snižava šećer, mršavi, leči |
| priprema pitanja za lekara | zamenjuje lekara ili pregled |
| napisao lekar, uz navedene izvore | „dokazano", „garantovano", „jedini način" |
| praktičan i upotrebljiv | daje plan terapije ili ishrane za pojedinca |

Svaka tvrdnja u marketingu koja dodiruje zdravstveni ishod je **medicinska
tvrdnja** i traži imenovanog autora i recenzenta (ADR-0008, Medicinske kapije).

---

## 3. Široki naspram fokusiranog marketinškog ugla

Dva ugla se ne biraju jednom zauvek — koriste se za različite svrhe.

| | **Široki ugao** | **Fokusirani ugao** |
|---|---|---|
| Poruka | metaboličko zdravlje, razumljivo i bez osude | jedno konkretno pitanje (npr. „šta znači povišen nalaz") |
| Publika | velika, slabo definisana | ljudi sa konkretnim povodom |
| Očekivani CAC | viši | niži |
| Rizik | poruka se rasplinjuje | ugao klizne ka zdravstvenom stanju, što platforme ograničavaju |
| Uloga | prepoznatljivost i vrh levka | konverzija |

**Pravilo:** fokusirani ugao se formuliše oko **pitanja i povoda**, nikada oko
pripisanog zdravstvenog stanja. „Dobili ste nalaz koji ne razumete" je povod.
„Imate dijabetes" je pripisano stanje — i po platformskim pravilima i po
`docs/00` to je zabranjeno.

---

## 4. Sadržajni sistem

Sadržaj je motor, oglas je pojačalo. Redosled se ne obrće: kampanja koja vodi na
tanak sadržaj troši budžet i poverenje istovremeno.

| Sloj | Uloga | Veza sa prodajom |
|---|---|---|
| Članci po temama | odgovaraju na jedno pitanje, besplatno | grade poverenje i organski dolazak |
| Tema (klaster) | okuplja pitanja u celinu | dubina koja se ne može kopirati |
| Vodič | prošireni praktični materijal | jedini plaćeni element |
| Newsletter | nastavak razgovora, dobrovoljan | zadržavanje, ne pritisak |

Uređivački postupak se **ne menja** zbog prodaje: imenovan autor, imenovan
recenzent, izvori, datum provere (`docs/03`). Komercijalni cilj nije razlog da se
objavi tekst koji nije prošao proveru — to je tačno ona vrsta ustupka koju
`docs/00` §4.5 imenuje kao najverovatniji uzrok propasti.

---

## 5. Ograničenja zdravstvenog targetiranja (Meta / Google)

⚠️ **Tačan tekst pravila mora se pročitati iz zvanične dokumentacije platforme
pre pokretanja ijedne kampanje.** Ovde se navodi princip po kojem se planira, ne
citat politike — politika se menja i citat iz sećanja bi bio netačan.

Princip koji važi na obe platforme i po kojem se planira:

1. **Ciljanje po pripisanom zdravstvenom stanju se ne koristi.** Ni po
   interesovanju koje implicira dijagnozu, ni po ponašanju koje je nagoveštava.
2. **Kreativa ne sme da pripiše stanje čitaocu.** „Vi imate…", „Ako bolujete
   od…" — ne. Formulacija ostaje na pitanju i povodu.
3. **Remarketing zasnovan na zdravstvenom ponašanju se ne koristi**, uključujući
   liste izvedene iz posećenih zdravstvenih tema.
4. **Personalizovano oglašavanje na osnovu zdravstvenih podataka se ne koristi**,
   jer se ti podaci uopšte ne prikupljaju (ADR-0008).

**Posledica za rad:** kampanje se planiraju kao **široko ciljanje uz jaku
kreativu**, ne kao usko zdravstveno ciljanje. To podiže očekivani CAC i to je
uračunato u KPI opseg.

⛔ Pixel, conversion tracking i svaki oblik praćenja traže **zasebno tehničko i
privacy odobrenje** (ADR-0008). Ovaj dokument ih ne uvodi.

---

## 6. Newsletter

| Pravilo | Sprovođenje |
|---|---|
| Saglasnost je **zasebna i neoznačena** | bez unapred štikliranog polja |
| Kupac se **nikada ne prijavljuje automatski** | kupovina nije pristanak na marketing |
| Transakcijska pošta odvojena od marketinške | račun i link za preuzimanje idu i onome ko nije pretplatnik |
| Odjava je jednostavna i vidljiva | u svakoj poruci |
| Nijedan zdravstveni podatak | ni u prijavi, ni u segmentaciji |

Segmentacija je dozvoljena **samo po ponašanju u odnosu na sadržaj** (šta je
otvoreno, šta pročitano), nikada po deklarisanom ili pretpostavljenom
zdravstvenom stanju.

---

## 7. B2B i sponzorstva

### B2B Patient Support programi

Zaseban komercijalni tok. Ne meša se sa potrošačkom prodajom i **ne koristi
podatke kupaca vodiča**. Svaki program je zasebna odluka vlasnika.

### Sponzorisani projekti

Dozvoljeni, uz dva uslova koja se ne ublažavaju:

1. **vidljiva oznaka** pre nego što korisnik pročita sadržaj, ne u fusnoti;
2. **puna urednička kontrola CMZ-a** — sponzor ne određuje medicinski zaključak,
   nema pravo veta i ne odobrava tekst pre objave.

Puna tabela „sme / ne sme" je u ADR-0008, sekcija „Urednička nezavisnost". Ako
sponzor traži izmenu zaključka, saradnja se prekida i to se ne prećutkuje.

---

## 8. Plan za 90 dana

Plan opisuje **redosled**, ne datume isporuke. Svaka stavka koja dodiruje kod,
podatke ili pravni sloj i dalje čeka zasebno odobrenje.

### Dani 1–30 — temelj

- Vodič napisan i **stručno recenziran**; bez recenzenta nema ni prodaje ni
  najave.
- Pravni tekstovi pripremljeni za pregled: uslovi korišćenja, politika
  privatnosti, politika refundacije.
- Merchant zahtevi pročitani iz zvanične Raiffeisen dokumentacije.
- Objavljen prvi skup članaka koji nose organski dolazak.

### Dani 31–60 — infrastruktura, uz odobrenja

- Tehnička priprema prodaje i newslettera — **tek po odobrenju** privacy i
  tehničkog pristupa.
- Priprema kreativa i landing poruke, u granicama iz sekcije 5.
- Merenje bazne linije: organski dolazak i ponašanje na stranici.

### Dani 61–90 — kontrolisano lansiranje

- Ograničen test kampanje sa malim budžetom; cilj je izmeriti CAC, ne skalirati.
- Optimizacija kreative i landing poruke prema izmerenom, ne prema pretpostavci.
- Odluka o skaliranju donosi se tek kada je CAC u opsegu i ROAS stabilan.

⛔ Javno lansiranje i uklanjanje `noindex` **nisu deo ovog plana** — to su
posebne kapije (ADR-0006, ADR-0008).

---

## 9. KPI

| Pokazatelj | Cilj | Napomena |
|---|---|---|
| Prodaja mesečno | **201** | do 12. meseca |
| Bruto prihod mesečno | **400.000 RSD** | 201 × 1.999 = 401.799 |
| **CAC** | **600–700 RSD** | trošak sticanja jednog kupca |
| **ROAS** | **≥ 3** nakon optimizacije | ne očekuje se odmah |

**ROAS se ne meri prvog dana.** Opseg važi *nakon* faze optimizacije iz plana
(dani 61–90). Rani brojevi su podatak za učenje, ne razlog za odluku o skaliranju.

**KPI koji nadjačava ostale:** poverenje. `docs/00` §5 i `CLAUDE.md` §4 ostaju na
snazi — saobraćaj i prodaja koji rastu uz pad poverenja znak su da nešto radimo
pogrešno, a ne uspeh.

---

## 10. Obavezne spoljne kapije

Nijedna stavka ispod se ne izvodi na osnovu ovog dokumenta. Svaka traži zasebno
odobrenje, a neke i spoljni pregled.

| Kapija | Ko odlučuje | Bez čega se ne kreće |
|---|---|---|
| Pravni tekstovi | vlasnik + pravni savetnik | uslovi, privatnost, refundacija |
| Privacy pristup | vlasnik + pravni savetnik | pre bilo koje forme |
| Merchant integracija | vlasnik + banka | zvanična Raiffeisen dokumentacija |
| Analytics, cookies, pixels | vlasnik, zasebno tehničko i privacy odobrenje | ADR-0008 |
| Payment secrets | vlasnik | nikada u repozitorijumu |
| Medicinski sadržaj vodiča | stručni urednik | imenovan autor i recenzent |
| Marketinška medicinska tvrdnja | stručni urednik | ista provera kao za članak |
| Atribucija ALMA-e | ALMA + vlasnik | saglasnost i ime odgovorne osobe |
| Production sadržaj, deployment, DNS | vlasnik | posebne launch kapije |
| Uklanjanje `noindex` | vlasnik, posebnim PR-om | ADR-0006 §2–3 |

---

## Šta ovaj dokument namerno NE odlučuje

- Neto maržu i poresku obradu — nema potvrđenih ulaznih podataka.
- Tekst vodiča, njegovu strukturu i medicinski sadržaj (`docs/03`).
- Tehničku arhitekturu prodaje (`docs/01`, uz zasebno odobrenje).
- Konkretne kanale, budžete i kreative — to su operativne odluke vlasnika.
- Bilo šta što bi promenilo medicinske, produkcione ili launch kapije.
