import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

export default {
  title: "Base Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
    },
    title: {
      control: "text",
    },
    id: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    id: "1",
    content: "This is a toast",
    title: "Title",
    hasCloseButton: true,
  },
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {};
