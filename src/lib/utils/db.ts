import { MONGO_DB_URI } from '@lib/constants/config.constants'
import mongoose from 'mongoose'

interface Connection {
  isConnected?: number
}

const connection: Connection = {}

const connectToDatabase = async () => {
  try {
    if (connection.isConnected) return
    if (!MONGO_DB_URI || typeof MONGO_DB_URI !== 'string' || MONGO_DB_URI.trim() === '') {
      throw new Error('MONGO_DB_URI is missing or empty. Cannot connect to database.')
    }

    const database = await mongoose.connect(MONGO_DB_URI)
    connection.isConnected = database.connections[0].readyState
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`)
  }
}

export default connectToDatabase
