import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { InputMessageBox } from "@/app/components/InputMessageBox";

export default {
  title: "Components/InputMessageBox",
  component: InputMessageBox,
  tags: ["autodocs"],
  argsTypes: {
    onClickAction: {
      action: "clicked",
      description: "Function to call when the Enter key is pressed",
    },
  } as Meta,
};

type Story = StoryObj<typeof InputMessageBox>;
type InputMessageBoxProps = ComponentProps<typeof InputMessageBox>;

export const Default: Story = {
  args: {
    onClickAction: () => console.log("Message sent!"),
  } as InputMessageBoxProps,
} as Story;
