# Methodology and Research Readiness

## English

### 1. Repository role

`Landing-MGIMO-dashboard` is a public educational landing and navigation layer for a regional socio-economic dashboard. It is not the analytical dashboard itself and it is not a raw statistical data repository. Its research value is in making the dashboard materials legible, citable and teachable: the page explains the educational-methodological complex, exposes the thematic structure of the dashboard, gives a widget-level catalog and connects each block to practical student assignments.

The repository should therefore be read as a documentation and learning-interface project around a larger analytical environment. It helps instructors, students and reviewers understand what the dashboard is for, how to navigate it and how to reproduce the local landing-page checks before reuse or adaptation.

### 2. Research and educational object

The object represented by the landing page is a socio-economic dashboard for Russian regions, prepared for educational work with regional statistics and visual analytics. The dashboard materials cover the cycle:

```text
data selection -> indicator interpretation -> visualization -> territorial comparison -> analytical conclusion -> recommendation
```

The intended educational audience includes courses and project work in geodata, geographic information systems, public administration, economics, international relations, political science, business informatics and data analysis. The expected learning outcome is not only the ability to read a chart, but the ability to formulate an evidence-based regional argument while keeping the limits of the source data visible.

### 3. Educational-methodological complex

The educational-methodological complex is treated as a modular teaching package. In its complete form, it consists of:

- a consolidated set of socio-economic indicators with yearly dynamics;
- a region layer suitable for map-based analysis;
- a DataLens dashboard with thematic pages and interactive widgets;
- an indicator dictionary with definitions, units, aggregation rules and notes;
- methodological recommendations for lectures, seminars and project work;
- widget-level and integrative practical assignments;
- landing-page documentation that explains the structure and intended use.

The landing page supports the complex by acting as an entry point and syllabus-facing explanation. It should help a new user answer four questions quickly: what the dashboard studies, which pages and indicators are available, which assignment format is expected and what limitations should be considered before drawing conclusions.

### 4. Dashboard and widget catalog

The dashboard is organized as seven thematic learning modules. Each module combines spatial, temporal and tabular views so that students can compare regions, detect outliers, trace dynamics and validate exact values.

| Page | Pedagogical focus | Documented visualizations |
| --- | --- | ---: |
| Demography | population size, fertility, mortality, migration and regional demographic structure | 20 |
| Economy | output, investment, income-generating activity and territorial economic differentiation | 25 |
| Labour | employment, unemployment and labour-market participation | 9 |
| Welfare | income, consumption, poverty and quality-of-life proxies | 16 |
| Housing | housing stock, urban environment and living conditions | 15 |
| Education | educational infrastructure and education-related indicators | 6 |
| Healthcare | medical infrastructure, access and health-system capacity indicators | 25 |

The repository text and interface describe the workbook as containing more than one hundred visual elements. Some project materials mention 116 visualizations and some mention 117. For research citation, use the latest dashboard workbook or exported widget catalog as the source of truth and document the count used in the analysis.

At widget level, the catalog should preserve:

- page and widget name;
- visualization type, for example map, line chart, bar chart, treemap or table;
- dimensions and metrics;
- selector dependencies, such as year, period or region set;
- intended interpretation;
- student task alignment;
- notes about missing values, aggregation and comparability.

This structure is important because the same indicator can support different analytical operations depending on the widget type. A map is useful for spatial patterns, a time series for dynamics, a table for exact ranking and a treemap or bar chart for structural comparison.

### 5. Practical assignments

Assignments are designed to move students from observation to argument. A typical widget-level task asks the student to:

1. Open the relevant thematic page.
2. Select a year, period, region or comparison group.
3. Identify leaders, lagging regions, outliers or trend breaks.
4. Validate values through a table or tooltip when available.
5. Formulate an interpretation with explicit reference to the indicator.
6. Submit a concise analytical text, a small table of values and one or more screenshots.

Integrative assignments combine several thematic pages. Examples include a regional profile, a two-region comparison, a clustering exercise and an analytical note for a selected indicator. These assignments are better suited to assessment because they require students to reconcile different indicators, choose comparison logic and state uncertainty.

Recommended assessment dimensions:

- correct use of dashboard selectors and widget type;
- transparent choice of year, region set and comparison group;
- accurate transcription of values and units;
- distinction between description, interpretation and causal hypothesis;
- acknowledgement of data gaps and source limitations;
- clarity of written conclusion and visual evidence.

### 6. Navigation logic

