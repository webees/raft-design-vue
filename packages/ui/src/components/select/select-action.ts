export class SelectAction {
  constructor(
    readonly run: () => void,
    readonly close = true,
  ) {}
}
