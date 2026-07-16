# Mondoo Skills

A collection of agent skills for MQL (Mondoo Query Language) development and for [xgrep](https://github.com/mondoohq/xgrep)-powered security work — code inspection, rule authoring, finding triage, and remediation. Compatible with Claude Code, Codex, Gemini CLI, and Cursor.

The skills in this repository follow the standardized [Agent Skills](https://agentskills.io/home) format.

> [!TIP]
> If your agent doesn't support skills, you can use [`agents/AGENTS.md`](agents/AGENTS.md) directly as a fallback.

## Installation

### Claude Code

Installing is a **two-step** flow — registering the marketplace makes the skills
*available*, but each skill is installed individually (opt-in), so you pull only the
ones you want.

1. Register the repository as a plugin marketplace (once):

```shell
/plugin marketplace add mondoohq/skills
```

2. Install the skills you want:

```shell
# MQL development
/plugin install mondoo-mql@mondoohq/skills

# xgrep security skills
/plugin install xgrep-inspect@mondoohq/skills
/plugin install xgrep-rule-creator@mondoohq/skills
/plugin install xgrep-triage@mondoohq/skills
/plugin install xgrep-remediate@mondoohq/skills
/plugin install xgrep-fix@mondoohq/skills
/plugin install secure-coding@mondoohq/skills
```

Or run `/plugin` and pick from **Browse plugins** interactively. Adding the marketplace
alone does **not** install anything — if `/plugin install …@mondoohq/skills` reports
*"Marketplace not found"*, run step 1 first.

From a shell, the same works non-interactively with the `claude` CLI:

```shell
claude plugin marketplace add mondoohq/skills
claude plugin install xgrep-triage@mondoohq/skills
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
/xgrep-triage
/xgrep-rule
```

## Available Skills

<!-- BEGIN_SKILLS_TABLE -->
| Name | Description | Documentation |
|------|-------------|---------------|
| `mondoo-mql` | MQL query development with syntax guidance, platform-specific patterns, and MCP tool integration | [SKILL.md](skills/mondoo-mql/SKILL.md) |
| `secure-coding` | Secure coding guidance for AI agents - proactively avoid generating vulnerable code patterns across 7 languages | [SKILL.md](skills/secure-coding/SKILL.md) |
| `xgrep-fix` | Fix a whole set of xgrep findings — or just the triage-confirmed true positives in a findings.json — in one pass through the verify/apply harness | [SKILL.md](skills/xgrep-fix/SKILL.md) |
| `xgrep-inspect` | Navigate and understand source code using xgrep's AST-powered code intelligence | [SKILL.md](skills/xgrep-inspect/SKILL.md) |
| `xgrep-remediate` | Fix a confirmed xgrep finding safely using the verify/apply harness — apply deterministic fixes, author and verify assisted fixes against the fix contract, and surface advisory guidance | [SKILL.md](skills/xgrep-remediate/SKILL.md) |
| `xgrep-rule-creator` | Create custom xgrep rules for detecting security vulnerabilities and code patterns with test-first methodology | [SKILL.md](skills/xgrep-rule-creator/SKILL.md) |
| `xgrep-triage` | Investigate and classify xgrep scan findings using code graph analysis | [SKILL.md](skills/xgrep-triage/SKILL.md) |
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

### xgrep Skills

A set of skills built on [xgrep](https://github.com/mondoohq/xgrep), Mondoo's fast,
Semgrep-compatible SAST scanner, for security review and remediation workflows:

- **`xgrep-inspect`** - Navigate and understand source code using xgrep's AST-powered code intelligence
- **`xgrep-rule-creator`** - Create custom xgrep rules with a test-first methodology, or port rules to new languages
- **`xgrep-triage`** - Investigate and classify scan findings using code-graph analysis
- **`xgrep-remediate`** - Fix a confirmed finding safely using xgrep's verify/apply harness
- **`xgrep-fix`** - Fix a whole set of findings — or the true positives a triage report confirmed — in one pass
- **`secure-coding`** - Proactively avoid generating vulnerable code across 7 languages

These skills drive the `xgrep` CLI; install it from the
[xgrep repository](https://github.com/mondoohq/xgrep) to use them.

## License

Apache-2.0
