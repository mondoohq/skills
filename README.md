# Mondoo Skills for Claude Code

A collection of skills for MQL (Mondoo Query Language) development and Mondoo MCP tools integration.

## Installation

Add the marketplace:

```shell
/plugin marketplace add mondoohq/skills
```

Install the plugin:

```shell
/plugin install mondoo-skills@mondoo-skills
```

## Usage

Invoke the skill:

```shell
/mql-dev
```

The skill will automatically activate when writing MQL queries, working with Mondoo MCP tools, or developing security policies.

## Available Skills

<!-- BEGIN_SKILLS_TABLE -->
| Name | Description | Documentation |
|------|-------------|---------------|
| `mql-dev` | MQL query development with syntax guidance, platform-specific patterns, and MCP tool integration | [SKILL.md](skills/mql-dev/SKILL.md) |
<!-- END_SKILLS_TABLE -->

## What's Included

### mql-dev Skill

The `mql-dev` skill provides comprehensive guidance for writing MQL queries:

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
