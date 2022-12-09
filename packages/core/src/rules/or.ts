import { AnyRule, RuleGroup, ruleGroup, RuleGroupType } from "../rule";
/**
 * The Or group type allows you to OR rules together.
 * @group Group rules
 */
export const orType: RuleGroupType = {
  name: "or",
  title: "Or",
  schemaCompoundKeyword: "allOf",
  handler: (rules, data) => {
    for (const rule of rules) {
      if (Array.isArray(rule)) {
        const [ruleComponent, validator] = rule;
        if (validator.type.valid(data[ruleComponent], validator.settings)) {
          return true;
        }
      } else if (rule.type.handler(rule.rules, data)) {
        return true;
      }
    }
    return false;
  },
};

/**
 * Logically OR a list of rules together. The group will be true if
 * any of the rules contained within is true.
 * @param rules a list of rules to validate.
 * @group Rules
 */
export function or(rules: AnyRule[]): RuleGroup {
  return ruleGroup(orType, rules);
}
