# NESTJS

Server con aplicaciones orientadas a websockets

## DEV

1. Clonar repositorio `git clone`
2. Instalar dependencias `yarn install`
   > Tener preinstalado el yarn con `npm install -g yarn`
3. Configurar las variables de entorno
4. Iniciar server de desarrollo `yarn start:dev`

## Docker DEV

1. Clonar repositorio `git clone`
2. Instalar dependencias `yarn install`
   > Tener preinstalado el yarn con `npm install -g yarn`
3. Configurar las variables de entorno
4. Abrir el docker daemon (Docker Desktop)
5. Ejecutar el modo construcción
   - `docker compose -f docker-compose.dev.yaml up --build`
6. Acceder al contenedor mediante VSCode y la extension docker
   - [CMD+SHIFT+P]: show docker

### 1. Bandas OK

Crud de muestra usando websockets

### 2. Colas App OK

Aplicacion de colas de atencion al cliente

> No podemos recibir callbacks desde frontend, comparado con express las funciones desde frontend son ignoradas

### 3. Mapas App OK

Aplicacion de seguimiento de marcadores en el mapa

### 4. Chat app OK

Relacion User + Messages deben ser registradas a la misma vez en base de datos
