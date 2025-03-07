import type { PercentageSchemaType } from './percentage';
import type { CategoryType } from './schema';

export class Category {
  constructor(
    public name: string,
    public percent: number,
    public categories: Category[],
    public percentages: PercentageSchemaType[],
    private parent?: Category,
    /**
     * only the root element will get the amount injected
     */
    private _amount?: number
  ) {}

  get amount(): number {
    if (this.parent) {
      return this.parent.amount * (this.percent / 100);
    }
    if (this._amount == undefined) {
      throw new Error('amount is not defined in root category');
    }
    return this._amount;
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
