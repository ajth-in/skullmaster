import type { Rule, RuleExecutor } from "./types";

export function buildExecutor(rules: Rule[]): RuleExecutor {
  return (ctx) => {
    let current = ctx;
    for (const rule of rules) {
      if (!rule.match(current)) continue;
      current = rule.transform(current);
      if (rule.skipAllRest) break;
    }
    return current;
  };
}
