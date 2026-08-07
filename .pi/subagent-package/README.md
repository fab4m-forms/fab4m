# @pi-extra/subagent

A pi package that adds subagent capabilities - delegate tasks to specialized agents with isolated context windows.

## Features

- **Isolated Context**: Each subagent runs in a separate `pi` process with its own context window
- **Streaming Output**: See tool calls and progress as they happen
- **Parallel Execution**: Run multiple agents simultaneously (max 8 tasks, 4 concurrent)
- **Chain Workflows**: Sequential execution with context passing via `{previous}` placeholder
- **Custom Agents**: Define specialized agents with custom prompts, models, and tool restrictions

## Installation

```bash
pi install git:github.com/your-repo/pi-subagent
```

Or for local development:

```bash
pi install /path/to/subagent-package
```

## Quick Start

### Single Agent
```
Use scout to find all authentication code
```

### Parallel Execution
```
Run 2 scouts in parallel: one to find models, one to find providers
```

### Chain Workflow
```
Use chain: scout finds the code, planner creates a plan, worker implements
```

## Tool Modes

| Mode | Parameters | Description |
|------|------------|-------------|
| Single | `{ agent, task }` | One agent, one task |
| Parallel | `{ tasks: [...] }` | Multiple agents run concurrently |
| Chain | `{ chain: [...] }` | Sequential with `{previous}` placeholder |

## Built-in Agents

| Agent | Purpose | Model | Tools |
|-------|---------|-------|-------|
| `scout` | Fast codebase recon | Haiku | read, grep, find, ls, bash |
| `planner` | Implementation plans | Sonnet | read, grep, find, ls |
| `reviewer` | Code review | Sonnet | read, grep, find, ls, bash |
| `worker` | General-purpose | Sonnet | all |

## Custom Agents

Create agent definitions in `~/.pi/agent/agents/` or `.pi/agents/`:

```markdown
---
name: my-agent
description: What this agent does
tools: read, grep, find, ls
model: claude-haiku-4-5
---

System prompt for the agent goes here.
```

### Agent Properties

| Property | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Agent identifier (used in tool calls) |
| `description` | Yes | Short description (shown in agent list) |
| `tools` | No | Comma-separated list of allowed tools |
| `model` | No | Model to use (defaults to current model) |

## Workflow Prompts

The package includes prompt templates for common workflows:

| Prompt | Description |
|--------|-------------|
| `/implement <task>` | scout → planner → worker |
| `/scout-and-plan <task>` | scout → planner (no implementation) |
| `/implement-and-review <task>` | worker → reviewer → worker |
| `/parallel-scout <tasks>` | Multiple parallel scouts |

## Security

- **User agents** (`~/.pi/agent/agents/`) are always trusted and loaded by default
- **Project agents** (`.pi/agents/`) require explicit opt-in via `agentScope: "both"` or `"project"`
- When running interactively, project agents prompt for confirmation before execution

## API Reference

### subagent tool parameters

```typescript
{
  // Single mode
  agent?: string;      // Agent name
  task?: string;       // Task description

  // Parallel mode
  tasks?: Array<{
    agent: string;
    task: string;
    cwd?: string;
  }>;

  // Chain mode
  chain?: Array<{
    agent: string;
    task: string;      // Use {previous} for prior output
    cwd?: string;
  }>;

  // Options
  agentScope?: "user" | "project" | "both";
  confirmProjectAgents?: boolean;
  cwd?: string;
}
```

## Examples

### Investigate authentication flow
```json
{
  "agent": "scout",
  "task": "Find all authentication-related code, including login, logout, session management, and middleware"
}
```

### Parallel investigation
```json
{
  "tasks": [
    { "agent": "scout", "task": "Find all database models and their relationships" },
    { "agent": "scout", "task": "Find all API endpoints and their handlers" },
    { "agent": "scout", "task": "Find all background jobs and queues" }
  ]
}
```

### Implementation chain
```json
{
  "chain": [
    { "agent": "scout", "task": "Find the user registration flow" },
    { "agent": "planner", "task": "Create a plan to add email verification. Context: {previous}" },
    { "agent": "worker", "task": "Implement the plan: {previous}" }
  ]
}
```

## License

MIT
