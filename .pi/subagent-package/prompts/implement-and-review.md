---
description: Implementation with review - worker implements, reviewer checks, worker fixes issues
---
Use the subagent tool with the chain parameter to execute this workflow:

1. First, use the "worker" agent to implement: $@
2. Then, use the "reviewer" agent to review the changes for issues (use {previous} placeholder)
3. Finally, use the "worker" agent to address any issues found in the review (use {previous} placeholder)

Execute this as a chain, passing output between steps via {previous}.
