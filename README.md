# 🧮 Model Context Protocol (MCP) Calculator & Greeting Server

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![MCP Protocol](https://img.shields.io/badge/MCP-SDK-blue?style=flat-square)
![Zod](https://img.shields.io/badge/Validation-Zod-3E67B1?style=flat-square)
![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)

A lightweight, robust **Model Context Protocol (MCP)** server implementation built with **TypeScript** and **Node.js**. 

This server acts as a standardized tool execution provider for Large Language Model (LLM) clients (e.g., Claude Desktop, Cursor), exposing strictly-typed mathematical tools and utility handlers via `stdio` IPC transport.

---

## 📐 Architecture & Key Features

* **Protocol Standard:** Implements the official `@modelcontextprotocol/sdk` over Standard Input/Output (`stdio`) communication channel.
* **Schema Validation & Type Safety:** Uses **Zod** schema inference for strict tool argument parsing alongside native TypeScript types.
* **Defensive Input Handling:** Features runtime validation (`validateNumbers`) guarding against numerical edge-cases such as `NaN`, `Infinity`, and division-by-zero.
* **Standardized JSON RPC Responses:** Formats responses and error handles according to the MCP protocol specification (`isError` flags and standard content blocks).

---

## 🛠️ Tools Provided

| Tool Name | Parameters | Description | Edge Case Protections |
| :--- | :--- | :--- | :--- |
| `add_numbers` | `a: number`, `b: number` | Computes $a + b$ | `NaN` / `Infinity` validation |
| `subtract_numbers` | `a: number`, `b: number` | Computes $a - b$ | `NaN` / `Infinity` validation |
| `multiply_numbers` | `a: number`, `b: number` | Computes $a \times b$ | `NaN` / `Infinity` validation |
| `divide_numbers` | `a: number`, `b: number` | Computes $a \div b$ | Zero-division check (`b === 0`) |
| `power_numbers` | `base: number`, `exponent: number` | Computes $\text{base}^{\text{exponent}}$ | Overflow / invalid power handling |
| `greet_user` | `name: string` | Returns personalized welcome string | Non-string boundary enforcement |

---

## 🛠️ Tech Stack & Dependencies

* **Language:** TypeScript (`ES2022` / ESM Modules)
* **Runtime:** Node.js (v18+)
* **Runner:** `tsx` (TypeScript Execution Engine)
* **Libraries:** `@modelcontextprotocol/sdk`, `zod`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/node-mcp-calc.git
   cd node-mcp-calc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode:**
   ```bash
   npm start
   ```

---

## 🔌 Connecting to an MCP Client (e.g., Claude Desktop)

The MCP server runs using standard input/output (`stdio`) transport. Any compatible MCP client can launch and communicate with this process automatically.

### Configuration

Add this entry to your client configuration file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "calculator-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/absolute/path/to/node-mcp-calc/index.ts"
      ]
    }
  }
}
```

* **macOS Path:** `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows Path:** `%APPDATA%\Claude\claude_desktop_config.json`

---

## 🔄 End-to-End Execution Flow

Below is the sequence of events from user prompt to tool execution:

```
┌──────────────┐          ┌────────────────┐          ┌──────────────────┐
│  User Input  │ ──(1)──> │   MCP Client   │ ──(2)──> │    MCP Server    │
└──────────────┘          │ (e.g., Claude) │          │    (Node.js)     │
                          └────────────────┘          └──────────────────┘
                                  │                             │
                                  │<─────(3) Tool Catalog──────┤
                                  │                             │
                                  │───(4) Tool Call Payload────>│
                                  │   "multiply_numbers"        │
                                  │    { a: 12, b: 8 }          │
                          ┌───────┴────────┐                    │
                          │   LLM Engine   │                    │
                          │   (Inference)  │                    │
                          └───────┬────────┘                    │
                                  │<───(5) Return JSON Result──┤
                                  │
  "12 multiplied by 8 is 96" <──(6)
```

1. **Handshake & Capabilities:** Client starts the server process and requests registered tools list.
2. **Intent Parsing:** LLM identifies tool call intent from prompt (e.g., *"Multiply 12 by 8"*).
3. **Execution Request:** Client passes structured JSON request payload over `stdio`.
4. **Validation & Calculation:** Server validates schema using Zod, executes math logic, and returns formatted result block.
5. **Final Output Formatting:** LLM incorporates output into conversational context response.

---

## 🧪 Testing & Debugging

To test and inspect standard MCP responses interactively, you can run the official **MCP Inspector**:

```bash
npx @modelcontextprotocol/inspector npx tsx index.ts
```

---

## 📜 License

This project is licensed under the **ISC License**.