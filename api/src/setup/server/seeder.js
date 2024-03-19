// App imports
import { connect, close, drop } from 'setup/server/database'

// Seeder
async function seeder() {
  console.log('SEED - Started')

  // Connect database
  await connect()

  // Clear database (runs only in development)
  await drop()

  // Seeds

  // Close database
  await close()

  console.log('SEED - Complete. ✅')
}

// Run seeder
seeder()
