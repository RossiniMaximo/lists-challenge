import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { productsIndex } from "../../../lib/algolia";
import { checkReqOffsetAndLimit } from "../../../lib/request";

function getValues(body) {
  console.log({ body });
  let res: any = {};
  body.hits.map((hit) => {
    if (hit.Name) {
      res.name = hit.Name;
    }
    if (hit.Description) {
      res.description = hit.Description;
    }
    if (hit.Type) {
      res.type = hit.Type;
    }
    if (hit.UnitCost) {
      res.price = hit.unitCost;
    }
    if (hit.Color) {
      res.color = hit.Color;
    }
  });

  console.log({ res });

  return res;
}

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query.q as string;
    const { limit, offset } = checkReqOffsetAndLimit(req);
    console.log({ offset });
    console.log({ limit });
    console.log({ query });

    const search = await productsIndex.search(query, {
      hitsPerPage: limit,
      page: offset > 1 ? Math.floor(offset / limit) : 0,
    });

    res.send({
      results: search.hits,
      pagination: {
        length: offset,
        limit,
        total: search.nbHits,
      },
    });
  },
});
