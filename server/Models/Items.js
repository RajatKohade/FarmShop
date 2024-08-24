const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;

class Items{
    constructor(){
        this.title=null,
        this.price=null,
        this.path=null,
        this.seller=null,
        this.discription=null
    }
    async getAllitems() {
        const client=await MongoClient.connect('mongodb://localhost:27017');
        const database=(await client).db('learn');
        const list=await database.collection('items').find().toArray();
        // console.log(list);
        client.close();
        return list;
    }
    async getItem(title){
        const client=await MongoClient.connect('mongodb://localhost:27017');
        const database=(await client).db('learn');
        const list=await database.collection('items').findOne({title:title});
        // console.log(list);
        client.close();
        return list;
    }
    async additems(obj){
        const client=await MongoClient.connect('mongodb://localhost:27017');
        const database=(await client).db('learn');
        await database.collection('items').insertOne(obj);
    }

}
module.exports=Items