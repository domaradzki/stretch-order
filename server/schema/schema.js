const graphql = require("graphql");
const Order = require("../models/order");
const Sequelize = require('sequelize');
const Op = Sequelize.Op

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
    signature: { type: GraphQLString },
    symbol: { type: GraphQLString },
    details: { type: GraphQLString },
    closed: { type: GraphQLBoolean },
    documentStatus: { type: GraphQLInt },
    clientId: {
      type: ClientType,
      resolve(parent, args) {
        return console.log(parent);
      }
    }
    // client: { type: GraphQLString },
    // code: { type: GraphQLString },
    // assortment: { type: GraphQLString },
    // type: { type: GraphQLString },
    // kind: { type: GraphQLString },
    // quantity: { type: GraphQLInt },
    // price: { type: GraphQLFloat },
    // netValue: { type: GraphQLFloat },
    // deliveryAddress: { type: GraphQLString },
    // trader: { type: GraphQLString },
    // itemId: { type: GraphQLString },
    // numberOfDocumentInvoice: { type: GraphQLInt }
  })
});

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    client: { type: GraphQLString },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return [];
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(orders, { id: args.id });
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return code
        return;
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.findAll({
          where: {
            symbol: {
              [Op.or]: ["ZK", "FP"]
            },
            dateInsert: { [Op.gte]: "2019-06-01" }
          }
        });
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
