export type NutritionSearch = {
  text: string;
  parsed: Parsed[];
  hints: Hint[];
  _links: Links;
};

export type Links = {
  next: Next;
};

export type Next = {
  title: string;
  href: string;
};

export type Hint = {
  food: HintFood;
  measures: Measure[];
};

export type HintFood = {
  foodId: string;
  label: string;
  knownAs: string;
  nutrients: Nutrients;
  category: Category;
  categoryLabel: CategoryLabel;
  image?: string;
  brand?: string;
  foodContentsLabel?: string;
  servingSizes?: ServingSize[];
  servingsPerContainer?: number;
};

export type Category = 'Generic foods' | 'Packaged foods';

export type CategoryLabel = 'food';

export type Nutrients = {
  ENERC_KCAL: number;
  PROCNT: number;
  FAT: number;
  CHOCDF: number;
  FIBTG: number;
};

export type ServingSize = {
  uri: string;
  label: ServingSizeLabel;
  quantity: number;
};

export type ServingSizeLabel = 'Cup' | 'Gram' | 'Slice' | 'Ounce' | 'Pancake';

export type Measure = {
  uri: string;
  label: string;
  weight: number;
  qualified?: Qualified[];
};

export type Qualified = {
  qualifiers: Qualifier[];
  weight: number;
};

export type Qualifier = {
  uri: string;
  label: QualifierLabel;
};

export type QualifierLabel = 'large' | 'small' | 'tiny' | 'medium' | 'diced';

export type Parsed = {
  food: ParsedFood;
};

export type ParsedFood = {
  foodId: string;
  label: string;
  knownAs: string;
  nutrients: Nutrients;
  category: Category;
  categoryLabel: CategoryLabel;
  image: string;
};
