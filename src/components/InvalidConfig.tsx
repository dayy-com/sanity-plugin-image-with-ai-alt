import {Box, Card, Stack, Text} from '@sanity/ui'
import type React from 'react'
import type {ImageValue, ObjectInputProps, ObjectSchemaType} from 'sanity'

export default function InvalidConfig(
  props: ObjectInputProps<ImageValue, ObjectSchemaType>,
): React.JSX.Element {
  return (
    <Card padding={4} tone="critical" radius={2} shadow={1}>
      <Box>
        <Text weight="medium">Invalid plugin configuration</Text>
      </Box>

      <Stack as="ul" marginTop={4} space={3}>
        {/* @ts-expect-error Property 'pluginErrors' does not exist on type 'ObjectSchemaType' */}
        {props.schemaType.pluginErrors.map((error: string) => (
          <li key={error}>
            <Text size={1} muted>
              {error}
            </Text>
          </li>
        ))}
      </Stack>
    </Card>
  )
}
