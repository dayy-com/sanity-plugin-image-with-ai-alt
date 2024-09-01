import type {
  AnthropicModels,
  GoogleModels,
  ImageWithAiAltConfig,
  ImageWithAiAltConfigInput,
  OpenAiModels,
} from './types'

let config: ImageWithAiAltConfig

export function validateConfigInput(
  input: ImageWithAiAltConfigInput,
): {status: 'success'} | {status: 'error'; errors: string[]} {
  const errors: string[] = []

  if (!process.env.SANITY_STUDIO_IMAGE_WITH_AI_ALT_API_KEY) {
    errors.push('Environment variable SANITY_STUDIO_IMAGE_WITH_AI_ALT_API_KEY is required')
  }

  if (!input.provider) {
    errors.push('Provider is required')
  }

  if (input.provider && !['anthropic', 'google', 'openai'].includes(input.provider)) {
    errors.push('Provider must be one of "anthropic", "google" or "openai"')
  }

  if (
    input.model &&
    ((input.provider === 'anthropic' && input.model !== 'claude-3-5-sonnet-20240620') ||
      (input.provider === 'google' &&
        !['gemini-1.5-flash', 'gemini-1.5-pro'].includes(input.model)) ||
      (input.provider === 'openai' &&
        !['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'].includes(input.model)))
  ) {
    errors.push('Invalid model for the selected provider')
  }

  if (input.generateOnUpload && typeof input.generateOnUpload !== 'boolean') {
    errors.push('generateOnUpload must be a boolean')
  }

  if (input.validationLevel && !['error', 'warning', 'none'].includes(input.validationLevel)) {
    errors.push('Validation level must be one of "error", "warning" or "none"')
  }

  if (input.autoClearOnRemoveImage && typeof input.autoClearOnRemoveImage !== 'boolean') {
    errors.push('autoClearOnRemoveImage must be a boolean')
  }

  if (errors.length) {
    return {
      status: 'error',
      errors,
    }
  }

  return {
    status: 'success',
  }
}

export function setConfig(newConfig: ImageWithAiAltConfigInput): void {
  let model: AnthropicModels | GoogleModels | OpenAiModels | undefined = newConfig.model

  if (!newConfig.model) {
    if (newConfig.provider === 'anthropic') {
      model = 'claude-3-5-sonnet-20240620'
    }

    if (newConfig.provider === 'google') {
      model = 'gemini-1.5-flash'
    }

    if (newConfig.provider === 'openai') {
      model = 'gpt-4o-mini'
    }
  }

  const defaultConfig = {
    language: 'english',
    generateOnUpload: true,
    validationLevel: 'none',
    autoClearOnRemoveImage: true,
  }

  config = {
    ...defaultConfig,
    ...newConfig,
    model,
  } as ImageWithAiAltConfig
}

export function getConfig(): ImageWithAiAltConfig {
  return config
}
