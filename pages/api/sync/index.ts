import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { airtableBase } from "../../../lib/airtable";
import { productsIndex } from "../../../lib/algolia";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    airtableBase("Furniture")
      .select({})
      .eachPage(
        async function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          const results = records.map((r) => {
            return {
              objectID: r.id,
              ...r.fields,
            };
          });
          const saveInAlgolia = await productsIndex.saveObjects(results);
          console.log("next page");

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          res.send("stopped");
        }
      );
  },
});
