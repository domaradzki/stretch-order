const graphql = require("graphql");
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLSchema
} = graphql;

//dummy data for checking if everything working
const orders = [
    {client: 'Name of the Wind', type: 'Fantasy', id: '1'},
    {client: 'The Final Empire', type: 'Fantasy', id: '2'},
    {client: 'The Long Earth', type: 'Sci-Fi', id: '3'}
  ]

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLInt },
    dateInsert: { type: GraphQLString },
    client: { type: GraphQLString },
    signature: { type: GraphQLString },
    symbol: { type: GraphQLString },
    code: { type: GraphQLString },
    assortment: { type: GraphQLString },
    type: { type: GraphQLString },
    kind: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    netValue: { type: GraphQLFloat },
    details: { type: GraphQLString },
    closed: { type: GraphQLBoolean},
    documentStatus: { type: GraphQLInt },
    deliveryAddress: { type: GraphQLString },
    trader: { type: GraphQLString },
    itemId: { type: GraphQLString },
    numberOfDocumentInvoice: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        order:{
            type:OrderType,
            args:{id: { type: GraphQLString }},
            resolve(parent,args){
                //code to get data from db
                return _.find(orders,{id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});