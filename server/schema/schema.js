const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    documentId: { type: GraphQLID },
    itemId: { type: GraphQLString },
    assortment: { type: GraphQLString },
    code: { type: GraphQLString },
    client: { type: GraphQLString },
    dateInsert: { type: GraphQLString },
    dateOfPay: { type: GraphQLString },
    dateOfRealisation: { type: GraphQLString },
    dateOfAcceptation: { type: GraphQLString },
    signature: { type: GraphQLString },
    symbol: { type: GraphQLString },
    kind: { type: GraphQLString },
    type: { type: GraphQLString },
    details: { type: GraphQLString },
    closed: { type: GraphQLBoolean },
    documentStatus: { type: GraphQLInt },
    trader: { type: GraphQLString },
    deliveryAddress: { type: GraphQLString },
    details: { type: GraphQLString },
    transport: { type: GraphQLString },
    numberOfDocumentInvoice: { type: GraphQLInt },
    invoice: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    grossWeight: { type: GraphQLFloat },
    netWeight: { type: GraphQLFloat },
    netValue: { type: GraphQLString },
    sleeve: { type: GraphQLInt },
    stretchColor: { type: GraphQLString },
    stretchThickness: { type: GraphQLInt },
    color1: { type: GraphQLString },
    color2: { type: GraphQLString },
    color3: { type: GraphQLString },
    glue: { type: GraphQLString },
    numberOfColors: { type: GraphQLString },
    printName: { type: GraphQLString },
    productCode: { type: GraphQLString },
    roller: { type: GraphQLString },
    tapeColor: { type: GraphQLString },
    tapeLong: { type: GraphQLInt },
    tapeThickness: { type: GraphQLInt },
    tapeWidth: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return console.log(parent);
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return console.log(parent);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