The landing page uses a simple hash-based navigation model with three primary views:

```text
#home       introductory and educational-methodological framing
#dashboard  page and widget catalog
#tasks      practical assignments
```

Within the dashboard and task views, page tiles route users to the thematic modules. Accordions expose widget and assignment detail without forcing the user through a long linear document. This is appropriate for classroom use because instructors can point students directly to a page, widget or task while preserving the wider structure.

The bilingual layer is implemented through `locales/en.json`, `locales/ru.json` and `assets/i18n.js`. When changing visible page text, update both locale files or the source strings that the localization layer expects, then run the i18n checks.

### 7. Adapting the materials for another course or region set

Use the following adaptation protocol for another course, country, macro-region or set of territorial units:

1. Define the course outcomes and assessment format before selecting indicators.
2. Fix the territorial universe and explain inclusions, exclusions and boundary changes.
3. Build or update the indicator dictionary with source, unit, period, aggregation and caveats.
4. Choose thematic pages that match the course logic rather than copying the current seven pages mechanically.
5. For each page, keep a balanced set of spatial, temporal and exact-value widgets.
6. Map every widget to at least one practical assignment or remove it from the teaching catalog.
7. Update screenshots and visual overview assets after the dashboard is stable.
8. Update English and Russian documentation together, including README links and issue templates if the contributor workflow changes.
9. Run the local tests and link/image checks before review.

For a different regional system, pay special attention to administrative boundary changes, historical comparability, capital-city effects, missing territories, changes in statistical methodology and whether the map layer contains more territorial units than the statistical dataset.

### 8. Constraints and limitations

The landing page improves transparency, but it does not remove the limitations of the source dashboard or data.

- The repository does not contain the full analytical dashboard configuration or the complete raw data pipeline.
- `DASHBOARD_URL` and `REPO_URL` are configurable placeholders in `index.html`; downstream adopters should set them to current public resources.
- Screenshots and animated previews can become stale when the dashboard is updated.
- Map layers and statistical datasets may differ in territorial coverage. The project materials mention 89 mapped subjects and 85 subjects in some statistical views, with possible gaps for newer territories.
- Dashboard values are suitable for educational analysis, but formal research use requires independent validation against primary statistical sources.
- Visual correlation in the dashboard is not causal evidence. Assignments should require students to label causal explanations as hypotheses unless independently tested.
- Official institutional names, platform names, logos, screenshots and third-party datasets remain subject to their original rights and terms.
- DataLens behavior, browser rendering and package versions can change over time; local tests verify the landing page, not the external dashboard platform.

### 9. Reproducible local commands

From the repository root:

```bash
npm install
npm run test:i18n
npm test
```

For a simple local preview without the Playwright test server:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>.

Useful manual checks:

```bash
git status --short --branch
rg -n "methodology|CC BY|MIT" README.md LICENSE-DOCS-AND-DATA.md THIRD_PARTY_NOTICES.md
rg -n "DASHBOARD_URL|REPO_URL" index.html
```

### 10. Research-readiness checklist

Before presenting this repository as research-ready documentation, verify that:

- the README points to this methodology file in both language sections;
- the license matrix distinguishes code, documentation/data/content and third-party material;
- the widget counts match the latest dashboard catalog or the discrepancy is documented;
- screenshots exist locally for every referenced image path;
- bilingual documentation is updated consistently;
- the i18n test suite passes;
- third-party names, logos and screenshots are covered by notices rather than relicensed.

## Русский

### 1. Роль репозитория

`Landing-MGIMO-dashboard` - это публичный образовательный лендинг и навигационный слой для регионального социально-экономического дашборда. Это не сам аналитический дашборд и не репозиторий с полной сырой статистической базой. Исследовательская ценность репозитория состоит в том, что он делает материалы дашборда понятными, цитируемыми и пригодными для учебного использования: страница объясняет учебно-методический комплекс, показывает тематическую структуру дашборда, дает каталог виджетов и связывает блоки с практическими заданиями.

Репозиторий следует рассматривать как документационный и учебный интерфейс вокруг более широкой аналитической среды. Он помогает преподавателям, студентам и рецензентам понять назначение дашборда, логику навигации, формат заданий и локальные проверки перед повторным использованием или адаптацией.

### 2. Исследовательский и образовательный объект

Объект, представленный лендингом, - социально-экономический дашборд по субъектам Российской Федерации, подготовленный для учебной работы с региональной статистикой и визуальной аналитикой. Материалы дашборда поддерживают цикл:

