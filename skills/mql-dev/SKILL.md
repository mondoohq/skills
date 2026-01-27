---
name: mql-dev
description: Use when writing MQL (Mondoo Query Language) queries, working with Mondoo MCP tools, or developing security policies
---

# MQL Development Skill

## Overview

This skill provides guidance for writing MQL (Mondoo Query Language) queries and using Mondoo's MCP (Model Context Protocol) tools for validating and testing queries.

**Two-tier knowledge system:**
- **Reference Files** (static): MQL syntax docs, platform-specific examples
- **MCP Tools** (live): Real-time schema lookup and query validation

## When to Use

- Writing MQL queries or policies
- Validating MQL syntax before deployment
- Exploring available MQL resources and fields
- Platform-specific query development (AWS, Azure, Linux, Windows, MS365)

## Reference Materials

Located within this skill directory:

| File | Purpose |
|------|---------|
| [mql-reference.md](mql-reference.md) | Complete MQL syntax and patterns |
| [samples/general.md](samples/general.md) | General MQL patterns |
| [samples/aws.md](samples/aws.md) | AWS resource patterns |
| [samples/azure.md](samples/azure.md) | Azure resource patterns |
| [samples/linux.md](samples/linux.md) | Linux system patterns |
| [samples/windows.md](samples/windows.md) | Windows system patterns |
| [samples/ms365.md](samples/ms365.md) | Microsoft 365 patterns |

## Mondoo MCP Server Tools

The Mondoo MCP server provides real-time access to MQL schema and compilation tools. Use these instead of static documentation for validation.

### Available MCP Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `mcp__mondoo-mcp-http__mql-schema-providers` | List all providers | Finding queryable platforms |
| `mcp__mondoo-mcp-http__mql-schema-overview` | List resources in provider | Exploring available resources |
| `mcp__mondoo-mcp-http__mql-schema-resource` | Get resource details | Checking fields and types |
| `mcp__mondoo-mcp-http__mql-schema-suggestion` | Get autocomplete suggestions | Finding resources by partial name |
| `mcp__mondoo-mcp-http__mql-compiler` | Validate MQL syntax | Before integrating queries |
| `mcp__mondoo-mcp-http__mql-bundle-lint` | Lint policy bundle | Validating policy structure |
| `mcp__mondoo-mcp-http__mql-bundle-format` | Format policy bundle | Standardizing YAML style |
| `mcp__mondoo-mcp-http__mql-policy-bundle` | Generate policy from queries | Creating policy YAML |

### Quick Examples

```
# List all providers
mcp__mondoo-mcp-http__mql-schema-providers()
# Returns: aws, azure, gcp, ms365, os, k8s, github, etc.

# Get all AWS resources
mcp__mondoo-mcp-http__mql-schema-overview(provider: "aws")

# Get EC2 instance field details
mcp__mondoo-mcp-http__mql-schema-resource(
  provider: "aws",
  resource: "aws.ec2.instance"
)

# Get suggestions for partial query
mcp__mondoo-mcp-http__mql-schema-suggestion(
  provider: "aws",
  partial_query: "aws.ec2"
)

# Validate MQL compiles
mcp__mondoo-mcp-http__mql-compiler(
  provider: "aws",
  queries: ["aws.ec2.instances.all(httpTokens == 'required')"]
)

# Lint a policy bundle
mcp__mondoo-mcp-http__mql-bundle-lint(
  bundle: "<yaml content>",
  fileName: "policy.mql.yaml"
)

# Format a policy bundle
mcp__mondoo-mcp-http__mql-bundle-format(
  bundle: "<yaml content>"
)
```

### When to Use MCP vs Reference Files

| Need | Use |
|------|-----|
| MQL syntax patterns | `mql-reference.md` |
| Platform-specific examples | `samples/*.md` |
| Resource availability check | `mql-schema-overview` |
| Field types and descriptions | `mql-schema-resource` |
| Query compilation validation | `mql-compiler` |
| Policy structure validation | `mql-bundle-lint` |

## MQL Quick Reference

### Core Syntax

```mql
# Basic resource access
resource.property == value

# Filtering
resources.where(condition).all(assertion)

# Data blocks
resource {
  property1
  property2 == expected_value
}

# Variables
v = 23
value = null

# Regular expression matching (NOT =~)
string == /pattern/

# Empty checks
value == empty
value != empty
```

### List Operations

```mql
# All entries must match
array.all(condition)

# At least one entry matches
array.contains(condition)

# No entries match
array.none(condition)

# Exactly one entry matches
array.one(condition)

# Filter entries
array.where(condition)

# Current item reference
array.where(_.contains("pattern"))
```

### Common Patterns

```mql
# File permissions
file("/etc/passwd").permissions {
  user_readable == true
  user_writeable == true
  group_readable == true
  other_readable == true
}

# Service status
service("ssh").running == true
service("telnet").enabled == false

# Package check
package("nginx").installed == true

# Kernel parameters
kernel.parameters['net.ipv4.ip_forward'] == 0

# Platform detection
asset.platform == "ubuntu"
asset.family.contains("linux")
```

### Anti-Patterns to Avoid

```mql
# Don't use =~ for regex
string =~ /pattern/      # Bad
string == /pattern/      # Good

# Don't use deprecated platform
platform == "ubuntu"          # Bad
asset.platform == "ubuntu"    # Good

# Don't nest .where() clauses
events.where(parameters.where(_['name'] == "NEW_VALUE"))  # Bad
events.where(parameters.any(_['name'] == "NEW_VALUE"))    # Good

# Always handle null values
users.all(shell == "/bin/bash")                     # Bad
users.where(shell != null).all(shell == "/bin/bash") # Good
```

## Workflow

1. **Understand requirements** - What resources need to be checked?
2. **Explore schema** - Use `mql-schema-overview` and `mql-schema-resource`
3. **Check samples** - Look for similar patterns in `samples/*.md`
4. **Write query** - Follow patterns from `mql-reference.md`
5. **Validate** - Use `mql-compiler` to verify syntax
6. **Test** - Run with `cnquery run` against target systems

## Platform-Specific Guidance

### AWS
- Use `aws.*` resources
- Check `samples/aws.md` for IAM, EC2, S3 patterns
- Validate with provider: "aws"

### Azure
- Use `azure.subscription.*` resources
- Check `samples/azure.md` for VM, storage, security patterns
- Both full subscription and single resource scan patterns

### Linux
- Use `file`, `service`, `package`, `users`, `kernel` resources
- Check `samples/linux.md` for common patterns
- Handle platform variants (debian, redhat, etc.)

### Windows
- Use `registrykey`, `secpol`, `auditpol`, `windows` resources
- Check `samples/windows.md` for registry and policy patterns
- Handle server vs workstation differences

### Microsoft 365
- Use `microsoft.*` resources
- Check `samples/ms365.md` for domain patterns
