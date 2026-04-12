# Mondoo Skills

A collection of agent skills for MQL (Mondoo Query Language) development and Mondoo MCP tools integration. Compatible with Claude Code, Codex, Gemini CLI, and Cursor.

The skills in this repository follow the standardized [Agent Skills](https://agentskills.io/home) format.

> [!TIP]
> If your agent doesn't support skills, you can use [`agents/AGENTS.md`](agents/AGENTS.md) directly as a fallback.

## Installation

### Claude Code

1. Register the repository as a plugin marketplace:

```shell
/plugin marketplace add mondoohq/skills
```

2. Install a skill:

```shell
/plugin install mondoo-mql@mondoohq/skills
```

### Codex

1. Copy or symlink skills from this repository's `skills/` directory into one of Codex's standard `.agents/skills` locations (e.g., `$REPO_ROOT/.agents/skills` or `$HOME/.agents/skills`) as described in the [Codex Skills guide](https://developers.openai.com/codex/skills/).

2. Once available, Codex will discover the skill and load the `SKILL.md` instructions automatically.

3. If your Codex setup still relies on `AGENTS.md`, use the generated [`agents/AGENTS.md`](agents/AGENTS.md) file as a fallback bundle.

### Gemini CLI

Install locally:

```shell
gemini extensions install . --consent
```

Or use the GitHub URL:

```shell
gemini extensions install https://github.com/mondoohq/skills.git --consent
```

See [Gemini CLI extensions docs](https://geminicli.com/docs/extensions/#installing-an-extension) for more help.

### Cursor

This repository includes Cursor plugin manifests:

- `.cursor-plugin/plugin.json`
- `.cursor-plugin/marketplace.json`

Install from repository URL or local checkout via the Cursor plugin flow.

## Usage

The skills automatically activate when working on relevant tasks. You can also invoke them directly:

```shell
/mondoo-mql
```

## Available Skills

<!-- BEGIN_SKILLS_TABLE -->
| Name | Description | Documentation |
|------|-------------|---------------|
| `mondoo-mql` | MQL query development with syntax guidance, platform-specific patterns, and MCP tool integration | [SKILL.md](skills/mondoo-mql/SKILL.md) |
<!-- END_SKILLS_TABLE -->

## What's Included

### mondoo-mql Skill

The `mondoo-mql` skill provides comprehensive guidance for writing MQL queries:

- **MQL Reference** - Complete syntax documentation, best practices, and anti-patterns to avoid
- **Platform Samples** - Ready-to-use patterns for AWS, Azure, Linux, Windows, and MS365
- **MCP Tool Integration** - Real-time schema lookup, query validation, and policy linting

### Mondoo MCP Tools

The skill documents how to use Mondoo's MCP server tools:

| Tool | Purpose |
|------|---------|
| `mql-schema-providers` | List all available providers |
| `mql-schema-overview` | Explore resources in a provider |
| `mql-schema-resource` | Get field details for a resource |
| `mql-schema-suggestion` | Autocomplete partial queries |
| `mql-compiler` | Validate MQL syntax |
| `mql-bundle-lint` | Lint policy bundles |
| `mql-bundle-format` | Format policy YAML |

## License

Apache-2.0
