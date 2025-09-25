# ⚡ Quick Start Commands

## 🚀 Get Started in 30 Seconds

```bash
# 1. Clone and install
git clone <repository-url>
cd HiddenGemReact
npm install

# 2. Configure environment
echo "REACT_APP_BASE_BE_URL=http://localhost:3001/api" > .env

# 3. Start development
npm start
```

## 📋 Essential Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm install` | Install dependencies |

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npx kill-port 3000` |
| Build fails | `npx eslint src/ --fix` |
| Dependencies issues | `rm -rf node_modules && npm install` |

## 📚 Full Documentation

- **[Complete Setup Guide](SETUP.md)** - Detailed installation instructions
- **[Main README](README.md)** - Project overview and architecture
- **[API Documentation](src/services/backendDocumentation.md)** - Backend API reference

---

**Need help?** Check the troubleshooting section in [SETUP.md](SETUP.md)
