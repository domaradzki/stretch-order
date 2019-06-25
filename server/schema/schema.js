const graphql = require("graphql");
const Sequelize = require("sequelize");
const sequelize = require('../config');
const Op = Sequelize.Op;

const Order = require("../models/order");
const Client = require("../models/client");
const Trader = require("../models/trader");
const User = require("../models/user");
const Item = require("../models/item");
const Address = require("../models/address");

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
    clientId: { type: GraphQLID },
    traderId: { type: GraphQLID },
    addressId: { type: GraphQLID },
    addressOutId: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findOne({
          where: {
            id: parent.clientId
          }
        });
      }
    },
    address: {
      type: AddressType,
      resolve(parent, args) {
        return Address.findOne({
          where: {
            id: {
              [Op.or]: [parent.addressId, parent.addressOutId]
            }
          }
        });
      }
    },
    trader: {
      type: TraderType,
      resolve(parent, args) {
        return Trader.findOne({
          where: {
            id: parent.traderId
          }
        });
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.findAll({
          where: {
            id: parent.id
          }
        });
      }
    }

    // code: { type: GraphQLString },
    // assortment: { type: GraphQLString },
    // type: { type: GraphQLString },
    // kind: { type: GraphQLString },
    // quantity: { type: GraphQLInt },
    // price: { type: GraphQLFloat },
    // netValue: { type: GraphQLFloat },

    // itemId: { type: GraphQLString },
    // numberOfDocumentInvoice: { type: GraphQLInt }
  })
});

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.findAll({ where: { clientId: parent.id } });
      }
    }
  })
});

const TraderType = new GraphQLObjectType({
  name: "Trader",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findOne({
          where: {
            id: parent.userId
          }
        });
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    id: { type: GraphQLID },
    deliveryAddress: { type: GraphQLString }
  })
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    quantity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    netValue: { type: GraphQLFloat },
    itemId: { type: GraphQLString },
    assortmentId: { type: GraphQLID }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Order.findOne({
          where: {
            id: args.id
          }
        });
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return code
        return Client.findOne({
          where: {
            id: args.id
          }
        });
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        Order.belongsTo(Client, { foreignKey: "clientId" });
        Order.belongsTo(Trader, { foreignKey: "traderId" });
        Order.hasMany(Item, { foreignKey: "id" });
        return Order.findAll({
          include: [
            { model: Client, required: true },
            { model: Item, required: true }
          ],
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
        return Client.findAll();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
