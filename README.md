TiendApp

Aplicación móvil de e-commerce desarrollada en React Native (Expo) como parte del curso.  
Permite explorar productos, ver detalle, agregar al carrito y simular el flujo de compra.

---

Características

- Navegación; con `@react-navigation/native` y tabs.
- Listado de categorías y productos; a partir de archivos JSON locales.
- Detalle de producto; con botón de *Agregar al carrito*.
- Carrito de compras; con listado de productos seleccionados, total y opciones:
  - Quitar productos.
  - Vaciar carrito.
  - Finalizar compra.
- Pantalla de éxito; al finalizar la compra.
- Persistencia local (SQLite); → guardado de datos en el dispositivo.
- Device features (Location); → obtener ubicación del usuario para entrega.
- Firebase; → Autenticación y Realtime Database (login anónimo y guardado de órdenes).

---

Estructura de carpetas

La app está organizada en módulos (navegación, screens, services y data) siguiendo las buenas prácticas de React Native.

---

Persistencia local (SQLite)

Se utiliza expo-sqlite para almacenar datos de prueba localmente.
El archivo src/services/db.js y la pantalla de prueba demuestran el uso de SQLite.

---

Device Feature (Ubicación)

Se utiliza expo-location en la pantalla LocationScreen.jsx para obtener latitud y longitud del dispositivo.
Esto cumple el punto de Device Features de la rúbrica.

---

Servicios Firebase

Auth anónima implementada con signInAnonymously (ver src/services/firebase.js).
Realtime Database: al finalizar una compra, la orden se guarda en /orders/{uid}/{orderId} en la base de datos.

---

Flujo general de la app

Productos → Carrito → Finalizar compra → Pantalla de éxito.


---

Dependencias principales

- `react-native`
- `expo`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `expo-sqlite` → Persistencia
- `expo-location` → Ubicación
- `firebase` → Auth + Realtime Database

---

Instalación y uso
(Comandos de consola)

1. Clonar este repositorio:
     
   git clone https://github.com/nnahuell/tienda-app.git
   cd tienda-app

2. Instalar dependencias:

    npm install

3. Iniciar el proyecto:

    npx expo start

4. Escanear el QR con la app Expo Go en tu celular o abrir en un emulador Android/iOS.