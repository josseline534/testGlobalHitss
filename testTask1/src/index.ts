import { AppDataSource } from './data-source'
import { configEnv } from './config'
import app from './app'

async function main (): Promise<void> {
  try {
    await AppDataSource.initialize()
    const port = configEnv.appPort
    app.listen(port)
    console.log(
      `Express server has started on port ${port}. Open http://localhost:${port}/ to see results`
    )
  } catch (error) {
    console.error(error)
  }
}
void main()
