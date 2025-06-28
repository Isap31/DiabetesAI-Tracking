# AuroraFlow - AI-Powered Diabetes Management

A comprehensive React + TypeScript application for diabetes management with AI-powered glucose predictions, voice chat, and intelligent health insights.

## 🚀 Features

- **AI-Powered Glucose Predictions** - Machine learning model for glucose forecasting
- **FlowSense AI Voice Chat** - ElevenLabs-powered conversational AI assistant
- **Comprehensive Health Tracking** - Meals, exercise, glucose, and mood logging
- **Dark Mode & Accessibility** - Full accessibility support with multiple themes
- **Multi-language Support** - 11 languages including RTL support
- **Real-time Analytics** - Interactive charts and health insights
- **Premium Subscription** - RevenueCat integration for premium features
- **Mobile-First Design** - Responsive design optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with dark mode
- **Icons**: Lucide React
- **Backend**: Supabase (Auth + Database)
- **AI Services**: ElevenLabs (Voice), Custom ML Model (Predictions)
- **Payments**: RevenueCat
- **Testing**: Jest + React Testing Library

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd AuroraFlow/DiabetesAI-Tracking

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

## 🧪 Testing

AuroraFlow includes comprehensive testing with Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui

# Run tests for CI/CD
npm run test:ci
```

### Test Structure

```
src/
├── __tests__/                    # Integration tests
│   └── integration.test.tsx
├── components/
│   └── __tests__/               # Component tests
│       ├── Sidebar.test.tsx
│       ├── ProgressChart.test.tsx
│       └── FlowSenseAI.test.tsx
├── hooks/
│   └── __tests__/               # Hook tests
│       ├── useGoals.test.ts
│       └── useGroceryList.test.ts
├── services/
│   └── __tests__/               # Service tests
│       └── predictiveModelService.test.ts
└── utils/
    └── __tests__/               # Utility tests
        └── translations.test.ts
```

### Test Coverage

The test suite covers:

- ✅ **Component Testing** - UI interactions, props, state changes
- ✅ **Hook Testing** - Custom hooks, state management
- ✅ **Service Testing** - API calls, error handling
- ✅ **Integration Testing** - End-to-end user flows
- ✅ **Accessibility Testing** - ARIA labels, keyboard navigation
- ✅ **Error Handling** - Network errors, validation
- ✅ **Responsive Design** - Mobile/desktop layouts

### Writing Tests

#### Component Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

#### Hook Test Example

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook());
    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(1);
  });
});
```

### Test Configuration

The testing setup includes:

- **Jest Configuration** (`jest.config.js`) - TypeScript support, coverage thresholds
- **Test Setup** (`src/setupTests.ts`) - Global mocks, DOM matchers
- **Mock Files** (`src/__mocks__/`) - Static asset mocks
- **Coverage Thresholds** - 70% minimum coverage required

### Continuous Integration

Tests run automatically on:

- **Pull Requests** - Full test suite + coverage
- **Main Branch** - Integration tests + deployment checks
- **Pre-commit** - Linting + unit tests

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── lib/                # Third-party library configs
├── types/              # TypeScript type definitions
└── __tests__/          # Test files
```

### Key Components

- **App.tsx** - Main application component
- **Sidebar.tsx** - Desktop navigation
- **TabNavigation.tsx** - Mobile navigation
- **ProgressChart.tsx** - AI predictions visualization
- **FlowSenseAI.tsx** - Voice chat interface
- **TrackingTab.tsx** - Health data logging

### Environment Variables

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# ElevenLabs
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_ELEVENLABS_VOICE_ID=your_voice_id

# RevenueCat
VITE_REVENUECAT_API_KEY=your_revenuecat_api_key
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📱 Mobile App

AuroraFlow is designed as a Progressive Web App (PWA) with:

- **Offline Support** - Service worker for offline functionality
- **Mobile Optimization** - Touch-friendly UI, responsive design
- **App-like Experience** - Full-screen mode, splash screens
- **Push Notifications** - Health reminders and alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Write tests for all new features
- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Implement accessibility features
- Add proper error handling
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@auroraflow.com
- 💬 Discord: [AuroraFlow Community](https://discord.gg/auroraflow)
- 📖 Documentation: [docs.auroraflow.com](https://docs.auroraflow.com)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/auroraflow/issues)

## 🙏 Acknowledgments

- ElevenLabs for voice AI technology
- Supabase for backend infrastructure
- RevenueCat for subscription management
- The diabetes community for feedback and testing
