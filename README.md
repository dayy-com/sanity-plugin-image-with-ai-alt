# sanity-plugin-image-with-ai-alt

<a href="https://www.npmjs.com/package/sanity-plugin-image-with-ai-alt"><img src="https://img.shields.io/npm/dt/sanity-plugin-image-with-ai-alt.svg" alt="Total Downloads"></a>
<a href="https://github.com/dayy-com/sanity-plugin-image-with-ai-alt/releases"><img src="https://img.shields.io/npm/v/sanity-plugin-image-with-ai-alt.svg" alt="Latest Release"></a>
<a href="https://github.com/dayy-com/sanity-plugin-image-with-ai-alt/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/sanity-plugin-image-with-ai-alt.svg" alt="License"></a>

> [!CAUTION]
> This package is currently in beta. Use at your own risk. Breaking changes may occur.

> [!NOTE]
> This is a Sanity Studio v3 plugin – there is no version for v2.

## Installation

```sh
npm install sanity-plugin-image-with-ai-alt
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {imageWithAiAlt} from 'sanity-plugin-image-with-ai-alt'

export default defineConfig({
  //...
  plugins: [imageWithAiAlt({
    // Configuration options (see below)
  })],
})
```

You can now use the `imageWithAiAlt` type in your schema – for example:

```ts
import {defineField, defineType} from 'sanity'

export const schemaTypes = [
  defineType({
    name: 'testPage',
    type: 'document',
    fields: [
      defineField({
        name: 'myImage',
        type: 'imageWithAiAlt',
      }),
    ],
  }),
]
```

Since the `imageWithAiAlt` type extends the [Sanity `image` type](https://www.sanity.io/docs/image-type), you can use all the options of the `image` type as well.

> [!TIP]
> We recommend to not change the `accept` option (which is set to `image/jpeg, image/png, image/webp` by default) since the AI services may not support other formats.

## Configuration

| Key                      | Values                            | Default             | Mandatory           | Description                                           |
| ------------------------ | --------------------------------- | ------------------- | ------------------- | ----------------------------------------------------- |
| `provider`               | `anthropic`, `google` or `openai` | none                | yes                 | AI service provider                                   |
| `model`                  | depends on provider               | depends on provider | no                  | Language model you want to use                        |
| `language`               | depends on provider               | `english`           | no                  | Language of the generated text                        |
| `generateOnUpload`       | `true` or `false`                 | `true`              | no                  | Generate alt text automatically an image is uploaded  |
| `validationLevel`        | `error`, `warning` or `none`      | `none`              | no                  | Level of validation for the alt text                  |
| `autoClearOnRemoveImage` | `true` or `false`                 | `true`              | no                  | Clear alt text automatically when an image is removed |

### Anthropic

If you choose `anthropic` as the provider, you can only use `claude-3-5-sonnet-20240620` as the model (which is the default and can be omitted).

<details>
<summary><strong>Supported languages</strong></summary>

Following languages are supported:
- `chinese`
- `english`
- `french`
- `german`
- `hindi`
- `italian`
- `japanese`
- `korean`
- `polish`
- `portuguese`
- `russian`
- `spanish`
- `turkish`
</details>

### Google

If you choose Google as the provider, you can use the following models:
- `gemini-1.5-flash`
- `gemini-1.5-pro`

<details>
<summary><strong>Supported languages</strong></summary>

- `arabic`
- `bengali`
- `bulgarian`
- `chinese`
- `croatian`
- `czech`
- `danish`
- `dutch`
- `english`
- `estonian`
- `finnish`
- `french`
- `german`
- `greek`
- `hebrew`
- `hindi`
- `hungarian`
- `indonesian`
- `italian`
- `japanese`
- `korean`
- `latvian`
- `lithuanian`
- `norwegian`
- `polish`
- `portuguese`
- `romanian`
- `russian`
- `serbian`
- `slovak`
- `slovenian`
- `spanish`
- `swahili`
- `swedish`
- `thai`
- `turkish`
- `ukrainian`
- `vietnamese`
</details>

### OpenAI

If you choose OpenAI as the provider, you can use the following models:
- `gpt-4o`
- `gpt-4o-mini`
- `gpt-4-turbo`

<details>
<summary><strong>Supported languages</strong></summary>

- `albanian`
- `amharic`
- `arabic`
- `armenian`
- `bengali`
- `bosnian`
- `bulgarian`
- `burmese`
- `catalan`
- `chinese`
- `croatian`
- `czech`
- `danish`
- `dutch`
- `english`
- `estonian`
- `finnish`
- `french`
- `georgian`
- `german`
- `greek`
- `gujarati`
- `hindi`
- `hungarian`
- `icelandic`
- `indonesian`
- `italian`
- `japanese`
- `kannada`
- `kazakh`
- `korean`
- `latvian`
- `lithuanian`
- `macedonian`
- `malay`
- `malayalam`
- `marathi`
- `mongolian`
- `norwegian`
- `persian`
- `polish`
- `portuguese`
- `punjabi`
- `romanian`
- `russian`
- `serbian`
- `slovak`
- `slovenian`
- `somali`
- `spanish`
- `swahili`
- `swedish`
- `tagalog`
- `tamil`
- `telugu`
- `thai`
- `turkish`
- `ukrainian`
- `urdu`
- `vietnamese`
</details>

## API key

If not already done, you need to need to create a `.env` file in the root of your Sanity Studio project.

Please provide the API key of the selected provider in the environment variable `SANITY_STUDIO_IMAGE_WITH_AI_ALT_API_KEY`.

> [!IMPORTANT]
> Since the Sanity Studio is a client-side application, your API key will be exposed to the client. Make sure to restrict the usage of the API key to your domain. For more information, see the [Sanity documentation](https://www.sanity.io/docs/environment-variables).

### Anthropic

You can generate API keys in your [Account Settings](https://console.anthropic.com/account/keys).

### Google

You can generate API keys in your [Google Cloud Console](https://console.cloud.google.com/apis/credentials). You need to enable the [Generative Language API](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com).

### OpenAI

You can generate API keys in your [OpenAI Account](https://platform.openai.com/api-keys).

## Privacy

For more information about the privacy policies of the AI service providers and their data processing, see the following links:

- [Anthropic](https://support.anthropic.com/en/collections/4078534-privacy-legal)
- [Google](https://ai.google.dev/gemini-api/terms)
- [OpenAI](https://openai.com/policies/privacy-policy)

## License

[MIT](LICENSE) © dayy

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit) with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio) on how to run this plugin with hotreload in the studio.
