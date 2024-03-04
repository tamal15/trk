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










// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ht74mzb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});








async function run() {

  try {
    await client.connect();
    console.log("connected to database");
    const database = client.db('Turki');

    const userCollection = database.collection('users');
    const bannerCollection = database.collection('Banner');
    const associateCollection = database.collection('Associate');
    const chooseCollection = database.collection('Choose');
    const aboutCollection = database.collection('About');
    const teamCollection = database.collection('Team');
    const contactCollection = database.collection('Contact');
    const recruitmentCollection = database.collection('Recruitment');
    const blogCollection = database.collection('Blog');
    const ticketCollection = database.collection('ticket');
    const tourCollection = database.collection('tour');
    const galleryCollection = database.collection('gallery');
    const demandCollection = database.collection('demandletter');
    const countryCollection = database.collection('addcountry');
    const trainingCollection = database.collection('addTraining');
    const airlinesCollection = database.collection('addAirlines');
    const tradeCollection = database.collection('addTrade');
    const certificatedIataCollection = database.collection('certificatedIata');
    const certificatedatabCollection = database.collection('certificated_atab');
    const userTicketCollection = database.collection('userDataTicket');
    const circularCollection = database.collection('addCircular');
    
    





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

    // post banner 
    app.post('/addBanner', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await bannerCollection.insertOne(user);
      res.json(result)
    });
    // post associate
    app.post('/addAssociate', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await associateCollection.insertOne(user);
      res.json(result)
    });
    // post choose
    app.post('/addChoose', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await chooseCollection.insertOne(user);
      res.json(result)
    });
    // post aboutus
    app.post('/addAbout', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await aboutCollection.insertOne(user);
      res.json(result)
    });
    // post aboutus
    app.post('/addTeam', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await teamCollection.insertOne(user);
      res.json(result)
    });
    // post aboutus
    app.post('/addContact', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await contactCollection.insertOne(user);
      res.json(result)
    });
    // post recruitment
    app.post('/addRecruitment', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await recruitmentCollection.insertOne(user);
      res.json(result)
    });
    // post blog
    app.post('/addBlog', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await blogCollection.insertOne(user);
      res.json(result)
    });
    // post blog
    app.post('/addTicket', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await ticketCollection.insertOne(user);
      res.json(result)
    });
    // post tour
    app.post('/addTour', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await tourCollection.insertOne(user);
      res.json(result)
    });
    // post gallery
    app.post('/addGallery', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await galleryCollection.insertOne(user);
      res.json(result)
    });
    // post gdemand
    app.post('/addDemand', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await demandCollection.insertOne(user);
      res.json(result)
    });
    // post country
    app.post('/addCountrys', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await countryCollection.insertOne(user);
      res.json(result)
    });
    // post country
    app.post('/addTraining', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await trainingCollection.insertOne(user);
      res.json(result)
    });
    // post air lines
    app.post('/addAirlines', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await airlinesCollection.insertOne(user);
      res.json(result)
    });
    // post add trade
    app.post('/addtrade', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await tradeCollection.insertOne(user);
      res.json(result)
    });
    // post add trade
    app.post('/addcertificatedIata', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await certificatedIataCollection.insertOne(user);
      res.json(result)
    });
    // post add atab certificated
    app.post('/addcertificatedIatb', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await certificatedatabCollection.insertOne(user);
      res.json(result)
    });
    // post add atab certificated
    app.post('/postTicket', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await userTicketCollection.insertOne(user);
      res.json(result)
    });
    app.post('/postCircular', async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await circularCollection.insertOne(user);
      res.json(result)
    });

    
   
    // get banner
app.get('/getbanner', async(req,res)=>{
  const result=await bannerCollection.find({}).toArray()
  res.json(result)
});
    // get choose
app.get('/getChoose', async(req,res)=>{
  const result=await chooseCollection.find({}).toArray()
  res.json(result)
});
    // get associate
app.get('/getAssociate', async(req,res)=>{
  const result=await associateCollection.find({}).toArray()
  res.json(result)
});
    // get about
app.get('/getAbout', async(req,res)=>{
  const result=await aboutCollection.find({}).toArray()
  res.json(result)
});
    // get about
app.get('/getTeam', async(req,res)=>{
  const result=await teamCollection.find({}).toArray()
  res.json(result)
});
    // get contact
app.get('/getContact', async(req,res)=>{
  const result=await contactCollection.find({}).toArray()
  res.json(result)
});
    // get contact
app.get('/getRecruitment', async(req,res)=>{
  const result=await recruitmentCollection.find({}).toArray()
  res.json(result)
});
    // get cblog
app.get('/getBlog', async(req,res)=>{
  const result=await blogCollection.find({}).toArray()
  res.json(result)
});
    // get ticket
app.get('/getTicket', async(req,res)=>{
  const result=await ticketCollection.find({}).toArray()
  res.json(result)
});
    // get ticket
