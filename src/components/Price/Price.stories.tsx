import type { Meta, StoryObj } from "@storybook/react";
import { Price } from "./Price";

export default {
  title: "Base Components/Price",
  component: Price,
  tags: ["autodocs"],
  argTypes: {
    slotPrefix: {
      control: "text",
    },
    slotSuffix: {
      control: "text",
    },
    value: {
      control: "number",
    },
    as: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    value: 100,
    slotPrefix: "",
    slotSuffix: "",
  },
} satisfies Meta<typeof Price>;

type Story = StoryObj<typeof Price>;

export const Default: Story = {};
