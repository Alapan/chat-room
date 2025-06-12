import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from "@/app/components/ErrorMessage";

export default {
  title: "Components/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "text",
      description: "Error message",
    },
  },
} as Meta<typeof ErrorMessage>;

type Story = StoryObj<typeof ErrorMessage>;
type ErrorMessageProps = ComponentProps<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    error: "This is an error message!",
  } as ErrorMessageProps,
};

export const FormattedErrorMessage: Story = {
  args: {
    error: `
      1. This is error message number 1.
      2. This is error message number 2.
      3. This is the third error message which follows 1 and 2.
    `,
  } as ErrorMessageProps,
};
