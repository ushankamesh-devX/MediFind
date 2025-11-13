# Docker Development Setup - Hot Reload Enabled

## 🚀 Quick Start for Development

### Start all services with hot-reload:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Or run in detached mode (background):
```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

### Stop all services:
```bash
docker-compose -f docker-compose.dev.yml down
```

## ✨ What's Enabled:

### Frontend (React) - Port 3000
- ✅ **Hot-reload enabled** - Changes auto-update in browser
- ✅ Volume mounted: `./frontend/src` and `./frontend/public`
- ✅ React dev server running
- 🌐 Access: http://localhost:3000

### Backend (Node.js) - Port 5000  
- ✅ **Hot-reload enabled** - Server restarts on file changes
- ✅ Volume mounted: `./backend` folder
- ✅ Nodemon watching for changes
- 🌐 Access: http://localhost:5000

### Database (MySQL) - Port 3306
- ✅ Data persisted in Docker volume
- ✅ Accessible on localhost:3306

## 📝 How It Works:

1. **Make changes** to any file in `frontend/src` or `backend/`
2. **Save the file**
3. **Changes auto-apply:**
   - Frontend: Browser hot-reloads instantly
   - Backend: Server restarts automatically
4. **No rebuild needed!** 🎉

## 🔄 View Logs:

### All services:
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

### Specific service:
```bash
docker-compose -f docker-compose.dev.yml logs -f frontend
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f db
```

## 🛠️ Useful Commands:

### Rebuild after package.json changes:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Restart a specific service:
```bash
docker-compose -f docker-compose.dev.yml restart backend
```

### Run only database:
```bash
docker-compose -f docker-compose.dev.yml up db
```

## ⚡ Performance Tips:

- **First build** takes 2-3 minutes (installs all dependencies)
- **Subsequent starts** are much faster
- **Code changes** reflect in seconds
- **Package.json changes** require rebuild

## 🆚 Comparison:

| Feature | docker-compose.yml | docker-compose.dev.yml |
|---------|-------------------|------------------------|
| Purpose | Production | Development |
| Frontend | Nginx (static) | React dev server |
| Hot-reload | ❌ No | ✅ Yes |
| Port 3000 | Static files | Live dev server |
| Rebuild needed | After every change | Only for package.json |

## 📦 What's Installed:

- **Frontend:** All npm packages in container
- **Backend:** Nodemon for auto-restart
- **Database:** MySQL 8.0

## 🎯 Your Workflow:

1. Start dev environment:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. Open browser: http://localhost:3000

3. Edit files in VS Code:
   - `frontend/src/App.js` → See changes instantly
   - `backend/server.js` → Server restarts automatically

4. Code, save, see results! 🚀

## 🐛 Troubleshooting:

### Changes not reflecting?
```bash
# Rebuild containers
docker-compose -f docker-compose.dev.yml up --build
```

### Port already in use?
```bash
# Stop local npm servers first
# Or change ports in docker-compose.dev.yml
```

### Need to install new packages?
```bash
# For frontend
docker-compose -f docker-compose.dev.yml exec frontend npm install <package>

# For backend  
docker-compose -f docker-compose.dev.yml exec backend npm install <package>

# Then rebuild
docker-compose -f docker-compose.dev.yml up --build
```

## ✅ Ready to Go!

Your development environment now has hot-reload for both frontend and backend! 

Just run:
```bash
docker-compose -f docker-compose.dev.yml up
```

And start coding! All changes will auto-update. 🎨✨
