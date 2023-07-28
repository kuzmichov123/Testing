import React from "react";
import ReactDOM from "react-dom/client";
import {App} from './App'
import { act } from "react-dom/test-utils";

describe("Appointment", () => {
  it("renders the customer first name", () => {
      const customer = { firstName: 'Ashley' };
      const component = (
        <App customer={customer} />
      );
      const container = document.createElement("div");
      document.body.appendChild(container);
      act(() => 
        ReactDOM.createRoot(container).render(component)
      )

      expect(document.body.textContent).toContain(
        'Ashley'
      );
    });
});