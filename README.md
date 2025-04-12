
---

## ✅ Tareas pendientes

### 🧠 Conceptos y decisiones clave
- [x] Usaremos `git-http-backend` para el acceso vía HTTP.
- [ ] También se integrará acceso vía SSH (ver detalles más abajo).
- [x] Se utilizará PostgreSQL como base de datos principal.
- [ ] Definir estructura de disco para repos (ej: `/var/guithub/repos/<user>/<repo>.git`).

---

### 🔐 Autenticación y usuarios
- [ ] Endpoint de registro (`POST /auth/register`)
- [ ] Endpoint de login (`POST /auth/login`)
- [ ] Middleware JWT para proteger rutas privadas
- [ ] Gestión de claves SSH por usuario (alta y baja)
- [ ] Modelo de usuarios en PostgreSQL (id, username, password hash, email, ssh_keys[])

---

### 🗃️ Gestión de repositorios
- [ ] Endpoint para crear repo (`POST /repos`)
- [ ] Crear repo *bare* localmente con `git init --bare`
- [ ] Asignar permisos por usuario para HTTP y SSH
- [ ] Tabla repos (id, user_id, path, name, created_at)

---

### 🌐 Acceso Git vía HTTP (con `git-http-backend`)
- [x] Decisión: utilizar `git-http-backend` como servidor Git HTTP.
- [ ] Configurar servidor web (Nginx, Express con CGI, o similar) para redirigir peticiones a `git-http-backend`.
- [ ] Implementar autenticación HTTP (token JWT o basic auth).
- [ ] Exponer rutas tipo: `http://<host>/git/<user>/<repo>.git`
- [ ] Test manual con `git clone`, `git push`, `git pull`

---

### 🔐 Acceso Git vía SSH
- [ ] Configurar `sshd` para acceso controlado desde el usuario `git`.
- [ ] Registrar clave pública de cada usuario.
- [ ] Usar `command="..."` en `~/.ssh/authorized_keys` para restringir comandos permitidos.
- [ ] Validar permisos por usuario/repositorio.
- [ ] Test con `git clone git@host:user/repo.git`

---

### 📜 Hooks y logs
- [ ] Crear script `post-receive` para loguear pushes.
- [ ] Guardar logs en PostgreSQL (user_id, repo_id, action, date, IP)

---

## 🛠️ Stack tentativo

- **Backend:** NestJS
- **Base de datos:** PostgreSQL
- **Git:** Git local + `git-http-backend` + acceso SSH
- **Autenticación:**
  - HTTP: JWT (token auth)
  - SSH: claves públicas autorizadas
- **Infraestructura:** Docker + servidor SSH + servidor web con CGI o Express

--- 

## 🧾 Notas adicionales

- En esta primera versión no se contempla frontend.
- El foco está en entender y controlar el ciclo completo de un backend Git privado.
- El sistema puede escalar hacia un modelo multiusuario con permisos y logs.

