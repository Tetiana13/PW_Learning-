# PW_Learning-
Learning project

## Running tests by tag

Run the smoke tests:

```bash
npx playwright test --grep "@smoke"
```

Run the regression tests:

```bash
npx playwright test --grep "@regression"
```

The same tagged test suites are available as GitHub Actions workflows in `.github/workflows/smoke.yml` and `.github/workflows/regression.yml`.
