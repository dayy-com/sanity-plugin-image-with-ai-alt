import {defineField, definePlugin, defineType} from 'sanity'

import AltTextInput from './components/AltTextInput'
import ImageInput from './components/ImageInput'
import InvalidConfig from './components/InvalidConfig'
import {getConfig, setConfig, validateConfigInput} from './config'
import type {ImageWithAiAltConfigInput} from './types'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {imageWithAiAlt} from 'sanity-plugin-image-with-ai-alt'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [
 *     imageWithAiAlt({
 *       // Configuration options
 *     })
 *   ],
 * })
 * ```
 *
 * @beta
 */
export const imageWithAiAlt = definePlugin<ImageWithAiAltConfigInput>((config) => {
  const result = validateConfigInput(config)

  setConfig(config)

  const finalConfig = getConfig()

  return {
    name: 'image-with-ai-alt',

    schema: {
      types: [
        defineType({
          name: 'imageWithAiAlt',
          type: 'image',

          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',

              validation: (Rule) => {
                if (finalConfig.validationLevel === 'error') {
                  return Rule.required()
                }

                if (finalConfig.validationLevel === 'warning') {
                  return Rule.required().warning('It’s recommended to provide an alternative text')
                }

                return Rule.custom(() => true)
              },

              components: {
                input: AltTextInput,
              },
            }),
          ],

          options: {
            accept: 'image/jpeg, image/png, image/webp',
          },

          components: {
            input: result.status === 'error' ? InvalidConfig : ImageInput,
          },

          ...(result.status === 'error' && {
            pluginErrors: result.errors,
          }),
        }),
      ],
    },
  }
})
