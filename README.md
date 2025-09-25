# Hidden Gem Web Application

A modern React TypeScript application for coffee shop discovery and management, featuring a comprehensive admin panel, user authentication, and real-time API integration.

## 🚀 Technical Features

### Core Technology Stack
- **React 19.1.0** with TypeScript 4.9.5
- **React Router DOM 6.30.1** for client-side routing
- **Mantine UI 8.2.8** for advanced UI components
- **React Toastify 11.0.5** for notifications
- **Leaflet 1.9.4** with React Leaflet for interactive maps
- **Embla Carousel** for image carousels and sliders

### Architecture & Design
- **Component-Based Architecture** with organized folder structure
- **Comprehensive Design System** with coffee-themed color palette
- **CSS Custom Properties** for theming and consistency
- **Mobile-First Responsive Design** with breakpoint system
- **TypeScript Interfaces** for type safety and API contracts
- **Service Layer Pattern** for API abstraction

### State Management & Data Flow
- **Context API** for global state (Auth, Theme, Loading)
- **Custom Hooks** for reusable logic and API calls
- **Local Storage Integration** for persistent authentication
- **Real-time Data Fetching** with automatic refresh on focus
- **Error Boundary Implementation** for graceful error handling

### API Integration
- **RESTful API Client** with automatic token management
- **Service Layer Architecture** with 15+ specialized services
- **Request/Response Interceptors** for authentication and error handling
- **Type-Safe API Contracts** with TypeScript interfaces
- **Environment-based Configuration** for different deployment stages

## 📁 Project Structure

```
HiddenGemReact/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button/          # Button component with variants
│   │   ├── Input/           # Form input with validation
│   │   ├── Card/            # Container components
│   │   ├── Header/          # Navigation and header components
│   │   ├── AdminSidebar/    # Admin panel navigation
│   │   ├── ThemeProvider/   # Theme context provider
│   │   ├── AuthProvider/    # Authentication context
│   │   └── index.ts         # Barrel exports
│   ├── screens/             # Page-level components
│   │   ├── authentication/  # Login/Register screens
│   │   ├── admin/           # Admin panel screens (15+ screens)
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── StoresManage.tsx
│   │   │   ├── UserManage.tsx
│   │   │   ├── BannerManage.tsx
│   │   │   ├── ContentManage.tsx
│   │   │   ├── PromotionManage.tsx
│   │   │   └── ReviewManage.tsx
│   │   ├── home/            # Public screens
│   │   ├── store/           # Store listing and details
│   │   ├── userProfile/     # User profile management
│   │   └── index.ts         # Screen exports
│   ├── services/            # API service layer
│   │   ├── api.ts           # Base API client
│   │   ├── auth.ts          # Authentication service
│   │   ├── cafes.ts         # Coffee shop services
│   │   ├── stores.ts        # Store management
│   │   ├── admin.ts         # Admin operations
│   │   ├── promotions.ts    # Promotion management
│   │   ├── content.ts       # Content management
│   │   └── index.ts         # Service exports
│   ├── styles/              # Global styling system
│   │   ├── theme.css        # Coffee-themed design system
│   │   ├── spacing.css      # Spacing utilities
│   │   └── design-system.css # Complete design tokens
│   ├── dummyData/           # Mock data for development
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── homeData.ts      # Home page data
│   │   └── index.ts         # Data exports
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── documents/               # Project documentation
├── .cursor/                 # Cursor IDE rules
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🎨 Design System

### Coffee-Themed Color Palette
- **Primary Colors**: Coffee-inspired browns (#603809, #6F3D28, #442808)
- **Neutral Colors**: Professional grays for text and backgrounds
- **Semantic Colors**: Success, error, warning, and info states
- **Dark Theme Support**: Complete dark mode implementation
- **Accessibility**: WCAG compliant color contrast ratios

### Typography & Spacing
- **Base Unit**: 4px grid system for consistent spacing
- **Font Scale**: 12px to 48px with proper line heights
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive Typography**: Fluid scaling across breakpoints

### Component System
- **CSS Custom Properties**: Theme-aware styling
- **BEM Methodology**: Consistent class naming convention
- **Component Variants**: Multiple states and sizes
- **Animation System**: Smooth transitions and micro-interactions

## 🧩 Core Components

### UI Components
- **Text**: Typography component with size, weight, and color variants
- **Button**: Interactive buttons with primary, secondary, and ghost variants
- **Input**: Form inputs with validation states and password visibility toggle
- **Card**: Container components for content grouping
- **Modal**: Overlay dialogs for forms and confirmations
- **Toast**: Notification system with success, error, and info states

### Layout Components
- **Header**: Main navigation with responsive menu
- **AdminSidebar**: Admin panel navigation with role-based access
- **Footer**: Application footer with organized sections
- **Container**: Layout wrapper with consistent spacing

### Context Providers
- **ThemeProvider**: Dark/light theme management
- **AuthProvider**: Authentication state and user management
- **LoadingProvider**: Global loading state management

## 📚 Documentation

Comprehensive documentation is available in the `documents/` folder:

- **[Component Usage Guide](documents/COMPONENT_USAGE.md)** - Complete guide for using all components
- **[Spacing System](documents/SPACING_SYSTEM.md)** - Comprehensive spacing system documentation
- **[Implementation Status](documents/SPACING_IMPLEMENTATION_STATUS.md)** - Current implementation status
- **[Project Structure](documents/PROJECT_STRUCTURE.md)** - Detailed project organization guide

## 🛠️ Quick Start

> **📋 For detailed setup instructions, see [SETUP.md](SETUP.md)**

### Prerequisites

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Quick Setup

```bash
# Clone and install
git clone <repository-url>
cd HiddenGemReact
npm install

