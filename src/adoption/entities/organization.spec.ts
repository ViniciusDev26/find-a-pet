import { describe, expect, it } from "vitest";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Organization } from "./organization";

describe("Organization", () => {
  it("should be able to create new organization", () => {
    const sut = new Organization({
      name: "Animal Shelter",
      phone: "123456789",
      addressId: new UniqueEntityID()
    })

    expect(sut).toBeDefined()
  })
})