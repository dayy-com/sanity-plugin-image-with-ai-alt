import type React from 'react'
import type {ImageValue, ObjectInputProps, ObjectSchemaType} from 'sanity'

export default function ImageInput(
  props: ObjectInputProps<ImageValue, ObjectSchemaType>,
): React.JSX.Element {
  return <div className="image-with-ai-alt">{props.renderDefault(props)}</div>
}
