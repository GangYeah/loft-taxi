import { getAddressList as addressListWorker } from "./operations";
import { requestAddressList } from "./actions";
import { recordSaga } from "../recordSaga";

const list = ['address1', 'address2']

jest.mock("../api", () => ({ makeServerRequest: () => ({addresses: list}) }));

describe("addressListSaga", () => {
  describe("#REQUEST", () => {
    it("request addresses list through api", async () => {
      const dispatched = await recordSaga(
        addressListWorker,
        requestAddressList()
      );

      expect(dispatched).toEqual([
        {
          type: "REQUEST_ADDRESS_LIST_SUCCESS",
          payload: list
        },
      ]);
    });
  });
});