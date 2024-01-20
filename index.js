const express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;
const fileUpload=require('express-fileupload');
require('dotenv').config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const SSLCommerzPayment = require('sslcommerz')
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
app.use(express.json())
app.use(fileUpload());





// const uri = "mongodb+srv://black:TKZ0TdahzbTYZtju@cluster0.jmwzwfx.mongodb.net/?retryWrites=true&w=majority";

// const uri = "mongodb+srv://blacks:Z8ZIKdXw61GAjXUJ@cluster0.jmwzwfx.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://blacks:Z8ZIKdXw61GAjXUJ@cluster0.li1977d.mongodb.net/?retryWrites=true&w=majority";
// const uri = `mongodb+srv://blacks:Zm5Y38ZMoNV3DJK2@cluster0.jmwzwfx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

  try {
    await client.connect();
    console.log("connected to database");
    const database = client.db('black_electrical');

    const userCollection = database.collection('users');
    const buyerProductCollection = database.collection('sellerProducts');
    const paymentCollection = database.collection('paymentUser');
    const adminProductCollection = database.collection('adminUpload');
    const electricianuploadCollection = database.collection('electricianuploadsdata');
    const doctorPaymentCollection = database.collection('doctorPayment');
    const bookElectriciansCollection = database.collection('bookElectrician');
    const blogRoboticsCollection = database.collection('blogRobotics');
    const contactusCollection = database.collection('contactus');
    





    // add database user collection 
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user)
      const result = await userCollection.insertOne(user);
      // console.log(body)
      res.json(result);

    })

    app.post('/contactus', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await contactusCollection.insertOne(user);
      res.json(result)
    });



    app.put('/users', async (req, res) => {
      const user = req.body;
      console.log(user)
      const filter = { email: user.email }
      const option = { upsert: true }
      const updateDoc = { $set: user }
      const result = await userCollection.updateOne(filter, updateDoc, option)
      res.json(result)
    });

    // database searching check buyer
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const user = await userCollection.findOne(query)
      let isbuyer = false;
      if (user?.client === 'buyer') {
        isbuyer = true;
      }
      res.json({ buyer: isbuyer })
    });
    // database searching check doctor
    app.get('/usersdatas/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const user = await userCollection.findOne(query)
      let isdoctor = false;
      if (user?.client === 'doctor') {
        isdoctor = true;
      }
      res.json({ doctor: isdoctor })
    });

    // database admin role 
    app.put('/userLogin/admin', async (req, res) => {
      const user = req.body;
      console.log('put', user)
      const filter = { email: user.email }
      const updateDoc = { $set: { role: 'admin' } }
      const result = await userCollection.updateOne(filter, updateDoc)
      res.json(result)
    });

    // database searching check admin 
    app.get('/userLogin/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const user = await userCollection.findOne(query)
      let isAdmin = false;
      if (user?.role === 'admin') {
        isAdmin = true;
      }
      res.json({ admin: isAdmin })
    });

      //  post product buyer 
    app.post('/PostUploadBuyer', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await buyerProductCollection.insertOne(user);
      res.json(result)
    });

    app.post('/electricianupload', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await electricianuploadCollection.insertOne(user);
      res.json(result)
    });

  //   app.post('/PostUploadBuyer', async(req,res)=>{
  //     const productName=req.body.productName;
  //     const ProductPrice=req.body.ProductPrice;
  //     const categories=req.body.categories;
  //     const description=req.body.description;
  //     const pic=req.files.img;
      
  //     const picData=pic.data;
  //     const encodeedPic=picData.toString('base64');
  //     const buffer=Buffer.from(encodeedPic, 'base64');
  //     const product={
  //       productName,
  //       ProductPrice,
  //       categories,
  //       description,
  //         img:buffer
  //     }
  //     console.log(product)
  //     const result=await buyerProductCollection.insertOne(product);
  //      res.json(result)
  //  });
    //    post video apply
   
    //    post doctor data info apply
    app.post('/blogrobot', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await blogRoboticsCollection.insertOne(user);
      res.json(result)
    });


    // see appoint doctor 

     // app get 
     app.get('/patient', async(req,res)=>{
      // const email=req.query.email
      const date=req.query.date;
      // const date=new Date(req.query.date).toLocaleDateString();
      console.log(date)
      const query={ date:date}
      console.log(query)
      const cursor=appointmentCollection.find(query)
      const appointment=await cursor.toArray()
      res.json(appointment)
    });

    
     // myorder check 
     app.get("/feedback/:email", async (req, res) => {
      // const buyeremail=req.body.cartProducts.map((data)=>data.buyerEmail)
      console.log(req.params.email);
      const email = req.params.email;
      const result = await applyvideoCollection
        .find({ usersEmail: email })
        .toArray();
      res.send(result);
    });


    // get doctor portal 

    app.get('/showBlog', async (req, res) => {
      const result = await blogRoboticsCollection.find({}).toArray()
      res.json(result)
    });
  

   
    // buyer check and admin confarm 
