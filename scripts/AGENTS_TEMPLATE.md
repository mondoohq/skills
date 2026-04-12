<skills>

You have additional SKILLs documented in directories containing a "SKILL.md" file.

These skills are:
{{#skills}}
 - {{name}} -> "{{path}}/SKILL.md"
{{/skills}}

IMPORTANT: You MUST read the SKILL.md file whenever the description of the skills matches the user intent, or may help accomplish their task. 

{{#skills}}
{{name}}: `{{description}}`

{{/skills}}

Paths referenced within SKILL folders are relative to that SKILL. For example the mql-dev `samples/aws.md` would be referenced as `skills/mql-dev/samples/aws.md`. 

</skills>
