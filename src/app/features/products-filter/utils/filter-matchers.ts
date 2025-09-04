/* TODO: Add type safety for propValue and filterValue [TM 04/09/25] */

export function matchEquals(propValue: any, filterValue: any): boolean {
  return propValue == filterValue;
}

export function matchGreaterThan(propValue: any, filterValue: any): boolean {
  return typeof propValue === 'number' && propValue > filterValue;
}

export function matchLessThan(propValue: any, filterValue: any): boolean {
  return typeof propValue === 'number' && propValue < filterValue;
}

export function matchAny(propValue: any): boolean {
  return propValue !== undefined && propValue !== null && propValue !== '';
}

export function matchNone(propValue: any): boolean {
  return propValue === undefined || propValue === null || propValue === '';
}

export function matchIn(
  propValue: any,
  filterValue: any,
  propertyType: string,
): boolean {
  if (Array.isArray(filterValue)) {
    if (propertyType === 'number' || propertyType === 'enumerated') {
      return filterValue.includes(propValue);
    }
    // For string
    return filterValue.map(v => String(v)).includes(String(propValue));
  }
  return (
    typeof filterValue === 'string' &&
    filterValue
      .split(',')
      .map(v => v.trim())
      .includes(String(propValue))
  );
}

export function matchContains(propValue: any, filterValue: any): boolean {
  return (
    typeof propValue === 'string' &&
    propValue.toLowerCase().includes(String(filterValue).toLowerCase())
  );
}
