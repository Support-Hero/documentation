import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from 'vitest'
import Roster from '../Roster';
import allcontext from "../../context";
describe("Workers Component", () => {

    it('Roster page displays current week by default', () => {
        const user = { isManager: true } || { isManager: false }

        render(<BrowserRouter><Roster /></BrowserRouter>,{
            wrapper: ({ children }) => (
              <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
            ),
          }
        );

        const currentButton = screen.getByText('current');
        expect(currentButton).toHaveStyle({ color: 'ButtonText' }); // Check the default color

        fireEvent.click(currentButton);

        expect(currentButton).toHaveStyle({ color: 'rgb(255, 0, 0)' }); // Check if the color changes after clicking
    });

    it("Next week button changed the displayed week",()=>{
        const user = { isManager: true } || { isManager: false }

        render(<BrowserRouter><Roster /></BrowserRouter>,{
            wrapper: ({ children }) => (
              <allcontext.Provider value={[user]}>{children}</allcontext.Provider>
            ),
          });
        const nextWeekButton = screen.getByText('next week');
        expect(nextWeekButton).toHaveStyle({ color: 'ButtonText' }); // Check the default color
        
        fireEvent.click(nextWeekButton);
        
        expect(nextWeekButton).toHaveStyle({ color: 'rgb(255, 0, 0)' }); // Check if the color changes after clicking
        
    })

}
)