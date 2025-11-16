# Collify Deployment Instructions (Nixpacks)

## Quick Deploy

Push your code to Git and connect to Collify. Nixpacks will automatically:
1. Detect Node.js project
2. Run `npm install`
3. Run `npm run build`
4. Start the server with `npm start`

## Configuration

The project includes `nixpacks.toml` for optimal Collify deployment:
- **Build Command**: `npm run build`
- **Start Command**: `serve build -l $PORT`
- **Node Version**: 18.x
- **Framework**: Vite (auto-detected)

## Build Output

```
build/
├── index.html          # Main entry point (relative paths)
├── assets/            # All JS, CSS, and images
│   ├── vendor-*.js    # React & React DOM (141KB)
│   ├── ui-*.js        # Radix UI components (59KB)
│   ├── index-*.js     # Main app code (385KB)
│   └── index-*.css    # Styles (45KB)
├── images/            # Public images
└── videos/            # Public videos
```

## Environment Variables

No environment variables required for basic deployment.

## Routing

The `serve` package handles SPA routing automatically - all routes redirect to `index.html`.

## Performance Optimizations

- ✅ Code splitting enabled (vendor, ui, main chunks)
- ✅ ESBuild minification
- ✅ Relative paths for CDN compatibility
- ✅ Gzip compression (174KB gzipped total JS)

---

**Deploy**: Just push to your Git repository and Collify + Nixpacks handles the rest!
