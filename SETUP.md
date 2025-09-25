# 🚀 Project Setup Guide

This guide will help you set up the Hidden Gem React application on your local development environment.

## 📋 Prerequisites

### Required Software

| Software | Version | Download Link |
|----------|---------|---------------|
| **Node.js** | 16.0.0 or higher | [Download Node.js](https://nodejs.org/) |
| **npm** | 7.0.0 or higher | (Comes with Node.js) |
| **Git** | Latest version | [Download Git](https://git-scm.com/) |

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Disk Space**: At least 2GB free space
- **Internet Connection**: Required for downloading dependencies

### Browser Support

- **Chrome**: 90+ (Recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🔧 Installation Steps

### Step 1: Verify Prerequisites

Check if you have the required software installed:

```bash
# Check Node.js version
node --version
# Should output: v16.0.0 or higher

# Check npm version
npm --version
# Should output: 7.0.0 or higher

# Check Git version
git --version
# Should output: git version 2.x.x or higher
```

### Step 2: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd HiddenGemReact

# Verify you're in the correct directory
pwd
# Should show: /path/to/HiddenGemReact
```

### Step 3: Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - React 19.1.0 and related packages
# - TypeScript 4.9.5
# - Mantine UI 8.2.8
# - React Router DOM 6.30.1
# - And 30+ other dependencies
```

**Expected Output:**
```
added 20426 packages, and audited 20426 packages in 2m
found 0 vulnerabilities
```

### Step 4: Environment Configuration

Create a `.env` file in the project root:

```bash
# Create environment file
touch .env
```

Add the following content to `.env`:

```bash
# API Configuration
REACT_APP_BASE_BE_URL=http://localhost:3001/api

# Optional: Override base URL at runtime
# Uncomment and modify if needed:
# REACT_APP_OVERRIDE_BASE_URL=https://api.hiddengem.com/api
```

### Step 5: Start Development Server

```bash
# Start the development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view HiddenGems in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Step 6: Verify Installation

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Check the console** for any errors
3. **Verify the application loads** with the coffee shop interface
4. **Test navigation** between different pages

## 🛠️ Available Scripts

### Development Commands

```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Run test suite
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Eject from Create React App (irreversible)
npm run eject
```

### Build Commands

```bash
# Create production build
npm run build

# Serve production build locally
npx serve -s build

# Analyze bundle size
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `REACT_APP_BASE_BE_URL` | Backend API base URL | `http://localhost:3001/api` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_OVERRIDE_BASE_URL` | Runtime API URL override | `https://api.hiddengem.com/api` |

### Environment File Examples

**Development (.env.development):**
```bash
REACT_APP_BASE_BE_URL=http://localhost:3001/api
```

**Production (.env.production):**
```bash
REACT_APP_BASE_BE_URL=https://api.hiddengem.com/api
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Node.js Version Issues

**Problem:** `npm install` fails with version errors

**Solution:**
```bash
# Check Node.js version
node --version

# If version is too old, update Node.js
# Download from https://nodejs.org/
# Or use a version manager like nvm:

# Install nvm (Linux/macOS)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest Node.js
nvm install node
nvm use node
```

#### 2. npm Install Fails

**Problem:** `npm install` fails with network or permission errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# If still failing, try with different registry
npm install --registry https://registry.npmjs.org/
```

#### 3. Port Already in Use

**Problem:** `npm start` fails because port 3000 is occupied

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or start on different port
PORT=3001 npm start
```

#### 4. Build Failures

**Problem:** `npm run build` fails with TypeScript or ESLint errors

**Solution:**
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npx eslint src/

# Fix auto-fixable issues
npx eslint src/ --fix
```

#### 5. API Connection Issues

**Problem:** Application loads but API calls fail

**Solution:**
```bash
# Check environment variables
echo $REACT_APP_BASE_BE_URL

# Verify .env file exists and has correct content
cat .env

# Check if backend server is running
curl http://localhost:3001/api/health
```

### Debug Commands

```bash
# Check Node.js and npm versions
node --version && npm --version

# Check installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

## 📁 Project Structure

After successful setup, your project structure should look like:

```
HiddenGemReact/
├── node_modules/          # Dependencies (auto-generated)
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable components
│   ├── screens/          # Page components
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main app component
│   └── index.tsx         # Entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lock file
└── README.md             # Project documentation
```

## 🚀 Quick Start Checklist

- [ ] Node.js 16+ installed
- [ ] npm 7+ installed
- [ ] Git installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Environment file created (`.env`)
- [ ] Development server started (`npm start`)
- [ ] Application loads in browser
- [ ] No console errors
- [ ] Navigation works

## 📞 Getting Help

If you encounter issues not covered in this guide:

1. **Check the console** for error messages
2. **Verify all prerequisites** are installed correctly
3. **Check the main README.md** for detailed project information
4. **Review the troubleshooting section** above
5. **Check GitHub issues** for similar problems
6. **Contact the development team** for assistance

## 🎯 Next Steps

Once you have the project running:

1. **Explore the codebase** - Start with `src/App.tsx`
2. **Check the components** - Look at `src/components/`
3. **Review the screens** - Browse `src/screens/`
4. **Understand the services** - Examine `src/services/`
5. **Read the main README.md** - For detailed project information

---

**Happy coding! 🎉**

For detailed project information, see [README.md](README.md).
