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
  sqlTable: "[ModelDanychContainer].[Dokumenty]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "Id" },
    dateInsert: { type: GraphQLString, sqlColumn: "DataWprowadzenia" },
    signature: {
      type: GraphQLString,
      sqlColumn: "NumerWewnetrzny_PelnaSygnatura"
    },
    symbol: { type: GraphQLString, sqlColumn: "Symbol" },
    details: { type: GraphQLString, sqlColumn: "Uwagi" },
    closed: { type: GraphQLBoolean, sqlColumn: "Zamkniety" },
    documentStatus: { type: GraphQLInt, sqlColumn: "StatusDokumentuId" },
    clientId: { type: GraphQLID, sqlColumn: "PodmiotWybranyId" },
    traderId: { type: GraphQLID, sqlColumn: "PodmiotId" },
    addressId: { type: GraphQLID, sqlColumn: "MiejsceDostawyId" },
    addressOutId: { type: GraphQLID, sqlColumn: "MiejsceDostawyZewnetrzneId" },
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
            id: parent.addressId
          }
        });
      }
    },
    address2: {
      type: AddressType,
      resolve(parent, args) {
        return Address.findOne({
          where: {
            id: parent.addressOutId
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
  sqlTable: "[ModelDanychContainer].[PodmiotHistorie]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "Id" },
    name: { type: GraphQLString, sqlColumn: "Nazwa" },
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
  sqlTable: "[ModelDanychContainer].[OpiekunowiePodmiotu]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "PodmiotOpiekunaPodstawowego_Id" },
    userId: { type: GraphQLID, sqlColumn: "UzytkownikId" },
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
  sqlTable: "[ModelDanychContainer].[Uzytkownicy]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "Id" },
    name: { type: GraphQLString, sqlColumn: "Login" }
  })
});

const AddressType = new GraphQLObjectType({
  name: "Address",
  sqlTable: "[ModelDanychContainer].[AdresHistorie]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "Id" },
    deliveryAddress: { type: GraphQLString, sqlColumn: "LiniaCalosc" }
  })
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  sqlTable: "[ModelDanychContainer].[PozycjeDokumentu]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLString, sqlColumn: "NumerReferencyjny" },
    quantity: { type: GraphQLFloat, sqlColumn: "Ilosc" },
    price: { type: GraphQLFloat, sqlColumn: "Cena_NettoPoRabacie" },
    netValue: { type: GraphQLFloat, sqlColumn: "Wartosc_NettoPoRabacie" },
    itemId: { type: GraphQLID, sqlColumn: "Dokument_Id" },
    assortmentId: { type: GraphQLID, sqlColumn: "AsortymentAktualnyId" },
    assortment: {
      type: AssortmentType,
      resolve(parent, args) {
        return Assortment.findOne({
          where: {
            id: parent.assortmentId
          }
        });
      }
    }
  })
});

const AssortmentType = new GraphQLObjectType({
  name: "Assortment",
  sqlTable: "[ModelDanychContainer].[Asortymenty]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "Id" },
    code: { type: GraphQLString, sqlColumn: "Symbol" },
    name: { type: GraphQLString, sqlColumn: "Nazwa" },
    kindId: { type: GraphQLID, sqlColumn: "Rodzaj_Id" },
    typeId: { type: GraphQLID, sqlColumn: "Grupa_Id" },
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
  sqlTable: "[ModelDanychContainer].[RodzajeAsortymentu]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "Id" },
    name: { type: GraphQLString, sqlColumn: "Symbol" }
  })
});

const TypeType = new GraphQLObjectType({
  name: "Type",
  sqlTable: "[ModelDanychContainer].[GrupyAsortymentu]",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLID, sqlColumn: "Id" },
    name: { type: GraphQLString, sqlColumn: "Nazwa" }
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
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          return knex.raw(sql);
        });
      }
      // resolve(parent, args) {
      //   return Order.findAll({
      //     include: [
      //       { model: Client, required: true },
      //       { model: Address },
      //       { model: Trader, required: true, include: [{ model: User }] },
      //       {
      //         model: Item,
      //         required: true,
      //         include: [
      //           {
      //             model: Assortment,
      //             required: true,
      //             include: [
      //               { model: Kind, required: true },
      //               { model: Type, required: true }
      //             ]
      //           }
      //         ]
      //       }
      //     ],
      //     where: {
      //       symbol: {
      //         [Op.or]: ["ZK", "FP"]
      //       },
      //       dateInsert: { [Op.gte]: "2019-07-01" }
      //     },
      //     order: [["id", "DESC"]]
      //   });
      // }
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