# Configure environment
echo "REACT_APP_BASE_BE_URL=http://localhost:3001/api" > .env

# Start development server
npm start
```

### Available Scripts

```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run test suite
```

**For complete setup instructions, troubleshooting, and environment configuration, see [SETUP.md](SETUP.md)**

## 🔌 API Integration

### Service Architecture
The application uses a centralized service layer pattern with 15+ specialized services:

```typescript
// Base API Client
import { apiClient } from './services';

// Specialized Services
import { 
  authService,      // Authentication & user management
  cafesService,     // Coffee shop operations
  storesService,    // Store management
  adminService,     // Admin panel operations
  promotionsService, // Promotion management
  contentService,   // Content management (About, Testimonials)
  bannersService,   // Banner management
  blogService,      // Blog operations
  reviewService,    // Review management
  searchService,    // Search functionality
  walletService,    // Payment operations
  chatService,      // Real-time messaging
  contactService,   // Contact form handling
  vouchersService,  // Voucher management
  adsService        // Advertisement management
} from './services';
```

### Authentication Flow
- **JWT Token Management**: Automatic token refresh and storage
- **Role-Based Access**: Admin, user, and guest permissions
- **Protected Routes**: Route guards for admin and authenticated users
- **Session Persistence**: Local storage with automatic cleanup

### API Features
- **Type-Safe Contracts**: Full TypeScript interfaces for all endpoints
- **Error Handling**: Centralized error management with user-friendly messages
- **Request Interceptors**: Automatic authentication headers
- **Response Interceptors**: Error handling and token refresh
- **Environment Configuration**: Different API endpoints for dev/prod

### Real-time Features
- **Auto-refresh**: Data updates when window regains focus
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Loading States**: Comprehensive loading indicators
- **Error Boundaries**: Graceful error handling and recovery

## 🎯 Development Principles

### Code Quality
1. **TypeScript First**: Strict type checking and interfaces for all components
2. **Design System Consistency**: Use CSS custom properties and design tokens
3. **Component Reusability**: Build modular, reusable components
4. **Error Handling**: Comprehensive error boundaries and user feedback
5. **Performance Optimization**: Lazy loading, memoization, and efficient rendering

### Architecture Patterns
1. **Service Layer**: Centralized API management with type safety
2. **Context Pattern**: Global state management with React Context
3. **Custom Hooks**: Reusable logic extraction and state management
4. **Route Protection**: Role-based access control and authentication guards
5. **Responsive Design**: Mobile-first approach with progressive enhancement

### Development Workflow
1. **Component Structure**: Each component in its own folder with CSS
2. **Barrel Exports**: Clean import statements with index.ts files
3. **Type Safety**: Full TypeScript coverage with strict mode
4. **Testing**: Unit tests for critical business logic
5. **Documentation**: Comprehensive inline documentation and README

## 🔧 Development Workflow

### Adding New Components
1. **Create Component Structure**:
   ```bash
   mkdir src/components/NewComponent
   touch src/components/NewComponent/index.tsx
   touch src/components/NewComponent/index.css
   ```

2. **Follow Component Pattern**:
   - Use TypeScript interfaces for props
   - Implement proper error handling
   - Add CSS custom properties for theming
   - Include responsive design

3. **Export from Barrel**:
   ```typescript
   // src/components/index.ts
   export { default as NewComponent } from './NewComponent';
   ```

### Adding New Screens
1. **Create Screen Structure**:
   ```bash
   mkdir src/screens/newFeature
   touch src/screens/newFeature/NewScreen.tsx
   touch src/screens/newFeature/NewScreen.css
   ```

2. **Add Routing**:
   ```typescript
   // App.tsx
   import { NewScreen } from './screens';
   <Route path="/new-feature" element={<NewScreen />} />
   ```

3. **Update Exports**:
   ```typescript
   // src/screens/index.ts
   export { default as NewScreen } from './newFeature/NewScreen';
   ```

### Adding New API Services
1. **Create Service File**:
   ```bash
   touch src/services/newService.ts
   ```

2. **Implement Service Pattern**:
   ```typescript
   import { apiClient } from './api';
   
   const newService = {
     getData: () => apiClient.get('/new-endpoint'),
     createData: (data) => apiClient.post('/new-endpoint', data),
   };
   
   export default newService;
   ```

3. **Export from Services**:
   ```typescript
   // src/services/index.ts
   export { default as newService } from './newService';
   ```

## 📱 Responsive Design

### Breakpoint System
- **Mobile**: 320px - 639px (Base styles)
- **Tablet**: 640px - 1023px (Enhanced layouts)
- **Desktop**: 1024px - 1279px (Full features)
- **Large Desktop**: 1280px+ (Optimized layouts)

### Responsive Features
- **Mobile-First CSS**: Progressive enhancement approach
- **Flexible Grid**: CSS Grid and Flexbox for layouts
- **Responsive Typography**: Fluid font scaling
- **Touch-Friendly**: Optimized for mobile interactions
- **Performance**: Optimized images and lazy loading

## 🎨 Styling Architecture

### CSS Organization
- **Global Styles**: `src/index.css` and `src/App.css`
- **Design System**: `src/styles/theme.css` with CSS custom properties
- **Component Styles**: Scoped CSS in component folders
- **Utility Classes**: Reusable styling utilities
- **BEM Methodology**: Block__Element--Modifier naming

### Theme System
- **CSS Custom Properties**: Dynamic theming support
- **Dark Mode**: Complete dark theme implementation
- **Color Tokens**: Semantic color naming system
- **Spacing Scale**: Consistent 4px-based spacing
- **Typography Scale**: Responsive font sizing

## 🚀 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript compression
- **Asset Optimization**: Image and font optimization
- **Bundle Analysis**: Webpack bundle analyzer integration

### Runtime Performance
- **React.memo**: Component memoization for expensive renders
- **useCallback/useMemo**: Hook optimization for expensive calculations
- **Lazy Loading**: Dynamic imports for large components
- **Virtual Scrolling**: Efficient list rendering
- **Image Optimization**: Lazy loading and responsive images

## 🚀 Deployment

### Production Build
```bash
# Create production build
npm run build

