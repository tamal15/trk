const express= require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const { v4: uuidv4 } = require("uuid");
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();
const cors = require("cors");
const app=express();
const port = process.env.PORT || 5000;
const SSLCommerzPayment = require('sslcommerz')
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())

// E-krish-ban
// vfOAvj7RQdalNWU4



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lcndbqa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try{
        await client.connect();
        console.log("connected to database");
        const database = client.db('E-Keishi-BD');

        const userCollection = database.collection('users');
        const buyerProductCollection = database.collection('buyerProducts');
        const paymentCollection = database.collection('paymentUser');
        const adminProductCollection = database.collection('adminUpload');





          // add database user collection 
          app.post('/users', async(req,res)=>{
            const user=req.body;
            console.log(user)
            const result=await userCollection.insertOne(user);
            // console.log(body)
            res.json(result);
           
        })

        

        app.put('/users', async(req,res) =>{
            const user=req.body;
            console.log(user)
            const filter= {email:user.email}
            const option = {upsert:true}
            const updateDoc= {$set : user}
            const result= await userCollection.updateOne(filter,updateDoc,option)
            res.json(result)
        });

          // database searching check buyer
    app.get('/users/:email', async(req,res)=>{
        const email=req.params.email;
        const query={email:email}
        const user=await userCollection.findOne(query)
        let isbuyer=false;
        if(user?.client==='buyer'){
          isbuyer=true;
        }
        res.json({buyer:isbuyer})
    });

     // database admin role 
     app.put('/userLogin/admin', async(req,res)=>{
        const user=req.body;
        console.log('put',user)
        const filter={email:user.email}
        const updateDoc={$set:{role:'admin'}}
        const result=await userCollection.updateOne(filter,updateDoc)
        res.json(result)
    });

       // database searching check admin 
       app.get('/userLogin/:email', async(req,res)=>{
        const email=req.params.email;
        const query={email:email}
        const user=await userCollection.findOne(query)
        let isAdmin=false;
        if(user?.role==='admin'){
          isAdmin=true;
        }
        res.json({admin:isAdmin})
    });

    //    post product buyer 
    app.post('/PostUploadBuyer', async(req,res) =>{
      const user=req.body;
    console.log(user);
    
      const result=await buyerProductCollection.insertOne(user);
      res.json(result)
  });
    //    post product buyer 
    app.post('/PostUploadAdmin', async(req,res) =>{
      const user=req.body;
    console.log(user);
    
      const result=await adminProductCollection.insertOne(user);
      res.json(result)
  });

  // get product show 

  app.get("/adminShowproduct", async (req, res) => {
    const page = req.query.page;
    const size = parseInt(req.query.size);
    const query = req.query;
    delete query.page
    delete query.size
    Object.keys(query).forEach(key => {
        if (!query[key])
            delete query[key]
    });

    if (Object.keys(query).length) {
        const cursor = adminProductCollection.find(query, status = "approved");
        const count = await cursor.count()
        const allQuestions = await cursor.skip(page * size).limit(size).toArray()
        res.json({
            allQuestions, count
        });
    } else {
        const cursor = adminProductCollection.find({
            // status: "approved"
        });
        const count = await cursor.count()
        const allQuestions = await cursor.skip(page * size).limit(size).toArray()

        res.json({
            allQuestions, count
        });
    }

});

  app.get('/PostUploadBuyer', async(req,res)=>{
      const result=await buyerProductCollection.find({}).toArray()
      res.json(result)
  });

   // get product
   app.get("/products", async (req, res) => {
    const page = req.query.page;
    const size = parseInt(req.query.size);
    const query = req.query;
    delete query.page
    delete query.size
    Object.keys(query).forEach(key => {
        if (!query[key]) 
            delete query[key]
    });

    if (Object.keys(query).length) {
        const cursor = buyerProductCollection.find(query, status = "approved");
        const count = await cursor.count()
        const allData = await cursor.skip(page * size).limit(size).toArray()
        res.json({
            allData, count
        });
    } else {
        const cursor = buyerProductCollection.find({
            // status: "approved"
        });
        const count = await cursor.count()
        const allData = await cursor.skip(page * size).limit(size).toArray()

        res.json({
          allData, count
        });
    }

});

app.get('/product/:id', async(req,res)=>{
  const id=req.params.id
  const query={_id:ObjectId(id)}
  const result=await buyerProductCollection.findOne(query)
  res.json(result)
});


 //sslcommerz init
 app.post('/init', async(req, res) => {
  // console.log(req.body)
  const email=req.body.cartProducts.map((data)=>data.buyerEmail)
  const schedule=req.body.cartProducts.map((data)=>data.schedule)
  const adminemail=req.body.cartProducts.map((data)=>data.adminEmail)
  console.log(email)
  console.log(schedule)  
  const data = {
      emails:email,
      admindata:adminemail,
      total_amount: req.body.total_amount,
      currency: req.body.currency,
      tran_id: uuidv4(),
      success_url: 'http://localhost:5000/success',
      fail_url: 'http://localhost:5000/fail',
      cancel_url: 'http://localhost:5000/cancel',
      ipn_url: 'http://yoursite.com/ipn',
      shipping_method: 'Courier',
      product_name: "req.body.product_name",
      product_category: 'Electronic',
      product_profile: "req.body.product_profile",
      cus_name: req.body.cus_name,
      cus_email: req.body.cus_email,
      date: req.body.date,
      
      status: req.body.status,
      cartProducts: req.body.cartProducts,
      // buyerDetails: req.body.email,
      // buyerDetails: req.body.console.log(cartProducts),
      product_image: "https://i.ibb.co/t8Xfymf/logo-277198595eafeb31fb5a.png",
      cus_add1: req.body.cus_add1,
      cus_add2: 'Dhaka',
      cus_city: req.body.cus_city,
      schedules: req.body.schedules,
      purchase: req.body.purchase,
      cus_state:  req.body.cus_state,
      cus_postcode: req.body.cus_postcode,
      cus_country: req.body.cus_country,
      cus_phone: req.body.cus_phone,
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
      multi_card_name: 'mastercard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D'
  };
  // insert order data into database 
  const order=await paymentCollection.insertOne(data)
  console.log(data)
  const sslcommer = new SSLCommerzPayment(process.env.STORE_ID,process.env.STORE_PASSWORD,false) //true for live default false for sandbox
  sslcommer.init(data).then(data => {
      //process the response that got from sslcommerz 
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
      // console.log(data);
      // res.redirect(data.GatewayPageURL)
      if(data.GatewayPageURL){
          res.json(data.GatewayPageURL)
        }
        else{
          return res.status(400).json({
            message:'payment session failed'
          })
        }
  });
})

app.post('/success',async(req,res)=>{
  // console.log(req.body)
  const order = await paymentCollection.updateOne({tran_id:req.body.tran_id},{
      $set:{
        val_id:req.body.val_id
      }
  
    })
  res.status(200).redirect(`http://localhost:3000/success/${req.body.tran_id}`)
  // res.status(200).json(req.body)
})

app.post ('/fail', async(req,res)=>{
  // console.log(req.body);
const order=await paymentCollection.deleteOne({tran_id:req.body.tran_id})
  res.status(400).redirect('http://localhost:3000')
})
app.post ('/cancel', async(req,res)=>{
  // console.log(req.body);
  const order=await paymentCollection.deleteOne({tran_id:req.body.tran_id})
  res.status(200).redirect('http://localhost:3000')
})


app.get('/orders/:tran_id', async(req,res)=>{
  const id=req.params.tran_id;
  const order =await paymentCollection.findOne({tran_id:id});
  console.log(order)
  res.json(order)
});

// myorder check 
app.get("/myOrder/:email", async (req, res) => {
  // const buyeremail=req.body.cartProducts.map((data)=>data.buyerEmail)
  console.log(req.params.email);
  const email = req.params.email;
  const result = await paymentCollection
    .find({ cus_email: email })
    .toArray();
  res.send(result);
});

app.delete("/manageAllOrderDelete/:id", async (req, res) => {
  const result = await paymentCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.send(result);
});


 // user profile email 
      app.get('/updateUser/:email', async(req,res)=>{
        const email=req.params.email;
        const query={email:email};
        const result=await userCollection.findOne(query)
        res.json(result)
    });
 // user profile email 
    //   app.get('/updateUser/:email', async(req,res)=>{
    //     const email=req.params.email;
    //     const query={email:email};
    //     const result=await userCollection.findOne(query)
    //     res.json(result)
    // });
    // mkkk 


    // get vegetables 
     app.get("/products", async (req, res) => {
            const page = req.query.page;
            const size = parseInt(req.query.size);
            const query = req.query;
            delete query.page
            delete query.size
            Object.keys(query).forEach(key => {
                if (!query[key])
                    delete query[key] 
            });

            if (Object.keys(query).length) {
                const cursor = buyerProductCollection.find(query, status = "approved");
                const count = await cursor.count()
                const allData = await cursor.skip(page * size).limit(size).toArray()
                res.json({
                    allData, count
                });
            } else {
                const cursor = buyerProductCollection.find({
                    // status: "approved"
                });
                const count = await cursor.count()
                const allData = await cursor.skip(page * size).limit(size).toArray()

                res.json({
                    allData, count
                });
            }

        });


    }

    finally{
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req,res)=>{
    res.send("E-Krishi-BD shopping");
   });

   app.listen(port, ()=>{
    console.log("runnning online on port", port);
  });