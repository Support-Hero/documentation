import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { BrowserRouter } from "react-router-dom";
import Login from "../login";
import { api } from '../../api'
import allcontext from "../../context";
describe("login component", () => {
  // Setup Mock Service Worker
  const server = setupServer(
    rest.get(api + "/login", (req, res, ctx) => {
      return res(
        ctx.json([
          { _id: "1", firstName: "John", token: "sdnwefidwu89u89*#(U$#$HBH" },
        ])
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("should render login page", async () => {
    const user = { isManager: true } || { isManager: false }

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,{
     wrapper: ({ children }) => (
      <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
    ),
  }

);
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sign In")

    fireEvent.change(emailInput, { target: { value: "km@g.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(submitButton);

    expect(emailInput.value).toBe("km@g.com");
    expect(passwordInput.value).toBe("1234");


  });
});
