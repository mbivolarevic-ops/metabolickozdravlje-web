## Summary

<!-- Kratak opis šta ovaj PR menja i zašto. Jedna do tri rečenice. -->

## Changes

<!-- Lista konkretnih izmena. Jedna stavka po logičkoj promeni. -->

-

## Verification

<!-- Kako je promena proverena. Navesti rezultate lokalnih provera. -->

- `lint`:
- `typecheck`:
- `test`:
- `build`:

## Open decisions

<!-- Šta traži odluku vlasnika ili stručnog urednika, i šta je ostalo otvoreno. Ako ničega nema — napiši „Nema". -->

## Retrospective

<!-- Obavezno za veće zadatke (CLAUDE.md, sekcija 20). Za manje: „Nije primenljivo". -->

**Šta je bilo teže nego što je izgledalo**

**Gde sam morao da pogađam**

**Šta bi sledeći agent trebalo da zna**

**Predlog izmene pravila**

**Šta sam umalo pogrešio**

## Checklist

- [ ] Promena je ograničena na dogovoreni obim.
- [ ] Pročitani su relevantni projektni dokumenti (`docs/00`, `CLAUDE.md`, ciljani dokument).
- [ ] Nisu dodate tajne ni stvarne `.env` vrednosti.
- [ ] `lint` prolazi lokalno.
- [ ] `typecheck` prolazi lokalno.
- [ ] Testovi prolaze lokalno.
- [ ] Production `build` prolazi lokalno.
- [ ] Medicinske tvrdnje su proverene, ili promena ne sadrži medicinski sadržaj.
- [ ] SEO i metadata posledice su proverene, ili nisu primenljive.
- [ ] Nije izvršen deployment.
- [ ] Nisu menjani foundation dokumenti (`docs/`, `CLAUDE.md`) bez izričitog odobrenja.
- [ ] Ako je korišćen autonomni tok, početni zahtev vlasnika izričito odobrava ovaj ograničeni tehnički obim i merge.
- [ ] PR ima bazu `main`, nema konflikt, ažuran je i nema nerešenih review zahteva ili razgovora.
- [ ] Svi required GitHub checks su zeleni; nije korišćen force push, admin bypass niti izmena branch protection/ruleset zahteva.
- [ ] Posle merge-a briše se samo sopstvena potvrđeno mergovana grana, a lokalni `main` se ff-only usklađuje i potvrđuje kao čist 0/0.
