import { MONGO_DB_URI } from '@lib/constants/config.constants'
import mongoose from 'mongoose'

interface Connection {
  isConnected?: number
}

const connection: Connection = {}

export const connectToDatabase = async () => {
  if (connection.isConnected) {
    return mongoose.connection
  }

  const mongoURI = MONGO_DB_URI
  if (!mongoURI) {
    throw new Error('MONGO environment variable is missing')
  }

  try {
    const db = await mongoose.connect(mongoURI)
    connection.isConnected = db.connections[0].readyState
    return db.connection
  } catch (error) {
    throw new Error(`Database connection failed: ${error}`)
  }
}
