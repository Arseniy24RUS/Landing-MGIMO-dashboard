# Contributing

Thank you for improving `Landing-MGIMO-dashboard`. This repository is a static educational landing and documentation layer, so contributions should keep the bilingual research framing, license boundaries and local reproducibility intact.

## Scope

Good contributions include:

- fixes to broken links, image references or local test failures;
- clearer bilingual documentation;
- methodology improvements backed by the dashboard structure;
- corrections to widget counts, assignment wording or terminology;
- accessibility and i18n improvements to the landing page;
- notices for third-party materials.

Please avoid adding unpublished personal data, unverified dashboard links, copyrighted third-party content without permission or broad rewrites that make the educational context harder to audit.

## Local setup

```bash
npm install
npm run test:i18n
npm test
```

For manual preview:

```bash
python -m http.server 8000
```

Open <http://localhost:8000/>.

## Documentation expectations

- Keep English and Russian documentation aligned when the topic affects both audiences.
- Update `docs/methodology.md` when changing the educational-methodological framing, widget catalog assumptions, assignment model or adaptation guidance.
- Update `README.md` only for project-level entry points, not for detailed methodology.
- Keep license and third-party notices accurate when adding screenshots, logos, datasets, libraries or official names.

## Pull request checklist

- The change is scoped to this repository.
- Bilingual text is updated where relevant.
- `npm run test:i18n` passes, or the reason it could not run is documented.
- `npm test` passes when the full local test suite is relevant.
- New local images or Markdown links resolve.
- Third-party materials are covered by `THIRD_PARTY_NOTICES.md`.

## Русский

Спасибо за вклад в `Landing-MGIMO-dashboard`. Это статический образовательный лендинг и документационный слой, поэтому изменения должны сохранять двуязычное исследовательское описание, лицензионные границы и локальную воспроизводимость.

Уместные изменения: исправление ссылок и изображений, улучшение двуязычной документации, уточнение методологии, корректировка количества виджетов и формулировок заданий, улучшения доступности/i18n и уведомления о сторонних материалах.

Перед pull request проверьте, что изменение относится только к этому репозиторию, двуязычные разделы обновлены согласованно, локальные тесты проходят, а новые скриншоты, логотипы, данные или внешние названия отражены в уведомлениях о сторонних материалах.
