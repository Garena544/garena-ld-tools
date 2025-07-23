# Garena Learning & Development Tools

A beautiful, responsive website showcasing L&D tools and resources for Garena teams.

## Features

- 🌐 Bilingual support (English/Chinese)
- 📱 Fully responsive design
- 🔄 Auto-sync with Google Sheets via GitHub integration
- 🎨 Modern UI with Tailwind CSS
- ⚡ Built with React + TypeScript + Vite

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Google Sheets Integration

This website automatically syncs with Google Sheets data. The Google Apps Script pushes updates to `src/data/tools.json` whenever the sheet is modified.

### Sheet Structure
- Columns A-H: Chinese content (序号, 类型, 工具名称, 工具说明, 主要功能, 补充信息, 链接, 教学视频)
- Columns I-P: English content (S/N, Type, Tool Name, Description, Main Functions, Remarks, Link, Tutorial Link)

## Deployment

The site can be deployed to GitHub Pages or any static hosting service.

---

© 2024 Garena Learning & Development Division