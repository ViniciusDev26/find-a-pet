import { Entity } from "../../core/entities/entity";

interface AddressProps {
  country: string
  state: string
  city: string
  street: string
  zipCode: string
  number: string
  complement?: string
}
export class Address extends Entity<AddressProps> {}