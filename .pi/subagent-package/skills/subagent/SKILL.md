---
name: subagent
description: Use subagents to delegate tasks to specialized agents with isolated context windows. Use when tasks can be parallelized, need specialized expertise, or benefit from fresh context.
---

# Subagent Skill

Use the `subagent` tool to delegate work to specialized agents. Each subagent runs in an isolated context window, making it ideal for:

- **Parallel investigation**: Search multiple areas of a codebase simultaneously
- **Specialized tasks**: Leverage agents with specific prompts and tool restrictions
- **Fresh context**: Avoid polluting the main conversation with exploration details
- **Workflows**: Chain agents together where each step builds on the previous

## Available Agents

Agents are defined in:
- `~/.pi/agent/agents/*.md` (user-level, always available)
- `.pi/agents/*.md` (project-level, requires `agentScope: "both"`)

### Built-in Agents

| Agent | Purpose | Model | Tools |
|-------|---------|-------|-------|
| `scout` | Fast codebase recon | Haiku | read, grep, find, ls, bash |
| `planner` | Implementation plans | Sonnet | read, grep, find, ls |
| `reviewer` | Code review | Sonnet | read, grep, find, ls, bash |
| `worker` | General-purpose | Sonnet | all |

## Usage Patterns

### Single Mode
Delegate a single task to one agent:

```json
{
  "agent": "scout",
  "task": "Find all authentication-related code in the codebase"
}
```

### Parallel Mode
Run multiple agents simultaneously (max 8 tasks, 4 concurrent):

```json
{
  "tasks": [
    { "agent": "scout", "task": "Find all database models" },
    { "agent": "scout", "task": "Find all API endpoints" },
    { "agent": "scout", "task": "Find all test files" }
  ]
}
```

### Chain Mode
Sequential execution with context passing (use `{previous}` placeholder):

```json
{
  "chain": [
    { "agent": "scout", "task": "Find the authentication flow" },
    { "agent": "planner", "task": "Create a plan to add OAuth support. Context: {previous}" },
    { "agent": "worker", "task": "Implement the plan: {previous}" }
  ]
}
```

## When to Use

**Good for:**
- Exploring unfamiliar codebases (use scout)
- Breaking down complex changes (scout → planner → worker)
- Running multiple independent searches (parallel scouts)
- Code review after implementation (chain: worker → reviewer)

**Not needed for:**
- Simple file reads or edits
- Quick questions about current context
- Tasks that need main conversation history

## Security

- User-level agents (`~/.pi/agent/agents/`) are always trusted
- Project-level agents (`.pi/agents/`) require confirmation by default
- Set `confirmProjectAgents: false` to skip confirmation (use carefully)

## Examples

**Quick investigation:**
```
Use scout to find where user authentication is handled
```

**Parallel exploration:**
```
Use parallel scouts to find: 1) all API routes, 2) all database queries, 3) all middleware
```

**Full implementation workflow:**
```
Use chain: scout finds the code, planner creates a plan, worker implements it
```

**Review after implementation:**
```
Have reviewer check the changes we just made to auth.ts
```
