import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addImportsDir,
} from '@nuxt/kit'
import defu from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  logLevel: 'none' | 'info' | 'warn' | 'error'
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'siste-logger',
    configKey: 'logger',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    logLevel: 'info',
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    const config = _nuxt.options.runtimeConfig as unknown as {
      logger: ModuleOptions
      public: Record<string, unknown>
    }

    config.logger = defu(config.logger || {}, {
      logLevel: _options.logLevel,
    })

    config.public = defu(config.public || {}, {
      logLevel: config.logger.logLevel,
    })

    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/logger'),
      middleware: true,
    })

    // Registrar el composable
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
