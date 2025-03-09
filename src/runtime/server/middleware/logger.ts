import {
  useRuntimeConfig,
  defineEventHandler,
  getRequestURL,
  readBody,
} from '#imports'

export default defineEventHandler(async (event) => {
  const { logger } = useRuntimeConfig()
  const logLevel = logger.logLevel

  if (logLevel === 'info' || logLevel === 'warn' || logLevel === 'error') {
    const inputRequests = {
      body: null,
    }

    if (event.method === 'POST' || event.method === 'PUT') {
      const body = await readBody(event)
      inputRequests.body = body
    }

    console.log(
      `[${new Date().toISOString()}] ${event.method} ${getRequestURL(event)}`,
      inputRequests,
    )
  }
})
