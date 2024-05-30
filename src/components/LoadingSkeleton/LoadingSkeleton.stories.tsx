import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export default {
  title: "Base Components/LoadingSkeleton",
  component: LoadingSkeleton,
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: "number",
    },
    width: {
      control: "number",
    },
    as: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    height: 100,
    width: 100,
    inline: false,
  },
} satisfies Meta<typeof LoadingSkeleton>;

type Story = StoryObj<typeof LoadingSkeleton>;

/** The default story to showcase the loading skeleton functionality */
export const Default: Story = {};

/** The default story to showcase the inline loading skeleton functionality */
export const Inline: Story = {
  args: {
    inline: true,
    height: "auto",
  },
  argTypes: {
    inline: {
      table: {
        disable: true,
      },
    },
  },
  render(props) {
    return (
      <p>
        This is an inline <LoadingSkeleton {...props} /> Loading Skeleton.
      </p>
    );
  },
};
