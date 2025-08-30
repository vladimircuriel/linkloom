import { MONGO_DB_URI } from '@lib/constants/config.constants'
import mongoose from 'mongoose'

interface Connection {
  isConnected?: number
}

const connection: Connection = {}

const connectToDatabase = async () => {
  try {
    if (connection.isConnected) return

    const mongoURI = MONGO_DB_URI || ''
    const database = await mongoose.connect(mongoURI)
    connection.isConnected = database.connections[0].readyState
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`)
  }
}

export default connectToDatabase
