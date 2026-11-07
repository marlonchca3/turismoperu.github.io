# Machupicchiperu

Sitio turístico con React 16, React Router 5, Redux y estilos SCSS. Los destinos se sirven mediante MirageJS en el navegador; no hace falta arrancar un servidor de datos externo.

## Entorno e instalación

Usa Node.js 22 (versión comprobada: 22.23.3) y npm 10. `.nvmrc` fija la versión de Node utilizada para verificar el proyecto.

```sh
nvm use
npm ci
```

`npm ci` instala las versiones exactas de `package-lock.json`. Después de cambiar dependencias deliberadamente, utiliza `npm install` y conserva el nuevo bloqueo en el repositorio.

## Desarrollo

```sh
npm start
```

Abre `http://localhost:3000/`. `npm run dev` es un alias de `npm start`. El puerto 3000 debe estar libre. No hacen falta `NODE_OPTIONS`, `--openssl-legacy-provider`, `SKIP_PREFLIGHT_CHECK` ni parches de Sass externos al proyecto. Retira esas opciones de tu terminal o archivos de entorno si las configuraste antes.

## Idiomas

La página ofrece Español, English y Português. El selector del pie de página y el de la cabecera comparten la misma elección y actualizan los textos sin recargar la página. La preferencia se conserva en el navegador; si el almacenamiento no está disponible, el cambio sigue funcionando durante la visita.

## Compilación

```sh
npm run build
```

Genera `build/` con los archivos de producción. `sass` sustituye a `node-sass`; conserva los estilos `.scss` y sus importaciones. React Scripts 5 usa Webpack 5 y evita el conflicto de OpenSSL de la configuración anterior.

## Publicación y dominio propio

Publica el contenido de `build/` en la raíz de tu alojamiento y conecta tu dominio allí. Se eliminó el `homepage` que apuntaba a `ingridamaral.github.io/getyourguide-clone/`: las imágenes y los archivos compilados ahora se resuelven desde `/`. No necesitas fijar el dominio en `package.json`.

Se conserva `HashRouter`, por lo que las rutas del buscador usan `/#/results/...`. El servicio de datos de demostración se ejecuta en el navegador también en producción.

`npm run deploy` conserva la publicación existente con `gh-pages`; ejecuta una compilación mediante `predeploy` y escribe en la rama `gh-pages`. No es necesario ejecutarlo si tu proveedor publica `build/` por otro medio. No se ha publicado ni configurado un dominio durante esta actualización.

Si eliges servir el sitio dentro de un subdirectorio en vez de la raíz de tu dominio, tendrás que configurar `homepage` o `PUBLIC_URL` para ese subdirectorio antes de compilar.

## Pruebas existentes

```sh
npm test -- --watchAll=false --runInBand
```

La suite original usa Enzyme con su adaptador para React 16. Las expectativas de texto de la suite se ajustaron al contenido actual en español.

## Comprobaciones de compatibilidad

El diagnóstico, las versiones y los resultados reales de instalación, compilación y pruebas están en [COMPATIBILIDAD.md](COMPATIBILIDAD.md).

## Procedencia

Proyecto basado en Get Your Guide Clone, de [Ingrid Amaral](https://github.com/IngridAmaral). La adaptación de Machupicchiperu conserva sus componentes y estructura.
