import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/*testa CI/CD */
const app = express()
const PORT = process.env.PORT || 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.get('/health', (req, res) => {
    console.info('Health check genomförd')

    res.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.get('/api/error-demo', (req, res) => {
    console.error('Ett testfel inträffade')

    res.status(500).json({
        error: 'Detta är ett simulerat fel'
    })
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
    console.info(`Servern startade på port ${PORT}`)
})
