import { toContainText } from "./matchers/toContainText"
import { toHaveClass } from './matchers/toHaveClass' 

expect.extend({
    toContainText,
    toHaveClass
})
expect.extend({
    toBeCalledWith(received, ...expectedArguments) {
        if(received.receivedArguments() === undefined) {
            return {
                pass: false,
                message: () => "Spy was not called.",
            }
        }
        const notMatch = !this.equals(
            received.receivedArguments(),
            expectedArguments
        )

        if (notMatch) {
            return {
                pass: false,
                message: () =>
                    "Spy called with the wrong arguments: " + 
                    received.receivedArguments() +
                    ".",
            }
        }
        return {
            pass: true,
            message: () => "Spy was called.",
        }
    }
})