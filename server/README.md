# Loconnected API

API Rest creada utilizando Node, Express y Objection.

## Instalación

Para instalar y configurar la API realizar los siguientes pasos:

- Instalar paquetes: `npm install`
- Correr servidor MySQL/MariaDB.
  - Para utilizar otro DBMS como PostgreSQL hay que configurar las migrations y seeds, ya que por ej. cuando probé utilizar PostgreSQL no permitía crear datos con la Id pre fijada, por lo que no podía realizar referencias.

- Configurar variables de entorno. Los valores están puestos como ejemplo y las claves no son reales.

## Variables de entorno

Por defecto usa 3 archivos en la carpeta raíz (/server)

- `.env`: lo carga siempre
- `.env.development` o `.env.production`: lo carga dependiendo del valor de la variable NODE_ENV (development, production)

- Variables necesarias:
  - PORT = 3000

  - TZ = 'Argentina/BuenosAires'

  - DB_URL = '127.0.0.1'
  - DB_USER ='admin'
  - DB_PASSWORD='admin'
  - DB_DATABASE='test'

  - JWT_SECRET=Theverysecretsupercode
  - JWT_EXPIRES_IN=1d
  - JWT_COOKIE_EXPIRES_IN=1

  - GOOGLE_CLIENT_ID=967148358278-o4qcbxe4ug1ambemdu2tmct3cti7suka.apps.googleusercontent.com
  - GOOGLE_CLIENT_SECRET=twBA8AlRfmaoqdbRE6hjDfp5

  - FACEBOOK_CLIENT_ID=406398654056573
  - FACEBOOK_CLIENT_SECRET=fd2247a77494402dd0e3dc8b5292d90b

  - DOMAIN_URL = 'loconnected.tk' `(production only)`
  - API_URL =  'https://api.loconnected.tk' `(production only)`
  - CLIENT_URL = 'https://www.loconnected.tk'
  - ADMIN_URL = 'https://admin.loconnected.tk'

  - FRONT_RESET_URL = ''

  - EMAIL_USERNAME='user@gmail.com'
  - EMAIL_PASSWORD='password'

  - SECURE_COOKIE=false

- Correr las migraciones a la base de datos con `npm run knex:migrate` y luego poblarla con `npm run knex:seed`.
- Una vez finalizado podrá iniciarse el servidor con `npm run dev`.

## NPM Comandos

Se cuenta con los siguientes comandos:

- `npm run start` Para producción
- `npm run dev` Default para dev
- `npm run dev:prod` Desarrollo con vista de producción
- `npm run debug` Para debugear con **ndb**
- `npm run knex:makemigrations` Crea una migración
- `npm run knex:migrate` Migra todas las migraciones
- `npm run knex:rollback` Vuelve atrás una migración
- `npm run knex:makeseed` Crea una semilla
- `npm run knex:seed` Corre todas las semillas
- `npm run lint` corre EsLint
- `npm run lint:fix` corre EsLint y corrige automáticamente

## Paginas útiles

- **ORM:** ([Objection Js](https://vincit.github.io/objection.js/))
