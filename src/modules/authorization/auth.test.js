import { authenticate as authWorker } from "./operations";
import { authenticate } from "./actions";
import { recordSaga } from "../recordSaga";

jest.mock("../api", () => ({ makeServerRequest: () => ({ success: true, token: "AUTH_TOKEN" })}));

describe("authSaga", () => {
  describe("#AUTHENTICATE", () => {
    it("authenticates through api", async () => {
      const dispatched = await recordSaga(
        authWorker,
        authenticate("test@test.com", "123123")
      );

      expect(dispatched).toEqual([
        {
          type: "LOG_IN",
          payload: 'AUTH_TOKEN'
        },
      ]);
    });
  });
});