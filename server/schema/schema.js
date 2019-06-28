const graphql = require("graphql");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Order = require("../models/order");
const Client = require("../models/client");
const Trader = require("../models/trader");
const User = require("../models/user");
const Item = require("../models/item");
const Assortment = require("../models/assortment");
const Kind = require("../models/kind");
const Type = require("../models/type");
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
            itemId: parent.id
          }
        });
      }
    }

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
    id: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    netValue: { type: GraphQLFloat },
    itemId: { type: GraphQLID },
    assortmentId: { type: GraphQLID },
    assortment: {
      type: AssortmentType,
      resolve(parent, args) {
        return Assortment.findOne({
          where: {
            id: parent.assortmentId,
            code: { [Op.notIn]: ["TRANSPORT IN POST", "TRANSPORT"] }
          }
        });
      }
    }
  })
});

const AssortmentType = new GraphQLObjectType({
  name: "Assortment",
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    kindId: { type: GraphQLID },
    typeId: { type: GraphQLID },
    kind: {
      type: KindType,
      resolve(parent, args) {
        return Kind.findOne({
          where: {
            id: parent.kindId
          }
        });
      }
    },
    type: {
      type: TypeType,
      resolve(parent, args) {
        return Type.findOne({
          where: {
            id: parent.typeId
          }
        });
      }
    }
  })
});

const KindType = new GraphQLObjectType({
  name: "Kind",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const TypeType = new GraphQLObjectType({
  name: "Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
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
        Client.hasOne(Order, { foreignKey: "clientId" });
        Order.belongsTo(Trader, { foreignKey: "traderId" });
        Trader.hasOne(Order, { foreignKey: "traderId" });
        Order.belongsTo(Address, {
          foreignKey: { [Op.or]: ["addressId", "addressOutId"] }
        });
        Address.hasOne(Order, {
          foreignKey: { [Op.or]: ["addressId", "addressOutId"] }
        });
        Order.hasOne(Item, { foreignKey: "itemId" });
        Item.belongsTo(Order, { foreignKey: "itemId" });
        Assortment.hasOne(Item, { foreignKey: "assortmentId" });
        Item.belongsTo(Assortment, { foreignKey: "assortmentId" });
        User.hasOne(Trader, { foreignKey: "userId" });
        Trader.belongsTo(User, { foreignKey: "userId" });
        Kind.hasOne(Assortment, { foreignKey: "kindId" });
        Assortment.belongsTo(Kind, { foreignKey: "kindId" });
        Type.hasOne(Assortment, { foreignKey: "typeId" });
        Assortment.belongsTo(Type, { foreignKey: "typeId" });
        return Order.findAll({
          include: [
            { model: Client, required: true },
            { model: Address },
            { model: Trader, required: true, include: [{ model: User }] },
            {
              model: Item,
              include: [
                {
                  model: Assortment,
                  required: true,
                  include: [{ model: Kind }, { model: Type }]
                }
              ]
            }
          ],
          where: {
            symbol: {
              [Op.or]: ["ZK", "FP"]
            },
            dateInsert: { [Op.gte]: "2019-06-25" }
          },
          order: [["id", "DESC"]]
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
