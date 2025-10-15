# Interon (Minimal Root)
- Web (Vite + React)
- budgeting-api (FastAPI)
- workflow-api (FastAPI)
- Postgres (docker compose)

## Run APIs + DB
docker compose -f infra/dev.compose.yml up --build

## Run Web (separate terminal)
pnpm i && pnpm web:dev
