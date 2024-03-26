import type { Pet } from '../../entities/pet';

interface ListPetsParams {
  city?: string
  adoptedAt?: Date | null
}
export interface PetRepository {
  list(params?: ListPetsParams): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}