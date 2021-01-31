# LoConnected

Un proyecto que comenzó como hobby el 30 de abril de 2020 y el mas grande que realice hasta el momento.

En cuarentena nació la idea de crear una pagina para localidades chicas en las que se puedan crear tiendas de todo tipo y los usuarios puedan navegar en estas y realizar compras.

El proyecto fue realizado para obtener experiencia como fullstack usando **Node.js y Vue.js**.

Para realizar el backend, partí de una estructura que aprendí mientras realizaba el curso **"Node.js, Express, MongoDB & More: The Complete Bootcamp 2020"**, pero a diferencia del mismo, utilice una base relacional. Para reemplazar Mongoose aprendí y utilice un ORM llamado **Objection.js**.

Este repositorio publico fue creado a partir del privado con +80 commits desde el cual copie todos los archivos. Esto fue porque en la historia del privado había muchos commits que podían tener información sensible de claves.

## Cuenta con 3 proyectos

- **/client**: es el frontend que utilizan los clientes. Programada en Vue.
- **/admin**: es el frontend que utilizan los dueños/empleados de las tiendas. Programada en Vue.
- **/server**: es una API Rest. Programada en Node.

## Instalación

- Correr el archivo `install.bat`.
- Para configurar el backend ir a la carpeta `/server` y leer el `README.md`.
- Una vez instalado y configurado todo puede correr los proyectos por separado o correr el archivo `dev.bat`.

## TODO

- **server**
  - Implementar la creación y actualización de productos con atributos.

- **admin**
  - Implementar la creación, visualización y actualización de productos con atributos.
  - Revisar y mejorar iteraciones del frontend, ej: cuando se crea una tienda no se cierra la ventana y no se agrega la tienda hasta que actualice pagina.

- **client**
