import { describe, expect, it } from "vitest";
import { Address } from "./address";

describe("Address", () => {
  it("should be able to create new address", () => {
    const sut = new Address({
      country: "Brazil",
      state: "SP",
      city: "São Paulo",
      street: "Rua A",
      zipCode: "123456",
      number: "123",
      complement: "Apto 123"
    })

    expect(sut).toBeDefined()
  })
})