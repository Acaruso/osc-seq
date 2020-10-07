import { getUpdatedBall } from "./../ball";

function getMessageProducersTable(state) {
  return {
    "get updated ball": (state) => {
      return getUpdatedBall(state);
    },
  }
}

export { getMessageProducersTable };
