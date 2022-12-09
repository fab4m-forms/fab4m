import { AnyRule, ruleGroup, RuleGroup, RuleGroupType } from "../rule";

/**
 * Rule type for checking if a value isn't the same as the provided value.
 * @group Rules
 */
export const notType: RuleGroupType = {
  name: "not",
  title: "Not",
  schemaCompoundKeyword: "not",
  schema: (rules) => {
    return { not: { allOf: rules } };
  },
  handler: (rules, data) => {
    for (const rule of rules) {
      if (Array.isArray(rule)) {
        const [ruleComponent, validator] = rule;
        if (validator.type.valid(data[ruleComponent], validator.settings)) {
          return false;
        }
      } else if (rule.type.handler(rule.rules, data)) {
        return false;
      }
    }
    return true;
  },
};

/**
 * Rule for checking if a value isn't the same as the provided value.
 * @group Rules
 */
export function not(rules: AnyRule[]): RuleGroup {
  return ruleGroup(notType, rules);
}
