# Mondoo Skills for Claude Code

A collection of specialized skills for MQL (Mondoo Query Language) policy development, CIS benchmark implementation, and cnquery/cnspec provider development.

## Installation

Add the marketplace:

```shell
/plugin marketplace add mondoohq/mondoo-skills
```

Install the plugin:

```shell
/plugin install mondoo-skills@mondoo-skills
```

## Available Skills

| Skill | Description |
|-------|-------------|
| `cis-scaffolding` | Create new query implementations and conversion files |
| `cis-generation` | Generate CIS policies from conversion configs |
| `cis-audit-lint` | Validate policy audit sections match MQL logic |
| `cis-navigation` | Navigate between policy files and implementations |
| `policy-development-workflow` | Create/update CIS benchmark policies |
| `cnquery-aws-resource-development` | Add AWS provider resources to cnquery |
| `cnquery-azure-resource-development` | Add Azure provider resources |
| `cnquery-ms365-resource-development` | Add MS365 provider resources |
| `context-aware-workflow` | Platform-specific MQL guidance |

## Usage

After installation, invoke skills with:

```shell
/mondoo-skills:skill-name
```

For example:

```shell
/mondoo-skills:cis-scaffolding
/mondoo-skills:policy-development-workflow
```

## License

Apache-2.0
