# Repositorio de proyectos

Aplicaciones con websockets creada en el curso de [React: Aplicaciones en tiempo real con Socket-io](https://www.udemy.com/course/react-socket-io-fernando)

# Docker Dev

> Referencia a perfiles en docker [link](https://docs.docker.com/compose/how-tos/profiles/)

1. Configurar el archivo `.env` con valores referenciados en `.env.example`

2. Levantar los servicios a utilizar, ejemplos abajo:

| Comando                                                   | Descripción                               |
| --------------------------------------------------------- | ----------------------------------------- |
| `docker compose up -d`                                    | Levantar backend (server y base de datos) |
| `docker compose --profile debug up -d`                    | Levantar backend + phpmyadmin             |
| `docker compose --profile frontend up -d`                 | Levantar backend + frontends              |
| `docker compose --profile frontend --profile debug up -d` | Levantar todos los servicios              |
| `docker compose down`                                     | Bajar los servicios                       |
| `docker compose down --remove-orphans`                    | Bajar los servicios activos e inactivos   |
| `docker compose down --volumes`                           | Bajar los servicios y datos generados     |

<br>
<br>
<br>

# Apps Habilitadas

### Backend

| URL                         | Description           |
| --------------------------- | --------------------- |
| `http://localhost:8000`     | servidor base con ws  |
| `http://localhost:8000/api` | documentacion del api |
| `http://localhost:8080`     | (debug) phpmyadmin    |

> datos de acceso de phpmyadmin, nombre del servidor: `maria_database`, user y pass del `.env`

### Frontend

| URL                     | Description                            |
| ----------------------- | -------------------------------------- |
| `http://localhost:3000` | mapa en tiempo real                    |
| `http://localhost:3001` | aplicacion de colas de espera          |
| `http://localhost:3002` | votacion de bandas en tiempo real      |
| `http://localhost:3003` | demostración de un mapa en tiempo real |
