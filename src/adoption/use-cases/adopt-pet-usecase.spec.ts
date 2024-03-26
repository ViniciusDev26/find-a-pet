import { describe, it, beforeEach, expect } from "vitest";
import { AdoptPetUseCase } from "./adopt-pet-usecase";

import { mock, type MockProxy } from "vitest-mock-extended";
import type { PetRepository } from "../contracts/repositories/pet-repository";
import type { OrganizationRepository } from "../contracts/repositories/organization-repository";
import { Pet } from "../entities/pet";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Organization } from "../entities/organization";

describe("AdoptPetUseCase", () => {
	let sut: AdoptPetUseCase;
	let petRepository: MockProxy<PetRepository>;
	let organizationRepository: MockProxy<OrganizationRepository>;

	beforeEach(() => {
		petRepository = mock();
		petRepository.findById.mockResolvedValue(
			new Pet({
				name: "Any Name",
				type: "Any Type",
				age: 1,
				breed: "Any Breed",
				description: "Any Description",
				organizationId: new UniqueEntityID(),
			}),
		);

		organizationRepository = mock();
		organizationRepository.findById.mockResolvedValue(
			new Organization({
				name: "Any Name",
				phone: "Any Phone",
				addressId: new UniqueEntityID(),
			}),
		);

		sut = new AdoptPetUseCase(petRepository, organizationRepository);
	});

	it("should return error if pet not found", async () => {
		const petId = "invalidId";
		petRepository.findById.mockResolvedValueOnce(null);

		const result = await sut.execute({ petId });

		expect(result).toEqual({
			type: "error",
			message: "Pet not found",
		});
	});

	it("should return error if pet if not available", async () => {
		const petId = "validId";
		petRepository.findById.mockResolvedValue(
			new Pet({
				name: "Any Name",
				type: "Any Type",
				age: 1,
				breed: "Any Breed",
				description: "Any Description",
				organizationId: new UniqueEntityID(),
				adoptedAt: new Date(),
			}),
		);

		const result = await sut.execute({ petId });

		expect(result).toEqual({
			type: "error",
			message: "Pet not available",
		});
	});

	it("should return error if organization not found", async () => {
		const petId = "validId";
		organizationRepository.findById.mockResolvedValueOnce(null);

		const result = await sut.execute({ petId });

		expect(result).toEqual({
			type: "error",
			message: "Organization not found",
		});
	});

	it("should return location url if success", async () => {
		const petId = "validId";

		const result = await sut.execute({ petId });

		const messageContent = "Olá, gostaria de adotar o pet Any Name!";
		expect(result).toEqual({
			type: "success",
			message: `https://wa.me/Any Phone?text=${encodeURIComponent(
				messageContent,
			)}`,
		});
	});
});
