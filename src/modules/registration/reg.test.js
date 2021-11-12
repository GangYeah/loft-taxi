import { register as regWorker } from "./operations";
import { register } from "./actions";
import { recordSaga } from "../recordSaga";

jest.mock("../api", () => ({ makeServerRequest: () => ({ success: true })}));

describe("regSaga", () => {
  describe("#REGISTER", () => {
    it("registrates through api", async () => {
      const dispatched = await recordSaga(
        regWorker,
        register("test@test.com", "123123", "Michael", "Jackson")
      );

      expect(dispatched).toEqual([
        {
          type: "REGISTER_SUCCESS",
        },
      ]);
    });
  });
});