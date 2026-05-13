# Sorensen Field - Mobile App

Internal company app for field technicians and office staff. iOS + Android with theme customization and accessibility features.

## Quick Start

```bash
npm install
npm start

# Scan QR code with Expo Go, or press i/a for iOS/Android
# Login: brian@sorensenhvac.com
```

## Features

✅ Dashboard (work orders, invoices, stats)
✅ Work Orders (assigned jobs, status)
✅ Invoices (view, manage)
✅ Scanner (QR/barcode)
✅ Profile (account, logout)
✅ Settings (theme, text size, zoom, 3D)

## Accessibility

- **Theme**: Light/Dark toggle
- **Text Size**: Small, Medium, Large
- **Zoom**: 80%, 100%, 120%, 140%
- **3D Head-Tracking**: Optional parallax (toggle)

## Build for Production

### iOS (TestFlight)
```bash
eas build --platform ios --profile testflight
eas submit --platform ios --latest
```

### Android
```bash
eas build --platform android --profile production
# Share APK link
```

## Real Data
Pulls from Supabase: work orders, invoices, items, profiles

## Updates
- iOS: TestFlight (automatic)
- Android: Firebase App Distribution or APK link
- macOS: Separate app (sorensen-office-mac)
