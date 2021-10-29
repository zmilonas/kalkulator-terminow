# Legal date calculator (Kalkulator terminów)

This calculator is web app intended to allow to determine the correct date of legal event, in accordance to the polish law (administrative in particular)

It is not intended to be a guaranteed source of truth but it helps to understand and learn how the calculation is done.

Starting date is usually a legal event - e.g. date of getting a letter which we count from.

The duration is usually to be found in an article connected to the event, e.g. appeal, request etc.

## Legal basis

This calculator was prepared at the start of 2021 when the legal foundation of the counting looked like that (in polish):

```
Art.  57.
§  1. Jeżeli początkiem terminu określonego w dniach jest pewne zdarzenie, przy obliczaniu tego terminu nie uwzględnia się dnia, w którym zdarzenie nastąpiło. Upływ ostatniego z wyznaczonej liczby dni uważa się za koniec terminu.
§  2. Terminy określone w tygodniach kończą się z upływem tego dnia w ostatnim tygodniu, który nazwą odpowiada początkowemu dniowi terminu.
§  3. Terminy określone w miesiącach kończą się z upływem tego dnia w ostatnim miesiącu, który odpowiada początkowemu dniowi terminu, a gdyby takiego dnia w ostatnim miesiącu nie było - w ostatnim dniu tego miesiąca.
§  3a. Terminy określone w latach kończą się z upływem tego dnia w ostatnim roku, który odpowiada początkowemu dniowi terminu, a gdyby takiego dnia w ostatnim roku nie było - w dniu poprzedzającym bezpośrednio ten dzień.
§  4. Jeżeli koniec terminu do wykonania czynności przypada na dzień uznany ustawowo za wolny od pracy lub na sobotę, termin upływa następnego dnia, który nie jest dniem wolnym od pracy ani sobotą.
```

## Tech stack

"Legal" logic is written in TypeScript

For date counting and accurate day off calculations two `npm` libraries are used - `date-fns`, `date-holidays`.

### View layer

The app is rendedred with React, in TypeScript using components and styles from `@chakra-ui`. Additionally `react-datepicker` is used for picking the start date.

React Hooks, Context and Functional components are used. The whole app is written with Functional approach in mind - no state mutation and side-effects.

### Bundling

Asset bundling is provided by `snowpack`, which under the hood uses `esbuild` for transpilation. Snowpack is also responsible for the dev environment for prototyping and quick iteration.

### Tests

"Legal logic" is covered with automatic tests, which should pass with every commit.

## How to run

The only prerequisite is `yarn`, which you can use on a host machine or via docker.

Install dependencies:

```sh
yarn
```

Run the app on `localhost`

```sh
yarn start
```

Running tests

```sh
yarn test
```

Transpile and bundle for production

```sh
yarn build
```

The app is deployed on Vercel which uses the above command for building.
