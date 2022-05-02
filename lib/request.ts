import type { NextApiRequest, NextApiResponse } from "next";
function checkReqOffsetAndLimit(
  req: NextApiRequest,
  maxLimit = 50,
  maxOffset = 2
) {
  const queryLimit = parseInt((req.query.limit as string) || "20");
  const queryOffset = parseInt((req.query.offset as string) || "1");
  /* 
  const checkLimit = queryLimit
    ? queryLimit <= maxLimit
      ? queryLimit
      : maxLimit
    : "0";
    This is the type conditional way of cheking the queryLimit 
    */

  let limit = 10;
  if (queryLimit > 0 && queryLimit <= 50) {
    limit = queryLimit;
  } else if (queryLimit > maxLimit) {
    limit = maxLimit;
  }
  //   If limit is equal or lower than 100 and higher than 0  it is going to be set as the new limit
  //  otherwise it would use 10 as default value.

  /*  const checkOffset = queryOffset
    ? queryOffset < maxOffset
      ? queryOffset
      : "0"
    : "0"; */

  let offset = 0;
  if (queryOffset < 21) {
    offset = queryOffset;
  } else {
    offset = maxOffset;
  }
  //   If offset is lower than maxOffset it is going to be  used as the offset value
  //  otherwise offset is going to be 0 by default.
  return {
    limit: limit,
    offset: offset,
  };
}
export { checkReqOffsetAndLimit };
