# Around The U.S.

Proyecto interactivo que permite a los usuarios compartir y visualizar lugares de interés a través de tarjetas con imágenes. La aplicación ofrece una experiencia dinámica para editar perfiles de usuario y gestionar una galería de tarjetas mediante ventanas emergentes (modales).

## Funcionalidades principales

* **Edición de Perfil**: Los usuarios pueden actualizar su nombre y descripción profesional. Al abrir el modal, los campos se pre-rellenan con la información actual del perfil.
* **Gestión de Tarjetas**: 
    * Generación dinámica de tarjetas desde una plantilla (`<template>`).
    * Soporte para parámetros predeterminados en caso de datos faltantes (título y marcador de posición).
    * Capacidad para añadir nuevas tarjetas mediante un formulario.
    * Eliminación de tarjetas individuales.
* **Interactividad**:
    * Botón de "Me gusta" con cambio de estado visual.
    * Previsualización de imágenes a pantalla completa en un modal dedicado al hacer clic sobre ellas.
* **Validación y UX**: Cierre de ventanas emergentes mediante botones dedicados y limpieza de formularios tras la creación de contenido.

## Tecnologías utilizadas

* **HTML5**: Estructura semántica y uso de elementos `<template>`.
* **CSS3**: Diseño responsivo y animaciones para los estados de los modales.
* **JavaScript (ES6+)**: Manipulación del DOM, manejo de eventos y lógica de renderizado dinámico.

## Estructura del Proyecto

* `index.html`: Contenedor principal y plantillas de tarjetas.
* `pages/`: Contiene los archivos de estilos CSS.
* `scripts/index.js`: Lógica principal de la aplicación.
* `images/`: Recursos gráficos y marcadores de posición (placeholders).

## Instalación y Uso

1. Clona el repositorio en tu máquina local.
2. Asegúrate de mantener la estructura de carpetas para que las rutas de imágenes y estilos funcionen correctamente.
3. Abre el archivo `index.html` en cualquier navegador web moderno.

## Próximos Pasos

* Implementación de validación de formularios en tiempo real.
* Persistencia de datos mediante el uso de APIs o almacenamiento local.
* Cierre de modales al hacer clic fuera del contenido o presionar la tecla Esc.
* Se agrega Figma para poder adaptar la pagina a telefonos
* Agregue card.js y FormValidator y utils.js para de esa manera poder hacer export de codigo de manera mas eficiente y organizada