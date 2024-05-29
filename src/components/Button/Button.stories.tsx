import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Placeholder,
  ShoppingBag,
  ShoppingCart,
} from "@phosphor-icons/react";

const ICONS = {
  "shopping-bag": <ShoppingBag />,
  "shopping-cart": <ShoppingCart />,
  info: <Info />,
  "right-arrow": <ArrowRight />,
  "left-arrow": <ArrowLeft />,
} as const;

const meta = {
  title: "Base Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    variant: "solid",
    children: "Button",
    disabled: false,
    square: false,
    reverse: false,
    loading: false,
  },
  argTypes: {
    children: {
      name: "label",
      description: "The value to be rendered inside the button",
      control: "text",
    },
    disabled: {
      description:
        "A boolean that represents whether the button is disabled or not",
      control: "boolean",
    },
    square: {
      description:
        "A boolean that represents whether the current button have equal paddings on all sides",
      control: "boolean",
    },
    variant: {
      description: "A value that represents the current button variant",
      control: "select",
      options: ["solid", "outlined", "ghost"] as const,
    },
    size: {
      description: "A value that represents the current button size",
      control: "select",
      options: ["sm", "base", "lg"] as const,
    },
    slotPrefix: {
      description:
        "A value that represents the element to be injected before the button children (select from these icons).",
      control: "select",
      options: Object.keys(ICONS),
    },
    slotSuffix: {
      description:
        "A value that represents the element to be injected after the button children (select from these icons).",
      control: "select",
      options: Object.keys(ICONS),
    },
    reverse: {
      description:
        "A value that represents whether the button color should be reversed or not",
      control: "boolean",
    },
    loading: {
      description:
        "A value that represents whether the button is in a loading state or not",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

/** A story that contains one button with the full control panel to adjust it however you like */
export const Default: Story = {
  render: (props) => (
    <div
      style={{
        background: props.reverse ? "var(--color-primary)" : "inherit",
        margin: "-20px",
        padding: "20px",
      }}
    >
      <Button
        {...props}
        slotPrefix={ICONS[props.slotPrefix as never] || undefined}
        slotSuffix={ICONS[props.slotSuffix as never] || undefined}
      />
    </div>
  ),
};

/** A showcase story with all the button variants and sizes rendered next to each other */
export const Showcase: Story = {
  render: (props) => {
    const sizes = meta.argTypes.size.options;
    const variants = meta.argTypes.variant.options;
    const placeholderIcon = <Placeholder />;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          justifyItems: "center",
          gap: "1.5rem",
          padding: "2rem",
          margin: "-20px",
          backgroundColor: props.reverse ? "var(--color-primary)" : "inherit",
        }}
      >
        {sizes.map((size) =>
          variants.map((variant) => (
            <Button
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
              disabled={props.disabled}
              reverse={props.reverse}
              loading={props.loading}
              slotPrefix={ICONS[props.slotPrefix as never] || placeholderIcon}
            >
              Button
            </Button>
          ))
        )}
        {sizes.map((size) =>
          variants.map((variant) => (
            <Button
              key={`${variant}-${size}-square`}
              variant={variant}
              size={size}
              square
              disabled={props.disabled}
              reverse={props.reverse}
              loading={props.loading}
              slotPrefix={ICONS[props.slotPrefix as never] || placeholderIcon}
              slotSuffix={ICONS[props.slotSuffix as never]}
            />
          ))
        )}
      </div>
    );
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    square: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};
