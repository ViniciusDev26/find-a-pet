import type { OrganizationRepository } from "../contracts/repositories/organization-repository";
import type { PetRepository } from "../contracts/repositories/pet-repository";

interface AdoptPetUseCaseParams {
	petId: string;
}

interface AdoptPetUseCaseResponse {
	type: "success" | "error";
	message: string;
}

export class AdoptPetUseCase {
	constructor(
		private readonly petRepository: PetRepository,
		private readonly organizationRepository: OrganizationRepository,
	) {}

	async execute(
		params: AdoptPetUseCaseParams,
	): Promise<AdoptPetUseCaseResponse> {
		const pet = await this.petRepository.findById(params.petId);
		if (!pet) {
			return {
				type: "error",
				message: "Pet not found",
			};
		}

		if (!pet.available) {
			return {
				type: "error",
				message: "Pet not available",
			};
		}

		const organization = await this.organizationRepository.findById(
			pet.organizationId.value,
		);
    
		if (!organization) {
			return {
				type: "error",
				message: "Organization not found",
			};
		}

		const messageContent = `Olá, gostaria de adotar o pet ${pet.name}!`;

		return {
			type: "success",
			message: `https://wa.me/${organization.phone}?text=${encodeURIComponent(
				messageContent,
			)}`,
		};
	}
}
