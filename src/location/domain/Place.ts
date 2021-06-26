export default class Place {
  constructor(
    public readonly id: string,
    public readonly city: string,
    public readonly district: string,
    public readonly state: string,
    public readonly country: string
  ) {}
}
