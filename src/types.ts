type ConfigBase = {
  generateOnUpload: boolean
  validationLevel: 'warning' | 'error' | 'none'
  autoClearOnRemoveImage: boolean
}

export type AnthropicModels = 'claude-3-5-sonnet-20240620'
export type GoogleModels = 'gemini-1.5-flash' | 'gemini-1.5-pro'
export type OpenAiModels = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo'

type AnthropicLanguages =
  | 'chinese'
  | 'english'
  | 'french'
  | 'german'
  | 'hindi'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'polish'
  | 'portuguese'
  | 'russian'
  | 'spanish'
  | 'turkish'
type GoogleLanguages =
  | 'arabic'
  | 'bengali'
  | 'bulgarian'
  | 'chinese'
  | 'croatian'
  | 'czech'
  | 'danish'
  | 'dutch'
  | 'english'
  | 'estonian'
  | 'finnish'
  | 'french'
  | 'german'
  | 'greek'
  | 'hebrew'
  | 'hindi'
  | 'hungarian'
  | 'indonesian'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'latvian'
  | 'lithuanian'
  | 'norwegian'
  | 'polish'
  | 'portuguese'
  | 'romanian'
  | 'russian'
  | 'serbian'
  | 'slovak'
  | 'slovenian'
  | 'spanish'
  | 'swahili'
  | 'swedish'
  | 'thai'
  | 'turkish'
  | 'ukrainian'
  | 'vietnamese'
type OpenAiLanguages =
  | 'albanian'
  | 'amharic'
  | 'arabic'
  | 'armenian'
  | 'bengali'
  | 'bosnian'
  | 'bulgarian'
  | 'burmese'
  | 'catalan'
  | 'chinese'
  | 'croatian'
  | 'czech'
  | 'danish'
  | 'dutch'
  | 'english'
  | 'estonian'
  | 'finnish'
  | 'french'
  | 'georgian'
  | 'german'
  | 'greek'
  | 'gujarati'
  | 'hindi'
  | 'hungarian'
  | 'icelandic'
  | 'indonesian'
  | 'italian'
  | 'japanese'
  | 'kannada'
  | 'kazakh'
  | 'korean'
  | 'latvian'
  | 'lithuanian'
  | 'macedonian'
  | 'malay'
  | 'malayalam'
  | 'marathi'
  | 'mongolian'
  | 'norwegian'
  | 'persian'
  | 'polish'
  | 'portuguese'
  | 'punjabi'
  | 'romanian'
  | 'russian'
  | 'serbian'
  | 'slovak'
  | 'slovenian'
  | 'somali'
  | 'spanish'
  | 'swahili'
  | 'swedish'
  | 'tagalog'
  | 'tamil'
  | 'telugu'
  | 'thai'
  | 'turkish'
  | 'ukrainian'
  | 'urdu'
  | 'vietnamese'

export type ImageWithAiAltConfig = (
  | {
      provider: 'anthropic'
      model: AnthropicModels
      language: AnthropicLanguages
    }
  | {
      provider: 'google'
      model: GoogleModels
      language: GoogleLanguages
    }
  | {
      provider: 'openai'
      model: OpenAiModels
      language: OpenAiLanguages
    }
) &
  ConfigBase

export type ImageWithAiAltConfigInput = (
  | {
      /**
       * The AI provider to use for generating the alternative text
       *
       * Options are 'anthropic', 'google', or 'openai'
       */
      provider: 'anthropic'
      /**
       * The language model of the provider to use for generating the alternative text
       *
       * If provider is 'anthropic', the model can be one of the following:
       * - 'claude-3-5-sonnet-20240620'
       *
       * @defaultValue 'claude-3-5-sonnet-20240620' (if provider is 'anthro@pic')
       */
      model?: AnthropicModels
      /**
       * The language to use for generating the alternative text
       *
       * Available languages are based on the selected provider (see documentation for more details)
       *
       * @defaultValue 'english'
       */
      language?: AnthropicLanguages
    }
  | {
      /**
       * The AI provider to use for generating the alternative text
       *
       * Options are 'anthropic', 'google', or 'openai'
       */
      provider: 'google'
      /**
       * The language model of the provider to use for generating the alternative text
       *
       * If provider is 'google', the model can be one of the following:
       * - 'gemini-1.5-flash'
       * - 'gemini-1.5-pro'
       *
       * @defaultValue 'gemini-1.5-flash' (if provider is 'google')
       */
      model?: GoogleModels
      /**
       * The language to use for generating the alternative text
       *
       * Available languages are based on the selected provider (see documentation for more details)
       *
       * @defaultValue 'english'
       */
      language?: GoogleLanguages
    }
  | {
      /**
       * The AI provider to use for generating the alternative text
       *
       * Options are 'anthropic', 'google', or 'openai'
       */
      provider: 'openai'
      /**
       * The language model of the provider to use for generating the alternative text
       *
       * If provider is 'openai', the model can be one of the following:
       * - 'gpt-4o'
       * - 'gpt-4o-mini'
       * - 'gpt-4-turbo'
       *
       * @defaultValue 'gpt-4o-mini' (if provider is 'openai')
       */
      model?: OpenAiModels
      /**
       * The language to use for generating the alternative text
       *
       * Available languages are based on the selected provider (see documentation for more details)
       *
       * @defaultValue 'english'
       */
      language?: OpenAiLanguages
    }
) & {
  /**
   * If the alternative text should be generated automatically when the image is uploaded
   *
   * @defaultValue true
   */
  generateOnUpload?: ImageWithAiAltConfig['generateOnUpload']
  /**
   * The level of validation to apply when no alternative text is used
   *
   * @defaultValue 'warning'
   */
  validationLevel?: ImageWithAiAltConfig['validationLevel']
  /**
   * If the alternative text should be cleared when the image is removed
   *
   * @defaultValue true
   */
  autoClearOnRemoveImage?: ImageWithAiAltConfig['autoClearOnRemoveImage']
}
