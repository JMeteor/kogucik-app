# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


### TODO
- React + Typescript (react-ts)
- Vite, Husky, eslint, prettier [SETUP] +
- (S)CSS/LESS modules, tailwind emotion, material-ui [STYLES] +
- react-router-dom [ROUTING] loadery raczej są zastępowane przez react-query
loadery są przydatne przy korzystaniu z suspense
- react-query [API]
- i18-next [I18N]
- react-hook-form [FORMS]
- react-testing-library, vitest [TESTS] +

- react-hook-form
- DODAć formularz recipent sender


### TESTY
https://testing-library.com/docs/react-testing-library/intro/
prawie zawsze używa się syntaxu react-testing 
pisanie testów w vitest
pisanie testów w cypress
pisanie testów w playwright

Bardzo rzadko jest sens pisania unit testów
Podejście jest teraz takie żeby pisać testy integracyjne na poziomie modułu 
1. fetchowanie danych
2. Formularz dodawania
3. Formularz edycji
4. Testy failów serwera

QueryClientProvider jet wraperem na całą aplikacje, tego nie mockuje po prostu owijam swój test tym czym używam w 
aplikacji
https://testing-library.com/docs/react-testing-library/setup#custom-render
zrobić jeden komponent który wrappuje wszystko w komponentach? Nie mockuje query clienta tylko używam rzeczywistego 
queryClientProvider. Zawsze jak jest błąd braku kontekstu lepiej dodać ten kontekst niż go mockować.

Mockowanie funkcji przy okazji vi.mock jest kłamaniem
MOCK SERVICE WORKER Framework agnostic - https://mswjs.io/
piszesz handlery do wszystkich endpointow ktore chcesz mockowac

PLUS
* definiując sobie odpowiedzi możesz tak skonfigurować aplikacje że w testach odpalasz serwerek obok aplikacji i on 
  handluje zapytania testó∑.
* Te same handlery możesz zastosować do testowania lokalnie nawet jak nie masz backendu
* InvoiceList test robie oddzielny folder test/mock-server gdzie definiuje wszystkie handlery ktlrych uzywa aplikacja.
* Jedną wajchą jesteś w stanie ustalić czy uderzasz do mock czy nie. 
* Definiuje happy pathy w jednym miejscu,

### Jak pisać testy?
* Nigdy nie getujesz po test-id tylko po tekście, testy powinny odwzorowywać flow usera
* Im bardziej szczegółów piszesz queriesu tym lepiej dla ciebie. `getByText`, `getByRole`, `toHaveTextContent`

### Eventy
* biblioteka ma `fireEvent` ale nie jest on miarodajny, raczej się go nie używa
* lepiej używać https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent ponieważ `userEvent` 
  symyluje cały proces klikania przez usera.
* Od ostatniej wersji trzeba zrobić `const user= userEvent.setup()` pomaga lepiej odwzorować zachowanie użytkownika

TODO
* dodawanie i edycja nie koniecznie ma sens, lepiej zrobić edycja invoice i pobieranie danych
* happy pathy sprawdzić, jakość validacji
* zamockować MOCK SERVICE WORKEREM: pobieranie listy, invoice pojedynczego, edycja i kasowanie
* mockowanie bazy danych https://github.com/mswjs/data
* błędy serwera, błędy walidacji