import { FormComponentWithName } from "./component";
import { CompoundType, Schema } from "./schema";
import { Validator, ValidatorType } from "./validator";
/**
 * @group Rule API
 */
export type AnyRule = Rule | RuleGroup; // eslint-disable-line

/**
 * Defines a type of rule group that can be used in components.
 * @group Rule API
 */
export interface RuleGroupType {
  /** The name of the rule. */
  name: string;
  /** The title of the rule. */
  title: string;
  /** The compound keyword to be used in JSON Schema */
  schemaCompoundKeyword: CompoundType;
  schema?: (rules: Array<Partial<Schema>>) => Partial<Schema>;
  /**
   * The handler function is used to evaluate the rule.
   * @param rules A list of rules to evaluate.
   * @param values The data to validate against.
   */
  handler: (rules: AnyRule[], data: Record<string, unknown>) => boolean;
}

/**
 * @group Rule API
 */
export type Rule = [
  string,
  Validator<ValidatorType<unknown, unknown, unknown>, unknown>
];

/**
 * Definition of a rule group that can be added to a component.
 * @group Rule API
 */
export interface RuleGroup {
  rules: AnyRule[];
  type: RuleGroupType;
}

/**
 * Create a new rule group based on a rule group type.
 * @param type The rule group type defition to use.
 * @param rules A list of rules to add to the group.
 * @group Rule API
 */
export function ruleGroup(type: RuleGroupType, rules: AnyRule[]): RuleGroup {
  return {
    type,
    rules,
  };
}

/**
 * Filter out any components that should not be visible because there
 * are rules that aren't followed. A component is filtered out if any
 * of the rules attached to it isn't true.
 * @param components a list of components to potentially hide.
 * @param data the current data to filter against.
 * @param filterBreaks stop evaluating rules if a page break is encountered.
 * @return A list of components without the components that was filtered by the rules.
 * @group Rule API
 */
export function filterComponents(
  components: FormComponentWithName[],
  data: Record<string, unknown>,
  filterBreaks = false
): FormComponentWithName[] {
  const filteredComponents: FormComponentWithName[] = [];
  for (const component of components) {
    let valid = true;
    for (const rule of component.rules) {
      if (Array.isArray(rule)) {
        const [ruleComponent, validator] = rule;
        if (!validator.type.valid(data[ruleComponent], validator.settings)) {
          valid = false;
          break;
        }
      } else if (!rule.type.handler(rule.rules, data)) {
        valid = false;
        break;
      }
    }
    if (!valid) {
      continue;
    }
    if (filterBreaks && component.type.splitsForm) {
      break;
    }
    if (component.components && component.components.length > 0) {
      filteredComponents.push({
        ...component,
        components: filterComponents(component.components, data),
      });
    } else {
      filteredComponents.push(component);
    }
  }
  return filteredComponents;
}

/**
 * Filter data that shouldn't be in the data structure, because there
 * are rules that aren't followed.
 * Data belonging to filtered components is removed from the data.
 * @param components a list of compoents to filter against.
 * @param data The data to filter
 * @return A new set of data without data belonging to non-visible components.
 * @group Rule API
 */
export function filterData(
  components: FormComponentWithName[],
  data: Record<string, unknown>
): Record<string, unknown> {
  const validNames = filterComponents(components, data).map((c) => c.name);
  // Avoid computing a new array if we don't have any rules that failed.
  if (validNames.length === components.length) {
    return data;
  }
  const filteredData: Record<string, unknown> = { ...data };
  for (const component of components) {
    if (component.name && validNames.indexOf(component.name) === -1) {
      delete filteredData[component.name];
    }
  }
  return filteredData;
}
