import React from "react";
import { Open_Sans } from "next/font/google";

import type { Preview } from "@storybook/react";
import "@/infrastructure/styles/global/index.scss";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={openSans.className}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
