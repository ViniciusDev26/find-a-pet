import { beforeEach, describe, expect, it } from "vitest";
import { ListPetsUseCase } from "./list-pets-usecase";
import { mock, type MockProxy } from "vitest-mock-extended";
import type { PetRepository } from "../contracts/repositories/pet-repository";

describe("ListPetsUseCase", () => {
	let sut: ListPetsUseCase;
	let petRepository: MockProxy<PetRepository>;

	beforeEach(() => {
		petRepository = mock();
		petRepository.list.mockResolvedValue([]);

		sut = new ListPetsUseCase(petRepository);
	});

	it("should return empty list if no pets found", async () => {
		const result = await sut.execute({
			filter: {
				city: "any city",
			},
		});

		expect(result).toEqual([]);
	});

  it("should call petRepository with correct params to only available pets", async () => {
    const city = "any city";
    await sut.execute({
      filter: {
        city,
      },
    });

    expect(petRepository.list).toHaveBeenCalledWith({
      city,
      adoptedAt: null,
    });
  })

  it("should call petRepository with correct params to all pets", async () => {
    const city = "any city";
    await sut.execute({
      filter: {
        city,
        onlyAvailable: false
      },
    });

    expect(petRepository.list).toHaveBeenCalledWith({
      city,
    });
  })
});
