#!/usr/bin/env npx tsx
/**
 * Generate AGENTS.md from AGENTS_TEMPLATE.md and SKILL.md frontmatter.
 *
 * Also validates that marketplace.json is in sync with discovered skills,
 * and updates the skills table in README.md.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, dirname, relative } from "path";

const ROOT = join(dirname(new URL(import.meta.url).pathname), "..");
const TEMPLATE_PATH = join(ROOT, "scripts", "AGENTS_TEMPLATE.md");
const OUTPUT_PATH = join(ROOT, "agents", "AGENTS.md");
const MARKETPLACE_PATH = join(ROOT, ".claude-plugin", "marketplace.json");
const README_PATH = join(ROOT, "README.md");

const README_TABLE_START = "<!-- BEGIN_SKILLS_TABLE -->";
const README_TABLE_END = "<!-- END_SKILLS_TABLE -->";

interface Skill {
  name: string;
  description: string;
  path: string;
}

interface MarketplacePlugin {
  name: string;
  source: string;
  description?: string;
}

function parseFrontmatter(text: string): Record<string, string> {
  const match = text.match(/^---\s*\n(.*?)\n---\s*/s);
  if (!match) return {};
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return data;
}

function collectSkills(): Skill[] {
  const skillsDir = join(ROOT, "skills");
  if (!existsSync(skillsDir)) return [];

  const skills: Skill[] = [];
  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillMd = join(skillsDir, entry.name, "SKILL.md");
    if (!existsSync(skillMd)) continue;

    const meta = parseFrontmatter(readFileSync(skillMd, "utf-8"));
    if (!meta.name || !meta.description) continue;

    skills.push({
      name: meta.name,
      description: meta.description,
      path: relative(ROOT, join(skillsDir, entry.name)),
    });
  }

  return skills.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

function render(template: string, skills: Skill[]): string {
  return template.replace(/\{\{#skills\}\}(.*?)\{\{\/skills\}\}/gs, (_, block: string) => {
    const trimmed = block.replace(/^\n/, "").replace(/\n$/, "");
    return skills
      .map((s) =>
        trimmed
          .replace(/\{\{name\}\}/g, s.name)
          .replace(/\{\{description\}\}/g, s.description)
          .replace(/\{\{path\}\}/g, s.path)
      )
      .join("\n");
  });
}

function loadMarketplace(): { plugins: MarketplacePlugin[] } {
  if (!existsSync(MARKETPLACE_PATH)) {
    throw new Error(`marketplace.json not found at ${MARKETPLACE_PATH}`);
  }
  return JSON.parse(readFileSync(MARKETPLACE_PATH, "utf-8"));
}

function generateReadmeTable(skills: Skill[]): string {
  const marketplace = loadMarketplace();
  const plugins = new Map(marketplace.plugins.map((p) => [p.source, p]));

  const lines = [
    "| Name | Description | Documentation |",
    "|------|-------------|---------------|",
  ];

  for (const skill of skills) {
    const source = `./${skill.path}`;
    const plugin = plugins.get(source);
    const name = plugin?.name ?? skill.name;
    const description = plugin?.description ?? skill.description;
    const docLink = `[SKILL.md](${skill.path}/SKILL.md)`;
    lines.push(`| \`${name}\` | ${description} | ${docLink} |`);
  }

  return lines.join("\n");
}

function updateReadme(skills: Skill[]): boolean {
  if (!existsSync(README_PATH)) {
    console.error(`Warning: README.md not found at ${README_PATH}`);
    return false;
  }

  const content = readFileSync(README_PATH, "utf-8");
  const startIdx = content.indexOf(README_TABLE_START);
  const endIdx = content.indexOf(README_TABLE_END);

  if (startIdx === -1 || endIdx === -1) {
    console.error(
      `Warning: README.md markers not found. Add ${README_TABLE_START} and ${README_TABLE_END} to enable table generation.`
    );
    return false;
  }

  if (endIdx < startIdx) {
    console.error("Warning: README.md markers are in wrong order.");
    return false;
  }

  const table = generateReadmeTable(skills);
  const newContent =
    content.slice(0, startIdx + README_TABLE_START.length) +
    "\n" +
    table +
    "\n" +
    content.slice(endIdx);

  writeFileSync(README_PATH, newContent, "utf-8");
  return true;
}

function validateMarketplace(skills: Skill[]): string[] {
  const errors: string[] = [];
  const marketplace = loadMarketplace();
  const plugins = marketplace.plugins;

  const skillBySource = new Map(skills.map((s) => [`./${s.path}`, s]));
  const pluginBySource = new Map(plugins.map((p) => [p.source, p]));

  for (const skill of skills) {
    const expectedSource = `./${skill.path}`;
    const plugin = pluginBySource.get(expectedSource);
    if (!plugin) {
      errors.push(`Skill '${skill.name}' at '${skill.path}' is missing from marketplace.json`);
    } else if (plugin.name !== skill.name) {
      errors.push(
        `Name mismatch at '${expectedSource}': SKILL.md='${skill.name}', marketplace.json='${plugin.name}'`
      );
    }
  }

  for (const plugin of plugins) {
    if (!skillBySource.has(plugin.source)) {
      errors.push(
        `Marketplace plugin '${plugin.name}' at '${plugin.source}' has no SKILL.md`
      );
    }
  }

  return errors;
}

function main(): void {
  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  const skills = collectSkills();
  const output = render(template, skills);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`Wrote ${OUTPUT_PATH} with ${skills.length} skills.`);

  const errors = validateMarketplace(skills);
  if (errors.length > 0) {
    console.error("\nMarketplace.json validation errors:");
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }
  console.log("Marketplace.json validation passed.");

  if (updateReadme(skills)) {
    console.log(`Updated ${README_PATH} skills table.`);
  }
}

main();
