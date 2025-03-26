import type { PercentageSchemaType } from './percentage';

export class Category {
  name = $state<string>();
  percent = $state<number>(0);
  categories = $state<Category[]>([]);
  percentages = $state<PercentageSchemaType[]>([]);
  parent = $state<Category | undefined>();

  private _amount?: number;

  constructor(
    name: string,
    percent: number,
    categories: Category[],
    percentages: PercentageSchemaType[],
    parent?: Category,
    /**
     * only the root element will get the amount injected
     */
    _amount?: number
  ) {
    this.name = name;
    this.percent = percent;
    this.categories = categories;
    this.percentages = percentages;
    this.parent = parent;
    this._amount = _amount;
  }

  get amount(): number {
    if (this.parent) {
      return this.parent.amount * (this.percent / 100);
    }
    if (this._amount == undefined) {
      throw new Error('amount is not defined in root category');
    }
    return this._amount;
  }

  get availablePercent(): number {
    return 100 - this.categories.reduce((previous, current) => previous + current.percent, 0);
  }

  toJSON() {
    return {
      name: this.name,
      percent: this.percent,
      categories: this.categories,
      percentages: this.percentages,
      amount: this._amount
    };
  }
}