app.get('/getTour', async(req,res)=>{
  const result=await tourCollection.find({}).toArray()
  res.json(result)
});
    // get gallery
app.get('/getGallery', async(req,res)=>{
  const result=await galleryCollection.find({}).toArray()
  res.json(result)
});
    // get demanndletter
app.get('/getDemand', async(req,res)=>{
  const result=await demandCollection.find({}).toArray()
  res.json(result)
});
    // get country
app.get('/getCountry', async(req,res)=>{
  const result=await countryCollection.find({}).toArray()
  res.json(result)
});
    // get country
app.get('/getTraining', async(req,res)=>{
  const result=await trainingCollection.find({}).toArray()
  res.json(result)
});
    // get air
app.get('/getAir', async(req,res)=>{
  const result=await airlinesCollection.find({}).toArray()
  res.json(result)
});
    // get trade
app.get('/getTrade', async(req,res)=>{
  const result=await tradeCollection.find({}).toArray()
  res.json(result)
});
    // get certificated iata
app.get('/getcertificatediata', async(req,res)=>{
  const result=await certificatedIataCollection.find({}).toArray()
  res.json(result)
});
    // get certificated atab
app.get('/getcertificatedatab', async(req,res)=>{
  const result=await certificatedatabCollection.find({}).toArray()
  res.json(result)
});
    // get certificated atab
app.get('/getUserticket', async(req,res)=>{
  const result=await userTicketCollection.find({}).toArray()
  res.json(result)
});
    // get certificated atab
app.get('/getcircular', async(req,res)=>{
  const result=await circularCollection.find({}).toArray()
  res.json(result)
});

