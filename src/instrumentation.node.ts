import {
  PINO_BATCHING,
  PINO_HOST,
  PINO_INTERVAL,
  PINO_LABEL,
} from '@lib/constants/config.constants'
import type { Logger } from 'pino'
import pino from 'pino'
import pinoLoki from 'pino-loki'
import { collectDefaultMetrics, Registry } from 'prom-client'


declare global {
  var logger: Logger | undefined

  var metrics:
    | {
        registry: Registry
      }
    | undefined
}

if (!PINO_HOST || !PINO_BATCHING || !PINO_INTERVAL || !PINO_LABEL) {
  throw new Error(
    'Pino configuration is not defined. Please set NEXT_PINO_HOST, NEXT_PINO_BATCHING, NEXT_PINO_INTERVAL and NEXT_PINO_LABEL in your environment/config.',
  )
}

try {
  const transport = pinoLoki({
    host: PINO_HOST,
    batching: PINO_BATCHING,
    interval: PINO_INTERVAL,
    labels: { app: PINO_LABEL },
  })

  const logger = pino(transport)
  globalThis.logger = logger

  const prometheusRegistry = new Registry()
  collectDefaultMetrics({
    register: prometheusRegistry,
  })

  globalThis.metrics = {
    registry: prometheusRegistry,
  }
} catch (error) {
  throw error
}
