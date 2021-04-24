# Kalkulator terminów

Kalkulator jest aplikacją webową służącą liczeniu daty minięcia terminu według zasad określonych w polskim prawie.

Podstawą prawną jest Art. 57, par. 1 - 4 ustawy z dnia 14 czerwca 1960 r. Kodeks postępowania administracyjnego (t.j. Dz. U. z 2020 r. poz. 256 z późn. zm.). Bardzo podobne zasady obliczania terminów obowiązują w innych gałęziach prawa - cywilnym i karnym w związku z tym powinny być one możliwe do stosowania zamiennie.

Kalkulator nie daje gwarancji poprawności danego terminu ale zdecydowania pomaga w nauce, zrozumieniu i ew. szybszym sprawdzeniu aniżeli ręczne liczenie takiej daty.

Data początkowa terminu to zazwyczaj termin doręczenia, data, od której liczy się termin.

Termin to długość określona w konkretnych przepisie ustawy, np. termin na odwołanie, zażalenie, wniesienie skargi itd.

## Brzmienie przepisu, zasada działania

Kalkulator został przygotowany na początku 2021 roku z ówczesnym poniższym brzmieniem przepisu KPA.

```
Art.  57.
§  1. Jeżeli początkiem terminu określonego w dniach jest pewne zdarzenie, przy obliczaniu tego terminu nie uwzględnia się dnia, w którym zdarzenie nastąpiło. Upływ ostatniego z wyznaczonej liczby dni uważa się za koniec terminu.
§  2. Terminy określone w tygodniach kończą się z upływem tego dnia w ostatnim tygodniu, który nazwą odpowiada początkowemu dniowi terminu.
§  3. Terminy określone w miesiącach kończą się z upływem tego dnia w ostatnim miesiącu, który odpowiada początkowemu dniowi terminu, a gdyby takiego dnia w ostatnim miesiącu nie było - w ostatnim dniu tego miesiąca.
§  3a. Terminy określone w latach kończą się z upływem tego dnia w ostatnim roku, który odpowiada początkowemu dniowi terminu, a gdyby takiego dnia w ostatnim roku nie było - w dniu poprzedzającym bezpośrednio ten dzień.
§  4. Jeżeli koniec terminu do wykonania czynności przypada na dzień uznany ustawowo za wolny od pracy lub na sobotę, termin upływa następnego dnia, który nie jest dniem wolnym od pracy ani sobotą.
```

## Technologia

Logika obliczania oraz widok kalkulatora są napisane w TypeScript.

Wykorzystane są biblioteki z `npm` do obsługi dat i dni wolnych od pracy - `date-fns`, `date-holidays`.

### Widoki

Widoki przygotowane są w React, w TypeScript wykorzystujący komponenty i style z `@chakra-ui`. Dodatkowo picker do daty początkowej jest z biblioteki `react-datepicker`.

W ramach React używany jest Context i React Hooki oraz Functionl Componenty czyli rekomendowany aktualnie sposób tworzenia komponentów w tej bibliotece. Na tyle ile to możliwe widoki są napisane zgodnie z funkcyjnym podejściem czyli bez mutowania stanu i side-effectów w poszczególnych funkcjach.

### Bundlowanie

Bundlowanie wszystkich assetów jest zapewnione przez `snowpack`, który wykorzystuje `esbuild` do transpilacji TypeScript i TSX do JS uruchamialnego w środowisku przeglądarki. Snowpack zapewnia również tryb developerski (`dev`) do prototypowania zmian i odzwierciedlania ich w przeglądarce na bieżąco.

### Testy

Logika obliczania terminów jest pokryta w testach automatycznych, przy każdej zmianie wszystkie testy powinny przechodzić.

## Instalacja, uruchamianie

Do uruchomienia projektu w środowisku deweloperskim, na swojej maszynie wymagany jest `yarn`.

Instalacja zależności:

```sh
yarn
```

Uruchomienie aplikacji na `localhost`

```sh
yarn start
```

Wykonanie testów automatycznych

```sh
yarn test
```

Zbudowanie wersji produkcyjnej

```sh
yarn build
```

Projekt uruchumiony jest na Vercel, gdzie budowany jest za pomocą powyższej komendy.
