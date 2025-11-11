import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scraperRoutes from './routes/scraper';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/scraper', scraperRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Instagram Profile Scraper API',
    version: '1.0.0',
    endpoints: {
      health: '/api/scraper/health',
      scrapeProfile: 'POST /api/scraper/profile',
      scrapeProfiles: 'POST /api/scraper/profiles',
    },
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║   Instagram Profile Scraper Server               ║
║   Running on http://localhost:${PORT}             ║
╚═══════════════════════════════════════════════════╝
  `);
});

export default app;
