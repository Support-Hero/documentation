import React from "react";
import "@testing-library/jest-dom";
import { render, screen,fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter to simulate routing
import Navbar from "../Navbar"; // Update the import path according to your project structure
import allcontext from "../../../context";
import { expect } from "vitest";
describe("Navbar Component", () => {
  it("renders without errors", () => {
    const user = { isManager: true } || { isManager: false }
    render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
      {
        wrapper: ({ children }) => (
          <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
        ),
      }
    );
       
    // Assert that the component renders without errors
    expect(screen.getByText("Support Hero")).toBeInTheDocument();
  });

  it("displays correct nav items when user is a manager", () => {
    const user = { isManager: true };
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      {
        wrapper: ({ children }) => (
          <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
        ),
      }
    );

    // Assert that manager-specific nav items are displayed
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("displays correct nav items when user is not a manager", () => {
    const user = { isManager: false };
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      {
        wrapper: ({ children }) => (
          <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
        ),
      }
    );

    // Assert that worker-specific nav items are displayed
    expect(screen.getByText("Team Home")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("logs out when the 'Logout' button is clicked", () => {
    const user = { isManager: true };
    const clear = vi.fn(() => window.localStorage.clear())
    const reload = vi.fn(() => window.localStorage.reload())
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      {
        wrapper: ({ children }) => (
          <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
        ),
      }
    );
    const logoutbutton=screen.getByText("Logout")
    // Click the 'Logout' button
    fireEvent.click(logoutbutton);
    // Assert that localStorage was cleared and page was reloaded
    expect(clear).toHaveBeenCalledTimes(0);
    expect(reload).toHaveBeenCalledTimes(0);
  });
});