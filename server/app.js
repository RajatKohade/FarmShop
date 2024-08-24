const express = require('express')
const Sign = require('./Models/Sign')
const cors=require('cors')
const app = express();
const session=require('express-session');
const bodyParser = require('body-parser');
const Items =require('./Models/Items');
const multer=require('multer');

app.use(cors(
    {
        origin:['http://localhost:3000','http://192.168.152.214:3000'],
        methods:['GET','POST'],
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret:'secret',resave:false,saveUninitialized:false}));
app.use(bodyParser.json())

const stgconfig=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../client/public/Images');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+''+file.originalname)
    }
});

const upload=multer({storage:stgconfig});

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Server <h1>');
});

app.post('/getdata',async (req, res) => {
    let obj=new Sign();
    let data=await obj.getDetails(req.body.email,req.body.password,req.body.category);
  //  console.log(data);
    if(data!==null)
    {
        req.session.user={
            valid:true,
            username:data.name,
        };
        res.json({msg:'Signed In'});
    }
    else{
        res.json(null);
    }
});
app.post('/adddata',async (req, res) => {
    console.log(req.body.name,req.body.email,req.body.password,req.body.category);
    let obj=new Sign();
    let result=await obj.addDetails(req.body.name,req.body.email,req.body.password,req.body.category);
    if(result)
    {
    res.json({ msg: 'Added' });
    }
    else{
    res.json(null);
    }
});

app.get('/getses',(req,res)=>{
    let user=req.session.user;
    console.log(user)
    res.json(user);
});

app.get('/getitems',async (req,res)=>{
    let items=new Items();
    let list=await items.getAllitems();
    if(list)
    {
        return res.json(list);
    }
    else{
        return res.json(null);
    }
});

app.post('/addnewitem',upload.single('image'),async(req,res)=>{
    let formdata=req.body;
    let file=req.file;
    let itm=new Items();
   if(req.session.user && req.session.user.valid===true)
   {
    await itm.additems({...formdata,price:parseInt(req.body.price),seller:req.session.user.username,path:'../Images/'+file.filename})
    return res.json({data:true});
   }
   else{
    return res.json({data:false});
   } 

});

app.listen(5000);