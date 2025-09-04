export interface ProductPropertyValue {
  property_id: number;
  value: string | number;
}

export interface Product {
  id: number;
  property_values: ProductPropertyValue[];
}
