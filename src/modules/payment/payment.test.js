import { getOrSetCardDetails as paymentWorker } from "./operations";
import { requestCard, sendCard } from "./actions";
import { recordSaga } from "../recordSaga";

const cardDetails = {
  cardName: "test",
  cardNumber: "0000 0000 0000 0000",
  expiryDate: "00/00",
  cvc: "000"
}

jest.mock("../api", () => ({ makeServerRequest: (method) => method == "GET" ? cardDetails : { success: true } }));

describe("paymentSaga", () => {
  describe("#REQUEST", () => {
    it("get card details through api", async () => {
      const dispatched = await recordSaga(
        paymentWorker,
        requestCard("AUTH_TOKEN")
      );

      expect(dispatched).toEqual([
        {
          type: "REQUEST_CARD_DETAILS_SUCCESS",
          payload: cardDetails
        },
      ]);
    });
  });
  describe("#SEND", () => {
    it("send card details through api", async () => {
      const dispatched = await recordSaga(
        paymentWorker,
        sendCard(...Object.values(cardDetails))
      );

      expect(dispatched).toEqual([
        {
          type: "SEND_CARD_DETAILS_SUCCESS",
        },
      ]);
    })
  })
});