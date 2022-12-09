import { RuleGroup, ruleGroup, RuleGroupType, AnyRule } from "../rule";
/**
 * The And group type allows you to AND rules together.
 * @group Group rules
 */
export const andType: RuleGroupType = {
  name: "and",
  title: "And",
  schemaCompoundKeyword: "anyOf",
  handler: (rules, data) => {
    for (const rule of rules) {
      if (Array.isArray(rule)) {
        const [ruleComponent, validator] = rule;
        if (!validator.type.valid(data[ruleComponent], validator.settings)) {
          return false;
        }
      } else if (!rule.type.handler(rule.rules, data)) {
        return false;
      }
    }
    return true;
  },
};

/**
 * Logically AND a list of groups together. Note that this
 * is the default for all rules, so this rule is only useful when
 * you need to apply complex logic together with rules like or and not.
 * @param rules a list of rules to validate.
 * @group Rules
 */
export function and(rules: AnyRule[]): RuleGroup {
  return ruleGroup(andType, rules);
}
