# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Standard Workflow

1. First think through the problem, read the codebase for relevant files, and write a plan to todo.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. Use Context7 to check up-to-date docs when needed for implementing new libraries or frameworks, or adding features using them.

## Project Overview

**Current State**: This is a new repository in its initial setup phase.

### Repository Structure
```
Experiment1/
├── CLAUDE.md      # AI assistant guidance (this file)
├── todo.md        # Task tracking file
└── .git/          # Git version control
```

### Purpose
This repository is being set up as an experimental project. The specific purpose and architecture will be defined as development progresses.

## Development Commands

As the project develops, common commands will be documented here:

```bash
# Git operations
git status                    # Check current state
git add .                     # Stage changes
git commit -m "message"       # Commit changes
git push -u origin <branch>   # Push to remote

# Future commands (to be added as project develops)
# - Build commands
# - Test commands
# - Lint/format commands
# - Development server commands
```

## Code Conventions

### General Principles
1. **Simplicity First** - Every change should be as minimal as possible
2. **Incremental Changes** - Small, focused commits over large sweeping changes
3. **Clear Communication** - Document what and why, not just how
4. **No Premature Optimization** - Solve the problem at hand, don't over-engineer

### File Organization
- Keep related files together
- Use clear, descriptive file names
- Maintain consistent directory structure

### Documentation
- Update CLAUDE.md when adding new patterns or conventions
- Keep todo.md updated with current task progress
- Add inline comments for non-obvious logic

## Testing Strategy

Testing approach will be defined as the project develops. Expected sections:
- Unit tests
- Integration tests
- Test commands and coverage requirements

## Key Architectural Decisions

Document important technical decisions here as they are made:

1. **Repository Setup** (Initial)
   - Using Git for version control
   - CLAUDE.md for AI assistant guidance
   - todo.md for task tracking

## AI Assistant Guidelines

### Do's
- Read existing code before making changes
- Follow the Standard Workflow in this file
- Make minimal, focused changes
- Explain changes at a high level
- Update documentation as needed
- Check in with user before executing plans

### Don'ts
- Don't make large, sweeping changes
- Don't add unnecessary complexity
- Don't skip the planning phase for significant work
- Don't ignore existing patterns in the codebase

## Environment Setup

Prerequisites and setup instructions will be added as the tech stack is defined.

## Troubleshooting

Common issues and solutions will be documented here as they arise.
