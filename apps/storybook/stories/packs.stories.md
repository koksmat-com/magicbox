import { Pack } from "@koksmat/powerpacks/src";
import { Meta, Story, Canvas, ArgsTable } from "@storybook/addon-docs"
import { DocumentUpload } from "@koksmat/react-components"

<Meta title="Packs/Button" component={Pack} />

# Pack

A `pack` is an artifact consiting of a PowerShell script and a TypeScript class describing it.

## Props
The properties

<ArgsTable of={Pack} />

## Examples

<Canvas>
  <Story name="Default">
    <Pack name="sharedmailbox">Helloer</Pack>
  </Story>
</Canvas>


<Canvas>
  <Story name="With a custom icon">
    <DocumentUpload />
  </Story>
