## Como probar el forntend

Cree mal el proyecto, asi que una vez clonas el repo del frontend, debes
```bash
cd vite-project
```
Dentro de vite-proyect, solo debes ejecutar:
```bash
yarn install
```
Dentro de vite-project crea un archivo .env con:
```ini
VITE_BACKEND_URL=https://conyab-back-252-s2.onrender.com

```
Asegurate de usar node 20, me generaba error eso
```bash
nvm use 20
```
Ejecutar:
```bash
yarn dev
```
## Durante el desarrollo se implemento:

### Paginas principales: 
- Página de Inicio
- Página de Instrucciones
- Página Nosotros
- Vista Jugar ahora (redirige a crear/buscar)
- Vista Crear partida
- Vista Buscar partida

### Flujo de partidas:
- Crear partida
- Unirse a partida pública
- Solicitar acceso a partida privada
- Lobby de partida dinámico
- Inicio automático de partida por host
- Creación automática de monstruo según dificultad
- Reparto de cartas iniciales
- Panel de jugador (atributos + cartas)
- Panel de monstruo (con imágenes dinámicas)
- Acciones básicas: Ataque básico, Daño al jugador según defensa, Derrota de monstruo y generación del siguiente

### Rutas Protegidas:
Todo el acceso a juego y lobby requiere:
- token válido
- usuario autenticado
- Si el token expira: mensaje claro, redirección automática al login

## Deploy 
- backend: https://conyab-back-252-s2.onrender.com
- frontend: https://conyab.netlify.app/