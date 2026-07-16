<skills>

You have additional SKILLs documented in directories containing a "SKILL.md" file.

These skills are:
 - mondoo-mql -> "skills/mondoo-mql/SKILL.md"
 - secure-coding -> "skills/secure-coding/SKILL.md"
 - xgrep-fix -> "skills/xgrep-fix/SKILL.md"
 - xgrep-inspect -> "skills/xgrep-inspect/SKILL.md"
 - xgrep-remediate -> "skills/xgrep-remediate/SKILL.md"
 - xgrep-rule-creator -> "skills/xgrep-rule-creator/SKILL.md"
 - xgrep-triage -> "skills/xgrep-triage/SKILL.md"

IMPORTANT: You MUST read the SKILL.md file whenever the description of the skills matches the user intent, or may help accomplish their task.

mondoo-mql: `Use when writing MQL (Mondoo Query Language) queries, working with Mondoo MCP tools, or developing security policies`
secure-coding: `Review code for security vulnerabilities and provide secure coding guidance across Go, Python, JavaScript, Java, Ruby, C#, and Swift. Triggers on code review, security questions, and vulnerability prevention.`
xgrep-fix: `Fixes a whole set of xgrep findings — or just the triage-confirmed true positives in a findings.json — in one pass via the verify/apply harness. Auto-applies deterministic fixes (xgrep fix --confirmed), drives the assisted author/verify/apply loop per finding, and surfaces advisory guidance, reporting a per-fingerprint summary. Use to remediate many findings at once after a scan or triage.`
xgrep-inspect: `Investigates and navigates source code using xgrep's AST-powered code intelligence. Use when exploring unfamiliar code, finding definitions/references, understanding dependencies, or assessing change impact.`
xgrep-remediate: `Fixes a confirmed xgrep finding safely using the verify/apply harness — applies deterministic fixes, authors and verifies assisted fixes against the fix contract, and surfaces advisory guidance. Use to remediate a specific finding you already believe is a true positive.`
xgrep-rule-creator: `Creates custom xgrep rules for detecting security vulnerabilities, bug patterns, and code anti-patterns. Supports both creating new rules from scratch and porting existing rules to new languages. Use when writing xgrep/Semgrep YAML rules or building custom static analysis detections.`
xgrep-triage: `Investigates and classifies xgrep scan findings using code graph analysis for call chain navigation and dataflow tracing. Use when triaging SAST findings, investigating vulnerabilities, or classifying true/false positives.`

Paths referenced within SKILL.md files are relative to that skill's directory.

</skills>
