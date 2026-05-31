import type { Rule, RuleExecutor } from "./types";

export function buildExecutor(rules: Rule[]): RuleExecutor {
  return (ctx) => {
    for (const rule of rules) {
      if (!rule.match(ctx)) continue;
      rule.transform(ctx);
      if (rule.skipAllRest) break;
    }
  };
}
