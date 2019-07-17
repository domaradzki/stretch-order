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
    dateInsert: { type: GraphQLString },
    dateOfPay: { type: GraphQLString },
    dateOfRealisation: { type: GraphQLString },
    signature: { type: GraphQLString },
    symbol: { type: GraphQLString },
    details: { type: GraphQLString },
    closed: { type: GraphQLBoolean },
    documentStatus: { type: GraphQLInt },
    deliveryAddress: { type: GraphQLString },
    transport: { type: GraphQLString },
    numberOfDocumentInvoice: { type: GraphQLInt },
    invoice: { type: GraphQLString },
    clientId: { type: GraphQLInt },
    traderId: { type: GraphQLInt },
    productId: { type: GraphQLInt }
  })
});

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    name: { type: GraphQLString }
  })
});

const TraderType = new GraphQLObjectType({
  name: "Trader",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    itemId: { type: GraphQLString },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    kind: { type: GraphQLString },
    type: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    netValue: { type: GraphQLString },
    productionId: { type: GraphQLInt }
  })
});

const TapeType = new GraphQLObjectType({
  name: "Tape",
  fields: () => ({
    printName: { type: GraphQLString },
    dateOfAcceptation: { type: GraphQLString },
    numberOfColors: { type: GraphQLString },
    color1: { type: GraphQLString },
    color2: { type: GraphQLString },
    color3: { type: GraphQLString },
    glue: { type: GraphQLString },
    roller: { type: GraphQLString },
    tapeColor: { type: GraphQLString },
    tapeLong: { type: GraphQLInt },
    tapeThickness: { type: GraphQLInt },
    tapeWidth: { type: GraphQLInt }
  })
});

const StretchType = new GraphQLObjectType({
  name: "Stretch",
  fields: () => ({
    grossWeight: { type: GraphQLFloat },
    netWeight: { type: GraphQLFloat },
    sleeve: { type: GraphQLInt },
    stretchColor: { type: GraphQLString },
    stretchThickness: { type: GraphQLInt }
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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrder: {
      type: OrderType,
      args: {
        name: String
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
