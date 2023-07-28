import React from "react"
import ReactDOM from "react-dom/client"
import {App} from '../src/App'
import { act } from "react-dom/test-utils"

describe("Appointment", () => {
  let container;
  beforeEach(() => {
      container = document.createElement("div");
      document.body.replaceChildren(container);
  });
  const render = component =>
  act(() => 
  ReactDOM.createRoot(container).render(component)
  )
  it("renders the customer first name", () => {
    const customer = { firstName: 'Ashley' };
    render(<App customer={customer}/>)
    expect(document.body.textContent).toContain(
      'Ashley'
    );
  });
  it ("renders another customer first name", () => {
      const customer = { firstName: "Jordan" };
      render (<App customer={customer}/>)
      expect(document.body.textContent).toContain(
        'Jordan'
      );
    });
});