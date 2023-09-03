import React from 'react';
import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from 'vitest'
import Sidebar from '../Sidebar';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar Component', () => {
//   it('renders correctly', () => {
//     const { container } = render(<BrowserRouter>
//         <Sidebar />
//         </BrowserRouter>)
//     expect(container).toMatchSnapshot();
//   });

    it("should render side link bar",()=>{
        render(<BrowserRouter>
        <Sidebar />
        </BrowserRouter>)
        expect(screen.getAllByLabelText("sidebar_link")).toHaveLength(4)
    })
  it('changes value when a list item is clicked', () => {
    const { getByText, getByTestId } = render(
    <BrowserRouter>
        <Sidebar />
        </BrowserRouter>)

    const listItem = getByText('workers'); // Replace with an actual list title
    fireEvent.click(listItem);

    const sidebar = screen.getAllByLabelText("sidebar_link")
    // expect(sidebar).toHaveStyle('transform: translate(10%, 0)');
  });
});