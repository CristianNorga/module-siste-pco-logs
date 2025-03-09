import {
  useRuntimeConfig,
} from '#app'

export function useLogger() {
  const config = useRuntimeConfig() as unknown as { public: { logLevel: 'none' | 'info' | 'warn' | 'error' } }

  const logInfo = (message: string) => {
    if (config.public.logLevel === 'info')
      console.log(`[Frontend Log - ${new Date().toISOString()}]: ${message}`)
  }

  return { logInfo }
}