# Serve locally (for testing)
npx serve -s build

# Deploy to hosting service
# Upload /build folder contents to your hosting provider
```

### Environment Variables
```bash
# Production environment
REACT_APP_BASE_BE_URL=https://api.hiddengem.com/api

# Development environment
REACT_APP_BASE_BE_URL=http://localhost:3001/api
```

### Build Output
- **Static Files**: Optimized HTML, CSS, and JavaScript
- **Asset Optimization**: Compressed images and fonts
- **Bundle Size**: ~178KB gzipped main bundle
- **Performance**: Lighthouse score optimized

## 🧪 Testing

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Testing Strategy
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: API service interactions
- **E2E Tests**: Critical user workflows
- **Accessibility Tests**: WCAG compliance testing

## 🔧 Troubleshooting

### Common Issues
1. **Build Failures**: Check TypeScript errors and ESLint warnings
2. **API Connection**: Verify `REACT_APP_BASE_BE_URL` environment variable
3. **Authentication**: Clear localStorage and re-login
4. **Styling Issues**: Check CSS custom property usage
5. **Performance**: Use React DevTools Profiler

### Debug Tools
- **React DevTools**: Component inspection and profiling
- **Redux DevTools**: State management debugging
- **Network Tab**: API request/response inspection
- **Console**: Error logging and debugging

## 📚 Additional Resources

### Documentation
- **[Component Usage Guide](documents/COMPONENT_USAGE.md)** - Complete component reference
- **[API Documentation](src/services/backendDocumentation.md)** - Backend API reference
- **[Design System](src/styles/theme.css)** - Complete design tokens
- **[Project Structure](documents/PROJECT_STRUCTURE.md)** - Architecture overview

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Mantine UI Components](https://mantine.dev/)
- [React Router Guide](https://reactrouter.com/)

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