```text
отбор данных -> интерпретация показателей -> визуализация -> территориальное сравнение -> аналитический вывод -> рекомендация
```

Целевая образовательная аудитория включает курсы и проектную работу по геоданным, геоинформационным системам, государственному управлению, экономике, международным отношениям, политологии, бизнес-информатике и анализу данных. Ожидаемый результат обучения - не только чтение графика, но и умение построить доказательный региональный аргумент с явным учетом ограничений исходных данных.

### 3. Учебно-методический комплекс

Учебно-методический комплекс рассматривается как модульный учебный пакет. В полном виде он включает:

- сводный набор социально-экономических показателей с динамикой по годам;
- региональный геослой для картографического анализа;
- дашборд DataLens с тематическими страницами и интерактивными виджетами;
- словарь показателей с определениями, единицами измерения, правилами агрегации и примечаниями;
- методические рекомендации для лекций, семинаров и проектной работы;
- практические задания на уровне виджетов и интегративные задания;
- документацию лендинга, объясняющую структуру и предполагаемое использование.

Лендинг поддерживает комплекс как входная точка и объяснение для учебной программы. Новый пользователь должен быстро получить ответы на четыре вопроса: что изучает дашборд, какие страницы и показатели доступны, какой формат задания ожидается и какие ограничения нужно учитывать перед выводами.

### 4. Дашборд и каталог виджетов

Дашборд организован как семь тематических учебных модулей. Каждый модуль сочетает пространственные, временные и табличные представления, чтобы студенты могли сравнивать регионы, находить выбросы, прослеживать динамику и проверять точные значения.

| Страница | Учебный фокус | Документированные визуализации |
| --- | --- | ---: |
| Демография | численность населения, рождаемость, смертность, миграция и демографическая структура регионов | 20 |
| Экономика | выпуск, инвестиции, экономическая активность и территориальная дифференциация | 25 |
| Труд | занятость, безработица и участие в рынке труда | 9 |
| Благосостояние | доходы, потребление, бедность и прокси качества жизни | 16 |
| Жилье | жилищный фонд, городская среда и условия проживания | 15 |
| Образование | образовательная инфраструктура и связанные показатели | 6 |
| Здравоохранение | медицинская инфраструктура, доступность и показатели мощности системы | 25 |

Текст репозитория и интерфейс описывают дашборд как среду с более чем сотней визуальных элементов. В части материалов указано 116 визуализаций, в части - 117. Для исследовательского цитирования используйте актуальный воркбук дашборда или экспортированный каталог виджетов как источник истины и отдельно фиксируйте использованное число.

На уровне виджета каталог должен сохранять:

- страницу и название виджета;
- тип визуализации, например карту, линейный график, столбчатую диаграмму, treemap или таблицу;
- измерения и метрики;
- зависимость от селекторов, например года, периода или набора регионов;
- предполагаемую интерпретацию;
- связь со студенческим заданием;
- примечания о пропусках, агрегации и сопоставимости.

Это важно, потому что один и тот же показатель поддерживает разные аналитические операции в зависимости от типа виджета. Карта полезна для пространственного паттерна, временной ряд - для динамики, таблица - для точного ранжирования, treemap или столбчатый график - для структурного сравнения.

### 5. Практические задания

Задания переводят студента от наблюдения к аргументу. Типовое задание на уровне виджета просит студента:

1. Открыть соответствующую тематическую страницу.
2. Выбрать год, период, регион или группу сравнения.
3. Найти лидеров, отстающие регионы, выбросы или переломы тренда.
4. Проверить значения через таблицу или подсказку, если они доступны.
5. Сформулировать интерпретацию с явной ссылкой на показатель.
6. Сдать краткий аналитический текст, небольшую таблицу значений и один или несколько скриншотов.

Интегративные задания объединяют несколько тематических страниц. Примеры: паспорт региона, сравнение двух регионов, кластеризация и аналитическая записка по выбранному показателю. Такие задания лучше подходят для оценки, потому что требуют сопоставить разные показатели, выбрать логику сравнения и обозначить неопределенность.

Рекомендуемые критерии оценки:

- корректное использование селекторов и типа виджета;
- прозрачный выбор года, набора регионов и группы сравнения;
- точная фиксация значений и единиц измерения;
- различение описания, интерпретации и причинной гипотезы;
- учет пропусков и ограничений источника;
- ясность письменного вывода и визуального доказательства.

### 6. Логика навигации

