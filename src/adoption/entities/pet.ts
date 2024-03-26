import { Entity } from "../../core/entities/entity";
import type { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface PetProps {
	name: string;
	type: string;
	age: number;
	breed: string;
	description: string;
	organizationId: UniqueEntityID;
	adoptedAt?: Date;
}

export class Pet extends Entity<PetProps> {
	get available() {
		return this.props.adoptedAt === undefined;
	}

	get name() {
		return this.props.name;
	}

	get organizationId() {
		return this.props.organizationId
	}
}
