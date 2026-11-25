import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    supportFile: false,
    video: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
})
