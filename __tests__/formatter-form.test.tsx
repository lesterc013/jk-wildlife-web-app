import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import MessageFormatterPage from "@/components/MessageFormatterForm/MessageFormatterPage";

describe("Formatter form", () => {
  test("Click empty formatter form will not send form and display 'Message is required!' message", async () => {
    const user = userEvent.setup();

    render(<MessageFormatterPage />);

    const formatButton = screen.getByRole("button", { name: /format/i });

    await user.click(formatButton);

    expect(screen.getByText("Message is required!")).toBeInTheDocument();

    // screen.debug();
  });
});
