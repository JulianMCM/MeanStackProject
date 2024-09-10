# Proyecto MEAN Stack

Este es un proyecto full stack desarrollado utilizando la pila MEAN (MongoDB, Express.js, Angular, Node.js). Esta aplicación tiene como objetivo facilitar la gestión de proveedores de servicios. A través de una interfaz sencilla y eficiente, los usuarios pueden realizar las siguientes acciones:

**Cargar una lista de proveedores:** La aplicación permite visualizar una lista completa de proveedores de servicios con información básica como el nombre, el tipo de servicio que ofrecen, y su información de contacto.

**Agregar nuevos proveedores:** Los usuarios pueden añadir fácilmente nuevos proveedores a la lista, proporcionando todos los datos relevantes, como nombre, dirección, tipo de servicio, etc.

**Modificar proveedores existentes:** Si algún dato de un proveedor cambia (por ejemplo, la dirección o el tipo de servicio), se puede modificar la información existente sin problemas.

**Eliminar proveedores:** Los usuarios tienen la posibilidad de eliminar proveedores de la lista si ya no están activos o si no son relevantes.

**Consultar detalles:** Para obtener información más detallada sobre un proveedor específico, la aplicación ofrece la funcionalidad de consultar datos adicionales, como servicios prestados, historial de colaboración, entre otros.

# Características

MongoDB como base de datos NoSQL para almacenar datos.
Express.js como framework para gestionar el servidor backend.
Angular para el frontend interactivo y dinámico.
Node.js como entorno de ejecución del backend.
CRUD completo para [entidades que maneja el proyecto].
Validaciones de datos en frontend y backend.

# Requisitos previos

Antes de comenzar, asegúrate de tener instalado:
Node.js (v14 o superior)
MongoDB (local o en la nube)
Angular CLI

# Instalación

## Clona este repositorio:
```
git clone https://github.com/JulianMCM/MeanStackProject.git
```

## Accede al directorio del proyecto:
```
cd MeanStackProject
```

## Instala las dependencias del servidor (backend):
```
cd backend
npm install
```

## Instala las dependencias del frontend (Angular):
```
cd ../frontend
npm install
```

# Configuración

## Base de Datos

Dado que se proporciona un archivo JSON con datos de la base de datos, no es necesario configurar la URI de MongoDB para datos de prueba. Solo asegúrate de tener MongoDB instalado y en ejecución en tu entorno local.

# Uso
## Inicia el servidor backend:
```
cd backend
npm start
```

## Inicia la aplicación Angular (frontend):
```
cd frontend
ng serve
```

# Contribuciones
Las contribuciones son bienvenidas. Siéntete libre de enviar un pull request para sugerir mejoras o arreglar problemas.

# Licencia
Este proyecto está bajo la licencia MIT.

# Contacto
Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto conmigo en julianmcm98@gmail.com
