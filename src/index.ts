import { app } from './app'
import { envConfig } from './config/envConfig'

const server = app.listen(envConfig.port, function () {
  console.log(`Web application is listening on port ${envConfig.port}`)
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      // logger.info('Server closed');
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = () => {
  // logger.error(error);
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  // logger.info('SIGTERM received');
  if (server) {
    server.close()
  }
})
