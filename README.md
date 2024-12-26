# Repositorio de proyectos

Aplicaciones con websockets creada en el curso de [React: Aplicaciones en tiempo real con Socket-io](https://www.udemy.com/course/react-socket-io-fernando)

# Express WS Server

Servidor con las funcionalidades

1. Aplicacion de nombres de bandas
2. Aplicacion de colas
3. Aplicacion de mapas
4. Aplicacion de chat

# React Band

App simple para probar nombres de bandas

# React Chat

Aplicacion de un chat con login hecha en react con typescript

# React Mapas

App de marcadores en tiempo real usando leafleft maps.

# React Colas

Aplicacion de espera en cola y numeros, con antdesign

# Docker

Levanta el server y 3 demostraciones de webs conectadas al servidor

- `http://localhost:3000` mapa en tiempo real
- `http://localhost:3001` aplicacion de colas de espera
- `http://localhost:3002` votacion de bandas en tiempo real
- `http://localhost:3003` demostración de un mapa en tiempo real
- `http://localhost:8000` servidor

```bash
# Levantar la demostración completa
$ docker compose up -d
# Levantar solo el servidor
$ docker compose up -d websocket_server
```
