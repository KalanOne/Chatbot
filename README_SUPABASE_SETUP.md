# Configuración de Supabase para CecyteBot

## 🚀 Pasos para configurar Supabase

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa los datos:
   - **Name**: CecyteBot
   - **Database Password**: (genera una contraseña segura)
   - **Region**: Selecciona la más cercana a México
5. Espera a que se cree el proyecto (2-3 minutos)

### 2. Obtener las credenciales

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL** (ejemplo: `https://abcdefgh.supabase.co`)
   - **anon public key** (ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configurar variables de entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores:
```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_aqui
```

### 4. Ejecutar la migración de base de datos

1. En Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Copia y pega el contenido del archivo `supabase/migrations/20250630162020_weathered_tooth.sql`
4. Ejecuta la query (botón "Run")

### 5. Configurar Google OAuth

1. En Supabase, ve a **Authentication** → **Providers**
2. Busca "Google" y haz clic en él
3. Activa "Enable sign in with Google"
4. Necesitarás configurar Google Cloud Console:

#### Configurar Google Cloud Console:

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API**
4. Ve a **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Configura:
   - **Application type**: Web application
   - **Name**: CecyteBot
   - **Authorized redirect URIs**: 
     - `https://tu-proyecto.supabase.co/auth/v1/callback`

6. Copia el **Client ID** y **Client Secret**
7. Regresa a Supabase y pégalos en la configuración de Google

### 6. Configurar URL de redirección

En Supabase, ve a **Authentication** → **URL Configuration**:
- **Site URL**: `https://tu-dominio.com` (o `http://localhost:8081` para desarrollo)
- **Redirect URLs**: Agrega:
  - `http://localhost:8081`
  - `exp://localhost:19000`
  - Tu dominio de producción

### 7. Verificar Row Level Security (RLS)

1. Ve a **Database** → **Tables**
2. Verifica que las tablas `users`, `chats`, y `messages` tengan RLS habilitado
3. Ve a **Authentication** → **Policies** para ver las políticas creadas

## 🧪 Probar la integración

### Desarrollo local:
```bash
npm run dev
```

### Verificar funcionalidad:
1. **Chat como invitado**: Debería funcionar sin autenticación
2. **Iniciar sesión con Google**: Botón en la esquina superior derecha
3. **Persistencia de mensajes**: Los mensajes se guardan en la base de datos
4. **Cambio de usuario**: Al iniciar/cerrar sesión, los chats se mantienen separados

## 🔧 Solución de problemas

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctas
- Asegúrate de que no haya espacios extra en las claves

### Error de autenticación con Google
- Verifica la configuración de Google Cloud Console
- Asegúrate de que las URLs de redirección estén correctas

### Error: "Row Level Security policy violation"
- Verifica que las políticas RLS estén configuradas correctamente
- Ejecuta nuevamente la migración si es necesario

### Los mensajes no se guardan
- Verifica la conexión a Supabase en la consola del navegador
- Asegúrate de que el usuario tenga permisos para escribir

## 📊 Monitoreo y Analytics

Una vez configurado, puedes:
1. Ver usuarios registrados en **Authentication** → **Users**
2. Ver datos de chats en **Database** → **Table Editor**
3. Monitorear uso en **Reports**

## 🔒 Seguridad

- Las claves están configuradas para desarrollo
- Para producción, configura variables de entorno seguras
- RLS está habilitado para proteger datos de usuarios
- Los chats de invitados están aislados de usuarios autenticados

## 📱 Funcionalidades implementadas

✅ **Autenticación opcional con Google**
✅ **Chats para usuarios invitados**
✅ **Persistencia de mensajes**
✅ **Separación de datos por usuario**
✅ **Tiempo real (subscripciones)**
✅ **Analytics básicos**
✅ **Validación de dominio de email (opcional)**
✅ **Manejo de errores**
✅ **Interfaz de usuario integrada**

¡Tu chatbot ahora tiene una base de datos completa y funcional! 🎉