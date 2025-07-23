# Garena Learning & Development Tools

A modern web application for managing and showcasing learning tools and best practices within Garena.

## Features

- **Tools Management**: Browse and search internal and external learning tools
- **Best Practice Showcase**: View innovative learning practices and success stories
- **Wishing Pool**: Submit and manage learning tool requests
- **Multi-language Support**: Chinese and English interface
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Data**: JSON files (tools.json, showcase.json)
- **Backend**: Google Apps Script for data export

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Data Management

The application uses two main data sources:

- `src/data/tools.json` - Learning tools and resources
- `src/data/showcase.json` - Best practice showcase items

Data is managed through Google Sheets and exported via Google Apps Script to GitHub.

## Project Structure

```
src/
├── components/     # React components
├── contexts/       # React contexts
├── data/          # JSON data files
├── hooks/         # Custom React hooks
└── utils/         # Utility functions
```

## Deployment

The application can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Internal use only - Garena Corporation