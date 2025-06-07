import { Meta, StoryObj } from "@storybook/react";

import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import { ComponentProps } from "react";

export default {
  title: "Components/LoadingIndicator",
  component: LoadingIndicator,
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Indicate if data is still being loaded",
      defaultValue: false,
    },
    loadingText: {
      control: "text",
      description: "Text to display while loading ...",
    },
  },
} as Meta<typeof LoadingIndicator>;

type Story = StoryObj<typeof LoadingIndicator>;
type LoadingIndicatorProps = ComponentProps<typeof LoadingIndicator>;

export const Default: Story = {
  args: {
    isLoading: false,
    loadingText: "This text should not be shown",
  } as LoadingIndicatorProps,
};

export const IsLoadingTrue: Story = {
  args: {
    isLoading: true,
    loadingText:
      "This text should be shown while the data is being fetched ...",
  } as LoadingIndicatorProps,
};
