import { describe, expect, it} from "vitest"
import { Pet } from "./pet"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
describe("Pet", () => {
  it("should be able to create new pet", () => {
    const sut = new Pet({
      name: "Rex",
      type: "Dog",
      age: 5,
      breed: "Golden Retriever",
      description: "A very friendly dog",
      organizationId: new UniqueEntityID()
    })

    expect(sut).toBeDefined()
  })

  it("should be available if pet not be adopted", () => {
    const sut = new Pet({
      name: "Rex",
      type: "Dog",
      age: 5,
      breed: "Golden Retriever",
      description: "A very friendly dog",
      organizationId: new UniqueEntityID()
    })

    expect(sut.available).toBe(true)
  })

  it("should be unavailable if pet already adopted", () => {
    const sut = new Pet({
      name: "Rex",
      type: "Dog",
      age: 5,
      breed: "Golden Retriever",
      description: "A very friendly dog",
      organizationId: new UniqueEntityID(),
      adoptedAt: new Date()
    })

    expect(sut.available).toBe(false)
  })
})