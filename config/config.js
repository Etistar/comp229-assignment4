import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(new URL('../server/package.json', import.meta.url))
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../server/.env') })

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-me',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/Portfolio'
}

export default config
