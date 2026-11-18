/*
 * The Fenwick tree of item sizes: `sum(i)` is the offset of item `i`, in O(log n).
 */
export class FenwickTree {
  l: number;
  estimated: number;
  ft: number[];

  constructor(length: number, estimated: number) {
    this.l = length;
    this.estimated = estimated;
    this.ft = new Array<number>(length + 1).fill(0);
  }

  add(index: number, delta: number): void {
    if (delta === 0) return;
    const { l, ft } = this;
    index += 1;
    while (index <= l) {
      ft[index]! += delta;
      index += index & -index;
    }
  }

  get(index: number): number {
    return this.sum(index + 1) - this.sum(index);
  }

  sum(count: number = this.l): number {
    if (count <= 0) return 0;
    if (count > this.l) throw new Error("[FenwickTree.sum]: `count` is larger than length.");
    let sum = count * this.estimated;
    while (count > 0) {
      sum += this.ft[count]!;
      count -= count & -count;
    }
    return sum;
  }

  getBound(threshold: number): number {
    let lo = 0;
    let hi = this.l;
    while (hi > lo) {
      const mid = Math.floor((lo + hi) / 2);
      const midSum = this.sum(mid);
      if (midSum > threshold) {
        hi = mid;
        continue;
      }
      if (midSum === threshold) return mid;
      if (lo === mid) {
        return this.sum(lo + 1) <= threshold ? lo + 1 : mid;
      }
      lo = mid;
    }
    return lo;
  }
}
