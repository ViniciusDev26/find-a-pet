import type { Organization } from '../../entities/organization';

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>;
}