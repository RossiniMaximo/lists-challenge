import algoliasearch from "algoliasearch";

const client = algoliasearch("BO7KH091QS", "e05c83f9d6049c03b6ded606943fa777");
export const productsIndex = client.initIndex("products");
