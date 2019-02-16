//export for testing
export const getFirstOfNestedOrNonsenseKey = arr =>
  arr && arr.length > 0 ? arr[0] : 'key'

export const convertUsage = items => {
  const usage = items[getFirstOfNestedOrNonsenseKey(Object.keys(items))] || [[]]
  return usage[0].length > 0 ? usage[usage.length - 1][0] : 0
}

export const getApplicablePlan = plans =>
  plans.find(v => !v.name.includes('Admin'))
