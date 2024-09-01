import {type AnthropicProvider, createAnthropic} from '@ai-sdk/anthropic'
import {createGoogleGenerativeAI, type GoogleGenerativeAIProvider} from '@ai-sdk/google'
import {createOpenAI, type OpenAIProvider} from '@ai-sdk/openai'
import {SpinnerIcon} from '@sanity/icons'
import {Box, Button, Flex, TextInput, useToast} from '@sanity/ui'
import {generateText} from 'ai'
import type React from 'react'
import {useCallback, useEffect, useRef, useState} from 'react'
import {set, type StringInputProps, unset} from 'sanity'
import styled from 'styled-components'

import {getConfig} from '../config'

const StyledButton = styled(Button)`
  &.loading {
    svg {
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

export default function AltTextInput(props: StringInputProps): React.JSX.Element {
  const config = getConfig()
  let provider: AnthropicProvider | GoogleGenerativeAIProvider | OpenAIProvider | undefined

  if (config.provider === 'anthropic')
    provider = createAnthropic({apiKey: process.env.SANITY_STUDIO_IMAGE_WITH_AI_ALT_API_KEY})
  if (config.provider === 'google')
    provider = createGoogleGenerativeAI({
      apiKey: process.env.SANITY_STUDIO_IMAGE_WITH_AI_ALT_API_KEY,
    })
  if (config.provider === 'openai')
    provider = createOpenAI({apiKey: process.env.SANITY_STUDIO_IMAGE_WITH_AI_ALT_API_KEY})

  const ref = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState<string | undefined>(props.value)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<ArrayBuffer | null>(null)

  const toast = useToast()

  const storeValue = useCallback(
    (newValue: string) => {
      setValue(newValue)
      props.onChange(newValue ? set(newValue) : unset())
    },
    [props],
  )

  const generate = useCallback(async () => {
    if (!image || !provider) return

    setIsLoading(true)

    try {
      const {text} = await generateText({
        model: provider(config.model),
        system: `You describe the provided image in detail for visually impaired people with less than 150 characters in ${config.language}.`,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                image: image,
              },
            ],
          },
        ],
      })

      storeValue(text.trim())
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Error generating alt text',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred. Please try again.',
      })

      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, [config.language, config.model, image, provider, storeValue, toast])

  useEffect(() => {
    const fileTargetElement: HTMLDivElement | null | undefined = ref.current
      ?.closest('.image-with-ai-alt')
      ?.querySelector('[data-testid="change-bar-wrapper"]')

    if (!fileTargetElement) return undefined

    async function getUploadedImage() {
      const uploadedImage = ref.current?.closest('.image-with-ai-alt')?.querySelector('img')

      if (!uploadedImage) {
        setImage(null)

        if (config.autoClearOnRemoveImage) {
          storeValue('')
        }

        return
      }

      const res = await fetch(uploadedImage!.src)
      const blob = await res.blob()
      const buffer = await new Response(blob).arrayBuffer()

      setImage(buffer)

      if (config.generateOnUpload) {
        generate()
      }
    }

    const mo = new MutationObserver(getUploadedImage)
    mo.observe(fileTargetElement, {
      childList: true,
      subtree: true,
    })

    return () => mo.disconnect()
  }, [config.autoClearOnRemoveImage, config.generateOnUpload, generate, storeValue])

  return (
    <Flex ref={ref} gap={1}>
      <Box flex={1}>
        <TextInput
          value={value}
          disabled={isLoading}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={(event) => storeValue(event.currentTarget.value)}
        />
      </Box>

      <StyledButton
        className={isLoading ? 'loading' : ''}
        text="Generate ✨"
        icon={isLoading ? SpinnerIcon : undefined}
        mode="ghost"
        disabled={!image || isLoading}
        onClick={generate}
      />
    </Flex>
  )
}