// delete 
app.delete('/banners/:id',async(req,res)=>{
  const result= await bannerCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete associate
app.delete('/associate/:id',async(req,res)=>{
  const result= await associateCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete associate
app.delete('/choose/:id',async(req,res)=>{
  const result= await chooseCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete about
app.delete('/abouts/:id',async(req,res)=>{
  const result= await aboutCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete about
app.delete('/teamdelete/:id',async(req,res)=>{
  const result= await teamCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete contact
app.delete('/contactdelete/:id',async(req,res)=>{
  const result= await contactCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete recruitment
app.delete('/recruitmentdelete/:id',async(req,res)=>{
  const result= await recruitmentCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete blog
app.delete('/blogdelete/:id',async(req,res)=>{
  const result= await blogCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete gallery
app.delete('/gallerydelete/:id',async(req,res)=>{
  const result= await galleryCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete ticket
app.delete('/ticketdelete/:id',async(req,res)=>{
  const result= await ticketCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete tour
app.delete('/tourdelete/:id',async(req,res)=>{
  const result= await tourCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete demand letter
app.delete('/demanddelete/:id',async(req,res)=>{
  const result= await demandCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete 
app.delete('/countrydelete/:id',async(req,res)=>{
  const result= await countryCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete 
app.delete('/airdelete/:id',async(req,res)=>{
  const result= await airlinesCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete 
app.delete('/tradedelete/:id',async(req,res)=>{
  const result= await tradeCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete 
app.delete('/certificatediatadelete/:id',async(req,res)=>{
  const result= await certificatedIataCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete 
app.delete('/certificatedatabdelete/:id',async(req,res)=>{
  const result= await certificatedatabCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete 
app.delete('/deleteuserdataticket/:id',async(req,res)=>{
  const result= await userTicketCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});
// delete 
app.delete('/deletecircular/:id',async(req,res)=>{
  const result= await circularCollection.deleteOne({_id:ObjectId(req.params.id)});
  res.json(result)
});

// update 
app.get('/editbanner/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await bannerCollection.findOne(query)
  res.json(user)
})
// update associate
app.get('/editsAssociate/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await associateCollection.findOne(query)
  res.json(user)
})
// update associate
app.get('/editChoose/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await chooseCollection.findOne(query)
  res.json(user)
})
// update about
app.get('/editabout/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await aboutCollection.findOne(query)
  res.json(user)
})
// update team
app.get('/editTeam/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await teamCollection.findOne(query)
  res.json(user)
})
// update contact
app.get('/editContact/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await contactCollection.findOne(query)
  res.json(user)
})
// update blog
app.get('/editBlog/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await blogCollection.findOne(query)
  res.json(user)
})
// update gallery
app.get('/editGallery/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await galleryCollection.findOne(query)
  res.json(user)
})
// update ticket
app.get('/editTicket/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await ticketCollection.findOne(query)
  res.json(user)
})
// update ticket
app.get('/editair/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await airlinesCollection.findOne(query)
  res.json(user)
})
// update trade
app.get('/editTrade/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await tradeCollection.findOne(query)
  res.json(user)
})
// update trade
app.get('/editCertificatediata/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await certificatedIataCollection.findOne(query)
  res.json(user)
})
// update trade
app.get('/editCertificatedatab/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const user=await certificatedatabCollection.findOne(query)
  res.json(user)
})

app.put("/bannerupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
          tittle1:updateUser.tittle1,
          tittle2:updateUser.tittle2,
          tittle3:updateUser.tittle3,
          bottomtittle1:updateUser.bottomtittle1,
          bottomtittle2:updateUser.bottomtittle2,
          bottomtittle3:updateUser.bottomtittle3,
      }
  }
  const result=await bannerCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})

// update database the associateCollection 
app.put("/associateupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{

        tittle1: updateUser.tittle1,
        tittle2: updateUser.tittle2,
        tittle3: updateUser.tittle3,
        tittle4: updateUser.tittle4,
        tittle5: updateUser.tittle5,
        description: updateUser.description,
        details1: updateUser.details1,
        details2: updateUser.details2,
        details3: updateUser.details3,
        name: updateUser.name,
        designation: updateUser.designation,

      }
  }
  const result=await associateCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/chooseupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{

        tittle: updateUser.tittle,
        subtittle: updateUser.subtittle,
        subDetails: updateUser.subDetails

      }
  }
  const result=await chooseCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})

app.put("/aboutupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        tittle: updateUser.tittle,
        name: updateUser.name,
        description: updateUser.description,
        desginaton: updateUser.desginaton,

      }
  }
  const result=await aboutCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})

app.put("/teamupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        name: updateUser.name,
        designation: updateUser.designation,
        facebboklink: updateUser.facebboklink,
        twitterlink: updateUser.twitterlink,
        linkedinLink: updateUser.linkedinLink

      }
  }
  const result=await teamCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/contactupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        tittle: updateUser.tittle,
        subtittle1: updateUser.subtittle1,
        description1: updateUser.description1,
        subtittle2: updateUser.subtittle2,
        description2: updateUser.description2,
        locationTittle: updateUser.locationTittle,
        address: updateUser.address,
        mailTittle: updateUser.mailTittle,
        mail: updateUser.mail,
        callTittle: updateUser.callTittle,
        number: updateUser.number,
        openingTittle: updateUser.openingTittle,
        openingStart: updateUser.openingStart,
        openingClosed: updateUser.openingClosed,
      }
  }
  const result=await contactCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/blogupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        tiittle: updateUser.tiittle,
        details: updateUser.details,
        date: updateUser.date
      }
  }
  const result=await blogCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/galleryupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        tittle1: updateUser.tittle1,
        tittle2: updateUser.tittle2,
        tittle3: updateUser.tittle3,
        tittle4: updateUser.tittle4,
        tittle5: updateUser.tittle5,
        details: updateUser.details,
        tittle6: updateUser.tittle6,
        tittle7: updateUser.tittle7,
        details2: updateUser.details2      }
  }
  const result=await galleryCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/ticketupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        description: updateUser.description,
        tittle: updateUser.tittle,
        details: updateUser.details,   }
  }
  const result=await ticketCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/airupdate/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        description: updateUser.description,
        name: updateUser.name,
        details: updateUser.details,    }
  }
  const result=await airlinesCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/trade/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        tittle1: updateUser.tittle1,
        tittle2: updateUser.tittle2,
        description1: updateUser.description1,
        description2: updateUser.description2,    }
  }
  const result=await tradeCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/certificatediata/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        tittle1: updateUser.tittle1,
        tittle2: updateUser.tittle2,
        description1: updateUser.description1,
        description2: updateUser.description2,    }
  }
  const result=await certificatedIataCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})
app.put("/certificatedatabs/:id", async (req, res) => {

  const id=req.params.id;
  const updateUser=req.body
  console.log(updateUser)
  const filter={_id: ObjectId(id)};
  const options={upsert:true};

  const updateDoc={
      $set:{
        tittle1: updateUser.tittle1,
        tittle2: updateUser.tittle2,
        description1: updateUser.description1,
        description2: updateUser.description2,    }
  }
  const result=await certificatedatabCollection.updateOne(filter,updateDoc,options);
  console.log('uodateinf',id);
  res.json(result)

})


// get 
app.get("/getDemands", async (req, res) => {
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
      const cursor = demandCollection.find(query, status = "approved");
      const count = await cursor.count()
      const alldata = await cursor.skip(page * size).limit(size).toArray()
      res.json({
          alldata, count
      });
  } else {
      const cursor = demandCollection.find({
          // status: "approved"
      });
      const count = await cursor.count()
      const alldata = await cursor.skip(page * size).limit(size).toArray()

      res.json({
        alldata, count
      });
  }

});











  }

  finally {
    // await client.close();
  }
}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send("Turki-bd");
});

app.listen(port, () => {
  console.log("runnning online on port", port);
});