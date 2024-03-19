// Imports
import ip from 'ip'
import mongoose from 'mongoose'

// App Imports
import { PORT, NODE_ENV } from 'setup/config/env'
import systemCreate from 'modules/system/mutation/create'

// Start server
export default async function (server) {
  console.info('SETUP - Starting server..')

  if(NODE_ENV === 'production') {
    await systemCreate({ params: { event: 'Starting server..' } })
  }

  server.set('trust proxy', true)

  const serverProcess = server.listen(PORT, async (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')

      if(NODE_ENV === 'production') {
        await systemCreate({ params: { event: `ERROR - Unable to start server. ${ error.message }` } })
      }
    } else {
      console.info(`INFO - Server started on`)
      console.info(`  Local   http://localhost:${ PORT } [${ NODE_ENV }]`)
      console.info(`  Network http://${ ip.address() }:${ PORT } [${ NODE_ENV }]`)
      console.info(`  Datetime ${ new Date() }\n`)

      if(NODE_ENV === 'production') {
        await systemCreate({ params: { event: 'Server started' } })
      }
    }
  })

  // Stop Server
  for(let signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, async () => {
      console.info('INFO - Shutting down server..')

      if(NODE_ENV === 'production') {
        await systemCreate({ params: { event: 'Shutting down server..' } })
      }

      serverProcess.close(async () => {
        console.info('INFO - Server has been shut down.')

        if(NODE_ENV === 'production') {
          await systemCreate({ params: { event: 'Server has been shut down' } })
        }

        mongoose.connection.close(false, async () => {
          console.info('INFO - Database disconnected.')
          process.exit(0)
        })
      })
    })
  }
}
