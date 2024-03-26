import type { PetRepository } from "../contracts/repositories/pet-repository";

interface ListPetsUseCaseParams {
	filter: {
		city: string;
		onlyAvailable?: boolean;
	};
}

export class ListPetsUseCase {
	constructor(private readonly petRepository: PetRepository) {}
	async execute({
		filter: { city, onlyAvailable = true },
	}: ListPetsUseCaseParams) {
		const pets = await this.petRepository.list({
			city,
			adoptedAt: onlyAvailable ? null : undefined,
		});

		return pets;
	}
}
