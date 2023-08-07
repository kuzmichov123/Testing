import React from "react";
import {
    initializeReactContainer,
    render,
    element,
    form,
    field,
    click,
    change,
    submit,
    submitButton,
    labelFor,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
    const originalFetch = global.fetch
    let fetchSpy
    const blankCustomer = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
    };

    beforeEach(() => {
        initializeReactContainer();
        fetchSpy =spy();
        global.fetch = fetchSpy.fn;
    });

    afterEach(() => {
        global.fetch = originalFetch
    })
    const spy = () => {
        let receivedArguments
    return {
        fn: (...args) => (receivedArguments = args),
        receivedArguments: () => receivedArguments,
        receivedArgument: n => receivedArguments[n]
    }
    }

    it("renders a form", () => {
        render(<CustomerForm original={blankCustomer} />);
        expect(form()).not.toBeNull();
    });

    it("renders a submit button", () => {
        render(<CustomerForm original={blankCustomer} />);
        expect(submitButton()).not.toBeNull();
    });

    const itRendersAsATextBox = (fieldName) =>
        it("renders as a text box", () => {
            render(<CustomerForm original={blankCustomer} />);
            expect(field(fieldName)).not.toBeNull();
            expect(field(fieldName).tagName).toEqual("INPUT");
            expect(field(fieldName).type).toEqual("text");
        });
    itRendersAsATextBox("firstName");
    const itIncludesTheExistingValue = (
        fieldName,
        existing
    ) =>
        it("includes the existing value", () => {
            const customer = { [fieldName]: existing };
            render(<CustomerForm original={customer} />);
            expect(field(fieldName).value).toEqual(
                existing
            );
        });

    const itRendersALabel = (fieldName, text) => {
        it("renders a label for the text box", () => {
            render(
                <CustomerForm original={blankCustomer} />
            );
            expect(labelFor(fieldName)).not.toBeNull();
        });

        it(`renders '${text}' as the label content`, () => {
            render(
                <CustomerForm original={blankCustomer} />
            );
            expect(labelFor(fieldName)).toContainText(text);
        });
    };

    const itAssignsAnIdThatMatchesTheLabelId = (
        fieldName
    ) =>
        it("assigns an id that matches the label id", () => {
            render(
                <CustomerForm original={blankCustomer} />
            );
            expect(field(fieldName).id).toEqual(fieldName);
        });

    const itSubmitsExistingValue = (fieldName, value) =>
        it("saves existing value when submitted", () => {
            const submitSpy = spy()
            const customer = { [fieldName]: value };
            render(
                <CustomerForm
                    original={customer}
                    onSubmit={submitSpy.fn}
                />
            );
            click(submitButton());

            expect(submitSpy).toBeCalled(customer)
        });

    const itSubmitsNewValue = (fieldName, value) =>
        it("saves new value when submitted", () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    original={blankCustomer}
                    onSubmit={(props) =>
                        expect(props[fieldName]).toEqual(value)
                    }
                />
            );
            change(field(fieldName), value);
            click(submitButton());
        });

    describe("first name field", () => {
        itRendersAsATextBox("firstName");
        itIncludesTheExistingValue(
            "firstName",
            "existingValue"
        );
        itRendersALabel("firstName", "First name");
        itAssignsAnIdThatMatchesTheLabelId("firstName");
        itSubmitsExistingValue(
            "firstName",
            "existingValue"
        );
        itSubmitsNewValue("firstName", "newValue");
    });

    describe("last name field", () => {
        itRendersAsATextBox("lastName");
        itIncludesTheExistingValue(
            "lastName",
            "existingValue"
        );
        itRendersALabel("lastName", "Last name");
        itAssignsAnIdThatMatchesTheLabelId("lastName");
        itSubmitsExistingValue(
            "lastName",
            "existingValue"
        );
        itSubmitsNewValue("lastName", "newValue");
    });

    describe("phone number field", () => {
        itRendersAsATextBox("phoneNumber");
        itIncludesTheExistingValue(
            "phoneNumber",
            "12345"
        );
        itRendersALabel("phoneNumber", "Phone number");
        itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
        itSubmitsExistingValue("phoneNumber", "12345");
        itSubmitsNewValue("phoneNumber", "67890");
    });

    it("prevents the default action when submitting the form", () => {
        render(
            <CustomerForm
                original={blankCustomer}
                onSubmit={() => { }}
            />
        );

        const event = submit(form());

        expect(event.defaultPrevented).toBe(true);
    });
    it('sends request to POST /customers when submitting the form', () => {
        render(
            <CustomerForm
                original={blankCustomer}
                onSubmit={() => { }}
            />
        );
        click(submitButton());
        expect(fetchSpy).toBeCalledWith(
            "/customers",
            expect.objectContaining({
                method: "POST",
            })
        )
    })
});