app.get('/adminConfarm', async(req,res)=>{
  const result=await bookElectriciansCollection.find({}).toArray()
  res.json(result)
});

app.get('/contactus', async(req,res)=>{
  const result=await contactusCollection.find({}).toArray()
  res.json(result)
});

app.get('/adminConfarmadmin', async(req,res)=>{
  const result=await userCollection.find({}).toArray()
  res.json(result)
});

// electrician show 
app.get('/showElectrician', async(req,res)=>{
  const result=await electricianuploadCollection.find({}).toArray()
  res.json(result)
});

// delete user 
app.delete('/deleteUser/:id', async(req,res)=>{
  const result=await bookElectriciansCollection.deleteOne({_id:ObjectId(req.params.id)});
  // res.json(result)
});

// buyer status update 

app.put("/buyerStatusUpdatess/:id", async (req, res) => {
  console.log(req.body)

  const filter = { _id: ObjectId(req.params.id) };
  
  const result = await applyvideoCollection.updateOne(filter, {
      $set: {
          code: req.body.statu,
      },
      
  });
  // console.log(result)
  res.send(result);
});

// buyer status update 

app.put("/electricianStatusUpdates/:id", async (req, res) => {
  console.log(req.body)

  const filter = { _id: ObjectId(req.params.id) };
  
  const result = await bookElectriciansCollection.updateOne(filter, {
      $set: {
          positions: req.body.statu,
      },
      
  });
  // console.log(result)
  res.send(result);
});


    // update video code 

    // upadate status for put api 
    app.put('/updateStatus/:orderId', async(req,res)=>{
      const id=req.params.orderId;
      const updateDoc=req.body.code;
      console.log(updateDoc)
      const updateTime=req.body.time;
      console.log(updateTime)
      const filter={_id:ObjectId(id)}
      const result=await applyvideoCollection.updateOne(filter,{
          $set:{code:updateDoc,
                time:updateTime
          }
      })
      res.json(result)
  });

  // update video call code and time 
  app.put("/buyerStatusUpdate/:id", async (req, res) => {
    // console.log(req.body)

    const filter = { _id: ObjectId(req.params.id) };
    
    const result = await applyvideoCollection.updateOne(filter, {
        $set: {
            code: req.body.statu,
            // time: req.body.statu,
        },
        
    });
    // console.log(result)
    res.send(result);
});

  // delete vido call 

  app.delete('/deleteManage/:id', async(req,res)=>{
    const result=await applyvideoCollection.deleteOne({_id:ObjectId(req.params.id)});
    res.json(result)
})


    //    post product buyer 
    app.post('/PostUploadAdmin', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await adminProductCollection.insertOne(user);
      res.json(result)
    });
    //    post product buyer 
    app.post('/bookElectrician', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await bookElectriciansCollection.insertOne(user);
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

    app.get('/PostUploads', async (req, res) => {
      const result = await buyerProductCollection.find({}).toArray()
      res.json(result)
    });

    app.get("/ValueUpdates", async(req,res)=>{
      const result=await buyerProductCollection.find({}).toArray()
      res.json(result)
    })

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




    // upadeta data show 

    app.get("/my", async (req, res) => {
      // const buyeremail=req.body.emails.map((data)=>data.buyerEmail)
      // console.log(emails)
      // console.log(req.params.email);
      const email = req.params.email;
      console.log(email)
      const result = await paymentCollection
        .find()
        .toArray();
      res.send(result);
    });

    app.put('/updateStatusdata/:id', async(req,res)=>{
      const id=req.params.id;
      const updateDoc=req.body.status;
      console.log(updateDoc)
      console.log(updateDoc)
      const filter={_id:ObjectId(id)}
      const result=await paymentCollection.updateOne(filter,{
          $set:{status:updateDoc}
      })
      res.json(result)
  });

  // / Delete manage all product ----------
app.delete("/manageAllOrderDelete/:id", async (req, res) => {
    const result = await paymentCollection.deleteOne({_id:ObjectId(req.params.id)});
    res.send(result);
  });

     // delete product 
     app.delete('/deleteQuestion/:id', async(req,res)=>{
      const result=await paymentCollection.deleteOne({_id:ObjectId(req.params.id)});
      // res.json(result)
  });

    app.get('/product/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await buyerProductCollection.findOne(query)
      res.json(result)
    });
    app.get('/ElectricianDetail/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await electricianuploadCollection.findOne(query)
      res.json(result)
    });
    // admin product details 
    app.get('/adminsproduct/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await adminProductCollection.findOne(query)
      res.json(result)
    });

    // doctor upload details part get 
    app.get('/doctorDetails/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await DoctorUploadCollection.findOne(query)
      res.json(result)
    });


    //sslcommerz init
    app.post('/init', async (req, res) => {
      // console.log(req.body)
      const email = req.body.cartProducts.map((data) => data.buyerEmail)
      const schedule = req.body.cartProducts.map((data) => data.schedule)
      const adminemail = req.body.cartProducts.map((data) => data.adminEmail)
      console.log(email)
      console.log(schedule)
      const data = {
        emails: email,
        admindata: adminemail,
        total_amount: req.body.total_amount,
        currency: req.body.currency,
        tran_id: uuidv4(),
        success_url: 'http://localhost:5000/success',
        fail_url: 'http://localhost:5000/fail',
        cancel_url: 'http://localhost:5000/cancel',
        ipn_url: 'http://localhost:5000/ipn',
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
        cus_state: req.body.cus_state,
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
      const order = await paymentCollection.insertOne(data)
      console.log(data)
      const sslcommer = new SSLCommerzPayment('ekris63f46e4b4aa67', 'ekris63f46e4b4aa67@ssl',false) //true for live default false for sandbox
      sslcommer.init(data).then(data => {
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
        // console.log(data);
        // res.redirect(data.GatewayPageURL)
        if (data.GatewayPageURL) {
          res.json(data.GatewayPageURL)
        }
        else {
          return res.status(400).json({
            message: 'payment session failed'
          })
        }
      });
    })

    app.post('/success', async (req, res) => {
      // console.log(req.body)
      const order = await paymentCollection.updateOne({ tran_id: req.body.tran_id }, {
        $set: {
          val_id: req.body.val_id
        }

      })
      res.status(200).redirect(`http://localhost:3000/success/${req.body.tran_id}`)
      // res.status(200).json(req.body)
    })

    app.post('/fail', async (req, res) => {
      // console.log(req.body);
      const order = await paymentCollection.deleteOne({ tran_id: req.body.tran_id })
      res.status(400).redirect('http://localhost:3000')
    })
    app.post('/cancel', async (req, res) => {
      // console.log(req.body);
      const order = await paymentCollection.deleteOne({ tran_id: req.body.tran_id })
      res.status(200).redirect('http://localhost:3000/')
    })


    app.get('/orders/:tran_id', async (req, res) => {
      const id = req.params.tran_id;
      const order = await paymentCollection.findOne({ tran_id: id });
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
    // booking electrician 
    app.get("/mybookElectrician/:email", async (req, res) => {
      // const buyeremail=req.body.cartProducts.map((data)=>data.buyerEmail)
      console.log(req.params.email);
      const email = req.params.email;
      const result = await bookElectriciansCollection
        .find({ userEmail: email })
        .toArray();
        console.log(result)
      res.send(result);
    });

    app.delete("/manageAllOrderDelete/:id", async (req, res) => {
      const result = await paymentCollection.deleteOne({ _id: ObjectId(req.params.id) });
      res.send(result);
    });
    // delete electrician 
    app.delete("/electricianmanageAllOrderDelete/:id", async (req, res) => {
      const result = await bookElectriciansCollection.deleteOne({ _id: ObjectId(req.params.id) });
      res.send(result);
    });


    // user profile email 
    app.get('/updateUser/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.findOne(query)
      res.json(result)
    });



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


    // admin product collection gett 

    app.get("/adminsproducts", async (req, res) => {
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
        const allData = await cursor.skip(page * size).limit(size).toArray()
        res.json({
          allData, count
        });
      } else {
        const cursor = adminProductCollection.find({
          // status: "approved"
        });
        const count = await cursor.count()
        const allData = await cursor.skip(page * size).limit(size).toArray()

        res.json({
          allData, count
        });
      }

    });



    



    

    


    // bikash payment start 

    //sslcommerz init

    app.post('/init', async (req, res) => {
      // console.log(req.body)
      // const email = req.body.cartProducts.map((data) => data.buyerEmail)
      // const schedule = req.body.cartProducts.map((data) => data.schedule)
      // const adminemail = req.body.cartProducts.map((data) => data.adminEmail)
      // console.log(email)
      // console.log(schedule)
      const data = {
        // emails: email,
        // admindata: adminemail,
        total_amounts: 100,
        currency: "BDT",
        tran_id: uuidv4(),
        success_url: 'http://localhost:5000/success',
        fail_url: 'http://localhost:5000/fail',
        cancel_url: 'http://localhost:5000/cancel',
        ipn_url: 'http://localhost:5000/ipn',
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
        cus_state: req.body.cus_state,
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
      // const order = await doctorPaymentCollection.insertOne(data)
      console.log(data)
      const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
      sslcommer.init(data).then(data => {
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
        // console.log(data);
        // res.redirect(data.GatewayPageURL)
        if (data.GatewayPageURL) {
          res.json(data.GatewayPageURL)
        }
        else {
          return res.status(400).json({
            message: 'payment session failed'
          })
        }
      });
    })

    app.post('/success', async (req, res) => {
      // console.log(req.body);
      const order = await doctorPaymentCollection.updateOne({ tran_id: req.body.tran_id }, {
        $set: {
          val_id: req.body.val_id
        }

      })
      
      res.status(200).redirect(`http://localhost:3000/success/${req.body.tran_id}`)
    })
    app.post('/fail', async (req, res) => {
      // console.log(req.body);
      const order = await doctorPaymentCollection.deleteOne({ tran_id: req.body.tran_id })
      res.status(400).redirect(`http://localhost:3000/`)
    })
    app.post('/cancel', async (req, res) => {
      // console.log(req.body);
      const order = await doctorPaymentCollection.deleteOne({ tran_id: req.body.tran_id })
      res.status(200).redirect(`http://localhost:3000/`)
    })

    // payment validate check and status update for pading to confarm 
    app.post('/validate', async (req, res) => {
      console.log(req.body)
      const order = await doctorPaymentCollection.findOne({ tran_id: req.body.tran_id });
      console.log(order)
      if (order.val_id === req.body.val_id) {
        const update = await doctorPaymentCollection.updateOne({ tran_id: req.body.tran_id }, {
          $set: {
            paymentStatus: 'paid'
          }
        })
        res.send(update.modifiedCount > 0)
      }
      else {
        res.send('payment not confirmed. appointment discarded')
      }
    })

    // token start

    app.get("/inits", async (req, res) => {
      console.log(req.params.email)
      const store = doctorPaymentCollection.find({})
      const result = await store.toArray()

      res.send(result)

    })


    // token end 



    app.get('/orders/:tran_id', async (req, res) => {
      const id = req.params.tran_id;
      const order = await doctorPaymentCollection.findOne({ tran_id: id });
      console.log(order)
      res.json(order)
    })



    // bikash payment end 

// Initialize payment
app.post('/initPost', async(req, res) => {
  const data = {
    total_amount: req.body.total_amount,
    currency: 'BDT',
      tran_id:  uuidv4(),
      paymentStatus:'panding',
      success_url: 'http://localhost:5000/successdata',
      fail_url: 'http://localhost:5000/faildata',
      cancel_url: 'http://localhost:5000/canceldata',
      ipn_url: 'http://localhost:5000/ipn',
      shipping_method: 'Courier',
      product_name: req.body.product_name,
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: req.body.cus_name,
      cus_email: req.body.cus_email,
      date:req.body.date,
      time:req.body.time,
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
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

  const orders = await doctorPaymentCollection.insertOne(data)
  console.log(data)
  const sslcommer = new SSLCommerzPayment('ekris63f46e4b4aa67', 'ekris63f46e4b4aa67@ssl',false) //true for live default false for sandbox
  sslcommer.init(data).then(data => {
    // console.log(data)
    // res.redirect(data.GatewayPageURL)
    if(data.GatewayPageURL){
      res.json(data.GatewayPageURL)
    }
    else{
      return res.status(400).json({
        message:'payment session failed'
      })
    }
      //process the response that got from sslcommerz 
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
  });
});

app.post ('/successdata', async(req,res)=>{
  // console.log(req.body);
  const order = await doctorPaymentCollection.updateOne({tran_id:req.body.tran_id},{
    $set:{
      val_id:req.body.val_id
    }

  })
 
  res.status(200).redirect(`http://localhost:3000/successdata/${req.body.tran_id}`)
})
app.post ('/faildata', async(req,res)=>{
  // console.log(req.body);
const order=await doctorPaymentCollection.deleteOne({tran_id:req.body.tran_id})
  res.status(400).redirect(`http://localhost:3000/`)
})
app.post ('/canceldata', async(req,res)=>{
  // console.log(req.body);
  const order=await doctorPaymentCollection.deleteOne({tran_id:req.body.tran_id})
  res.status(200).redirect(`http://localhost:3000/`)
})

// payment validate check and status update for pading to confarm 
app.post('/validateData', async(req,res)=>{
  console.log(req.body)
  const order =await doctorPaymentCollection.findOne({tran_id:req.body.tran_id});
  console.log(order)
  if(order.val_id === req.body.val_id){
    const update = await doctorPaymentCollection.updateOne({tran_id:req.body.tran_id},{
      $set:{
        paymentStatus:'paid'
      }
    })
    res.send(update.modifiedCount>0)
  }
  else{
    res.send('payment not confirmed. appointment discarded')
  }
})

// token start

app.get("/initPost",async(req,res)=>{
  console.log(req.params.email)
  const store=doctorPaymentCollection.find({})
  const result=await store.toArray()
  // const result=await othersPaymentCollection.find(store).toArray()
  res.send(result)

})


// token end 



app.get('/ordersdata/:tran_id', async(req,res)=>{
  const id=req.params.tran_id;
  const order =await doctorPaymentCollection.findOne({tran_id:id});
  console.log(order)
  res.json(order)
})




  }

  finally {
    // await client.close();
  }
}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send("Black-Electrical");
});

app.listen(port, () => {
  console.log("runnning online on port", port);
});