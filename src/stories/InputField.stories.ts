import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { InputField } from "@/app/components/InputField";

export default {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the input field",
    },
    onChange: {
      action: "changed",
      description: "Function to call when the input value changes",
    },
    value: {
      control: "text",
      description: "Value of the input field",
    },
    type: {
      control: "text",
      description: "Type of information in this field",
    },
    hasError: {
      control: "boolean",
      description: "Indicates if the field has an error",
    },
  },
} as Meta<typeof InputField>;

type Story = StoryObj<typeof InputField>;
type InputFieldProps = ComponentProps<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Input field",
    value: "",
    onChange: (value: string) => console.log("Input changed:", value),
  } as InputFieldProps,
};

export const ErrorField: Story = {
  args: {
    label: "Input field with error",
    value: "",
    onChange: (value: string) => console.log("Input changed:", value),
    type: "text",
    hasError: true,
  } as InputFieldProps,
};
