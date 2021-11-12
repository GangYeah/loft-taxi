import { getRoute as routeWorker } from "./operations";
import { requestRoute } from "./actions";
import { recordSaga } from "../recordSaga";

const coordinates = [];
jest.mock("../api", () => ({ makeServerRequest: () => coordinates}));

describe("routeSaga", () => {
  describe("#REQUEST", () => {
    it("get route through api", async () => {
      const dispatched = await recordSaga(
        routeWorker,
        requestRoute("address1", "address2")
      );

      expect(dispatched).toEqual([
        {
          type: "REQUEST_ROUTE_SUCCESS",
          payload: coordinates
        },
      ]);
    });
  });
});