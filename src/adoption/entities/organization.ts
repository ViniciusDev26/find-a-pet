import { Entity } from "../../core/entities/entity";
import type { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface OrganizationProps {
	name: string;
	phone: string;
	addressId: UniqueEntityID;
}

export class Organization extends Entity<OrganizationProps> {
	get phone() {
		return this.props.phone;
	}
}
