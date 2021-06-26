export default class User {
  constructor(
    public readonly id: string,
    public readonly place_id: string,
    public readonly number: string,
    public readonly name: string,
    public readonly gender?: string,
    public readonly age?: Date,
    public readonly donor?: boolean,
    public readonly bloodGroup?: string
  ) {}
}

// enum BloodGroup {
//   "A+",
//   "A-",
//   "B+",
//   "B-",
//   "AB+",
//   "AB-",
//   "O+",
//   "O-",
// }
