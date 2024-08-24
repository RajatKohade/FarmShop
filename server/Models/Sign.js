const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
class Sign
{
   constructor(){
    this.name=null;
    this.email=null;
    this.password=null;
    this.category=null;
   }
    async getDetails(email,password,category){
        const client=await MongoClient.connect('mongodb://localhost:27017');
        const database=(await client).db('learn');
        const data=await database.collection('farmshop').findOne({email:email,password:password,category:category});
        client.close();
        return (data !== null) ? data : null;
    }
    async addDetails(name,email,password,category)
    {
        const client=await MongoClient.connect('mongodb://localhost:27017');
        const database=(await client).db('learn');
        let data={
            name:name,
            email:email,
            password:password,
            category:category
        }
        await database.collection('farmshop').insertOne(data);
        client.close();
        return true;
    }
}
module.exports=Sign;