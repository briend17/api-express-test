# api-express-test

API de chistes con Express que consulta en paralelo Chuck Norris y Dad Jokes, empareja resultados y devuelve una composicion combinada.

## Requisitos

- Node.js 18+
- npm

## Instalacion

```bash
npm install
```

## Ejecutar la app

```bash
npm start
```

La API se levanta en `http://localhost:3000`.

## Probar el endpoint

```bash
curl http://localhost:3000/chistes/emparejados
```

Respuesta esperada (estructura):

```json
[
  {
    "chuck": "Chuck Norris counted to infinity. Twice.",
    "dad": "Why did the math book look sad? Because it had too many problems.",
    "combinado": "Chuck Norris counted to infinity. Also, Why did the math book look sad? Because it had too many problems."
  }
]
```

## Tests

```bash
npm test
```

## Docker

```bash
docker build -t api-express-test .
docker run --rm -p 3000:3000 api-express-test
```