Лендинг использует простую hash-навигацию с тремя основными представлениями:

```text
#home       вводный и учебно-методический контекст
#dashboard  каталог страниц и виджетов
#tasks      практические задания
```

В представлениях дашборда и заданий плитки страниц ведут к тематическим модулям. Аккордеоны раскрывают детали виджетов и заданий без необходимости читать длинный линейный документ. Такая логика удобна для занятий: преподаватель может направить студентов к конкретной странице, виджету или заданию, сохраняя видимость общей структуры.

Двуязычный слой реализован через `locales/en.json`, `locales/ru.json` и `assets/i18n.js`. При изменении видимого текста обновляйте оба файла локализации или исходные строки, ожидаемые локализационным слоем, затем запускайте i18n-проверки.

### 7. Адаптация для другого курса или набора регионов

Для другого курса, страны, макрорегиона или набора территориальных единиц используйте следующий протокол:

1. Определите результаты обучения и формат оценки до выбора показателей.
2. Зафиксируйте территориальный охват и объясните включения, исключения и изменения границ.
3. Создайте или обновите словарь показателей с источником, единицей измерения, периодом, агрегацией и ограничениями.
4. Выберите тематические страницы, соответствующие логике курса, а не копируйте текущие семь страниц механически.
5. Для каждой страницы сохраняйте баланс пространственных, временных и точных табличных представлений.
6. Свяжите каждый виджет хотя бы с одним практическим заданием или удалите его из учебного каталога.
7. Обновите скриншоты и визуальные обзорные материалы после стабилизации дашборда.
8. Обновляйте английскую и русскую документацию одновременно, включая README и шаблоны обращений, если меняется вклад контрибьюторов.
9. Запустите локальные тесты и проверки ссылок/изображений перед ревью.

Для другой региональной системы особенно важны изменения административных границ, историческая сопоставимость, эффект столичного региона, пропуски по территориям, изменения статистической методологии и ситуация, когда картографический слой содержит больше территориальных единиц, чем статистический набор.

### 8. Ограничения

Лендинг повышает прозрачность, но не устраняет ограничения исходного дашборда и данных.

- Репозиторий не содержит полную конфигурацию аналитического дашборда и полный сырой пайплайн данных.
- `DASHBOARD_URL` и `REPO_URL` в `index.html` являются настраиваемыми placeholders; при адаптации их нужно заменить на актуальные публичные ресурсы.
- Скриншоты и анимированные превью устаревают при обновлении дашборда.
- Геослои и статистические наборы могут различаться по территориальному охвату. В материалах проекта упоминаются 89 субъектов на карте и 85 субъектов в части статистических представлений, с возможными пропусками по новым территориям.
- Значения дашборда подходят для учебного анализа, но формальное исследовательское использование требует независимой проверки по первичным статистическим источникам.
- Визуальная корреляция в дашборде не является причинным доказательством. В заданиях причинные объяснения должны маркироваться как гипотезы, если они не проверены отдельно.
- Официальные названия организаций, названия платформ, логотипы, скриншоты и сторонние наборы данных остаются под условиями исходных правообладателей.
- Поведение DataLens, браузерный рендеринг и версии пакетов могут меняться со временем; локальные тесты проверяют лендинг, а не внешнюю платформу дашборда.

### 9. Воспроизводимые локальные команды

Из корня репозитория:

```bash
npm install
npm run test:i18n
npm test
```

Для простого локального предпросмотра без тестового сервера Playwright:

```bash
python -m http.server 8000
```

Затем откройте <http://localhost:8000/>.

Полезные ручные проверки:

```bash
git status --short --branch
rg -n "methodology|CC BY|MIT" README.md LICENSE-DOCS-AND-DATA.md THIRD_PARTY_NOTICES.md
rg -n "DASHBOARD_URL|REPO_URL" index.html
```

### 10. Чеклист исследовательской готовности

Перед тем как представлять репозиторий как исследовательски готовую документацию, проверьте, что:

- README содержит ссылку на этот методологический файл в обеих языковых секциях;
- матрица лицензий различает код, документацию/данные/контент и сторонние материалы;
- количество виджетов соответствует актуальному каталогу дашборда или расхождение явно задокументировано;
- локально существуют все изображения, на которые ссылаются Markdown-файлы;
- двуязычная документация обновлена согласованно;
- i18n-тесты проходят;
- сторонние названия, логотипы и скриншоты покрыты уведомлениями, а не перелицензированы.
