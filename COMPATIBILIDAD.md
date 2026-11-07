# Compatibilidad de Machupicchiperu

Verificado el 6 de noviembre de 2026 con Node.js 22.23.3 y npm 10.9.9.

## Diagnóstico y cambios

| Elemento | Configuración anterior | Configuración verificada |
| --- | --- | --- |
| React / React DOM | 16.13.1, declarados con `^` | 16.13.1, fijados explícitamente |
| React Router DOM | Rama 5 | 5.3.4, manteniendo la rama 5 |
| React Scripts | 3.4.1 | 5.0.1 |
| Webpack | Rama 4 | 5.112.2, resuelto por React Scripts |
| Compilador SCSS | node-sass 4.14.1 | sass 1.77.8 |
| ESLint | Rama 6 | 8.57.1 |
| Parser ESLint | babel-eslint | @babel/eslint-parser |

Webpack 4 utilizaba algoritmos de hash que entran en conflicto con OpenSSL 3 de Node moderno. React Scripts 5 utiliza Webpack 5 y las comprobaciones realizadas ya no necesitan activar el proveedor legado de OpenSSL. No se añadió ninguna opción de OpenSSL a los scripts del proyecto.

Node Sass es una implementación nativa antigua que no es compatible con este entorno. Dart Sass compila los SCSS actuales sin cambiar sus importaciones, sus archivos ni los estilos.

Se actualizó la configuración de Airbnb a una versión compatible con ESLint 8. Las reglas estándar de React siguen activas durante la compilación. La revisión adicional de estilo de Airbnb se conserva en `.eslintrc.airbnb.cjs` y se usa mediante el script `lint`; no se ejecutó `lint --fix` ni se reformatearon componentes.

Para mantener la suite con React 16 y una instalación reproducible:

- TypeScript 4.9.5 satisface el rango opcional admitido por React Scripts 5; npm había seleccionado una versión posterior incompatible. La aplicación continúa escrita en JavaScript.
- El override de Enzyme fija Cheerio 1.0.0-rc.12, que conserva el módulo `cheerio/lib/utils` requerido por Enzyme.
- El override del adaptador de Enzyme fija react-test-renderer 16.13.1, coincidiendo con React y React DOM.
- Se corrigieron únicamente las expectativas de textos de tres archivos de pruebas, que todavía esperaban los nombres anteriores en inglés. No se eliminaron pruebas ni se modificaron componentes para hacerlas pasar.

## Copia de seguridad previa

Se crearon copias de los archivos existentes antes de modificarlos, conservando también las copias `.backup` que ya había en el proyecto:

- `backups/compatibilidad-20261107-004452/package.json`
- `backups/compatibilidad-20261107-004452/package-lock.json`

La marca del directorio usa UTC. Se verificó la integridad de ambas copias mediante SHA-256.

## Resultados reales

| Comprobación | Resultado |
| --- | --- |
| Instalación limpia con `npm ci` | Correcta: 1927 paquetes instalados |
| Árbol completo con `npm ls --all --json` | Correcto, sin dependencias inválidas |
| Ausencia de node-sass en el bloqueo | Confirmada |
| `npm run build` | Compilación de producción correcta |
| `npm test -- --watchAll=false --runInBand` | 48 suites y 184 pruebas correctas |
| `npm start` en localhost:3000 | Compilación y respuesta HTTP 200 correctas |
| Navegador sobre el servidor de desarrollo | Sin errores JavaScript detectados |
| Navegador sobre `build/`, servido temporalmente en localhost:3001 | Mismas comprobaciones correctas |
| Integridad de fotografías y código de la aplicación | Conservada; los únicos cambios bajo src/public durante esta tarea fueron los tres archivos de pruebas |

La compilación y el arranque se probaron retirando `NODE_OPTIONS`, `SKIP_PREFLIGHT_CHECK` y `PUBLIC_URL` del entorno. Para conservar el servidor de comprobación activo se utilizaron `CI=true` y `BROWSER=none`; estas variables no se añadieron a los scripts npm. El host y el puerto de prueba se fijaron a 127.0.0.1:3000.

Las comprobaciones en Chromium, tanto en desarrollo como sobre el build, incluyeron:

- Título machupicchiperu y portada.
- Carga de las 40 instancias de fotografías locales presentes en la portada.
- Cambio automático de imagen del banner y navegación del carrusel de destinos.
- Pestañas de Cusco, Arequipa e Ica.
- Búsqueda de Cusco: 60 resultados; inicialmente 20 tarjetas visibles.
- Botón Ver más: 40 tarjetas visibles.
- Filtro de precio de 25 a 50: 13 resultados.
- Recarga de la ruta de resultados y renderizado con ancho móvil de 390 píxeles.

El navegador de comprobación usó herramientas y una biblioteca temporal en `/tmp`; no son dependencias necesarias para ejecutar ni compilar el proyecto.

Quedan avisos de obsolescencia de dependencias del stack antiguo y de las opciones de middleware de desarrollo de CRA. No detuvieron la instalación, la compilación ni las pruebas. React Scripts 5 mantiene una herramienta heredada: esta tarea comprueba la compatibilidad con Node 22, sin migrar el framework ni realizar una auditoría de seguridad.

## Rutas y publicación

Se retiró el homepage que apuntaba al repositorio original de Ingrid Amaral. El servidor de desarrollo y el build ahora usan la raíz `/`, apropiada para un dominio propio. Se verificó que `build/index.html` no contiene el prefijo `/getyourguide-clone/` y que las fotografías copiadas a build son idénticas a sus originales.

Se conserva HashRouter y todas las rutas y funciones existentes. Para un alojamiento que sirva el sitio en un subdirectorio habría que configurar ese prefijo antes de compilar. No se ejecutó deploy ni se configuró un dominio.

## Referencias técnicas

- [Cambios de Create React App](https://github.com/react/create-react-app/blob/main/CHANGELOG.md).
- [Metadatos de react-scripts 5.0.1: React >=16 y Webpack 5](https://registry.npmjs.org/react-scripts/5.0.1).
- [Conflicto de Webpack 4 con OpenSSL 3](https://github.com/webpack/webpack/issues/14532).
- [Fin de vida de Node Sass](https://sass-lang.com/blog/node-sass-is-end-of-life/).
- [Rutas de producción y homepage](https://create-react-app.dev/docs/deployment/).
