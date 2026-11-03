import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { validateNumbers } from "./validation ";

// 1. Create an MCP server instance
const server = new McpServer({ name: "simple-calucalor-mcp-server", version: "1.0.0" })

// Register a tool

// 1. ADD
server.tool(
    "add_numbers",
    "Adds two numbers together",
    {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
    },
    async ({ a, b }) => {
        const error = validateNumbers(a, b);
        if (error) {

            return {
                isError: true,
                content: [{ type: "text", text: error }],
            };
        }

        const result = a + b;
        return {
            content: [{ type: "text", text: `The result of ${a} + ${b} is ${result}` }],
        };
    }
);

// 2. SUBTRACT
server.tool(
    "subtract_numbers",
    "Subtracts second number from first number (a - b)",
    {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number to subtract"),
    },
    async ({ a, b }) => {
        const error = validateNumbers(a, b);
        if (error) {
            return {
                isError: true,
                content: [{ type: "text", text: error }],
            };
        }

        const result = a - b;
        return {
            content: [{ type: "text", text: `The result of ${a} - ${b} is ${result}` }],
        };
    }
);

// 3. MULTIPLY
server.tool(
    "multiply_numbers",
    "Multiplies two numbers together",
    {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
    },
    async ({ a, b }) => {
        const error = validateNumbers(a, b);
        if (error) {
            return {
                isError: true,
                content: [{ type: "text", text: error }],
            };
        }

        const result = a * b;
        return {
            content: [{ type: "text", text: `The result of ${a} * ${b} is ${result}` }],
        };
    }
);

// 4. DIVIDE
server.tool(
    "divide_numbers",
    "Divides first number by second number (a / b)",
    {
        a: z.number().describe("Numerator"),
        b: z.number().describe("Denominator"),
    },
    async ({ a, b }) => {
        const error = validateNumbers(a, b);
        if (error) {
            return {
                isError: true,
                content: [{ type: "text", text: error }],
            };
        }

        if (b === 0) {
            return {
                isError: true,
                content: [{ type: "text", text: "Division by zero is undefined." }],
            };
        }

        const result = a / b;
        return {
            content: [{ type: "text", text: `The result of ${a} / ${b} is ${result}` }],
        };
    }
);

// 5. POWER
server.tool(
    "power_numbers",
    "Raises base number to exponent power (base ^ exponent)",
    {
        base: z.number().describe("Base number"),
        exponent: z.number().describe("Exponent power"),
    },
    async ({ base, exponent }) => {
        const error = validateNumbers(base, exponent);
        if (error) {
            return {
                isError: true,
                content: [{ type: "text", text: error }],
            };
        }

        const result = Math.pow(base, exponent);

        if (Number.isNaN(result) || !Number.isFinite(result)) {
            return {
                isError: true,
                content: [{ type: "text", text: `Calculation resulted in an invalid result (${result}).` }],
            };
        }

        return {
            content: [{ type: "text", text: `The result of ${base} ^ ${exponent} is ${result}` }],
        };
    }
);

// 6. GREET USER
server.tool("greet_user", "Greets the user with a personalized message", {
    name: z.string().describe("Name of the user to greet"),
},
    async ({ name }) => {
        return { content: [{ type: "text", text: `Hello, ${name}! Welcome to the Simple Calculator MCP Server.` }] }
    })

// 7. Start the server using Standard Input/Output transport (stdin/stdout)
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((err) => {
    console.error("Error starting the server:", err);
    process.exit(1);
})
