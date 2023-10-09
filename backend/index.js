const express=require('express');
const cors=require('cors')
require('./Db/config');
const products=require('./Db/Products')
const User=require('./Db/User')
const app=express();
const Jwt=require('jsonwebtoken')
 app.use(express.json())
 app.use(cors())
 const jwtkey='e-com'

app.post('/register',async(req,res)=>{
    const user=new User(req.body)
    let result= await user.save()
    result=result.toObject();
    delete result.password
    Jwt.sign({result},jwtkey,{expiresIn:'2h'},(err,token)=>{
        if(err){
            res.send({result:"something went wrong,please try after some time"})  
        }
        res.send({result,auth:token})
       })
})

app.post('/login',async(req,res)=>{
    let user=await User.findOne(req.body).select("-password")

    if(req.body.password && req.body.email){
        if(user){
           Jwt.sign({user},jwtkey,{expiresIn:'2h'},(err,token)=>{
            if(err){
                res.send({result:"something went wrong,please try after some time"})  
            }
            res.send({user,auth:token})
           })
            
        }else{
            res.send({result:"NO user found"})
        }
       
    }else{
        res.send({result:"NO user found"})

    }
    
})
app.post('/add-product',verifyToken,async(req,res)=>{
   let product=new products(req.body)
   let result=await product.save()
   res.send(result)

})

app.get('/product',verifyToken,async(req,res)=>{
    let product=await products.find()
    if(product.length>0){
        res.send(product)
    }else{
        res.send({result:"products not found"})
    }
})
app.delete('/product/:id',verifyToken,async(req,res)=>{
   
    let result=await products.deleteOne({_id:(req.params.id)})
    res.send(result)
})

app.get('/product/:id',verifyToken,async(req,res)=>{
    let result=await products.findOne({_id:(req.params.id)})

    if(result){
        res.send(result)
    }else{
       res.send({result:"record not found"})
    }
   
})

app.put('/product/:id',verifyToken,async(req,res)=>{
    let result=await products.updateOne(
        {
          _id:req.params.id  
        },
        {
            $set:req.body
            
        })
        res.send(result)

})

app.get('/search/:key',verifyToken,async(req,res)=>{
   let result=await products.find({
    "$or":[
        {name:{$regex:req.params.key}},
        {price:{$regex:req.params.key}},
        {category:{$regex:req.params.key}}
     
    ]
   })
   res.send(result)
})

function verifyToken(req,res,next){
    let token=req.headers['authorization']
    if(token){
        token=token.split(' ')[1]

        Jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){

                res.status(401).send({result:"please provide valid token"})
            }else{
                next()
            }

        })
       
       

    }else{
       res.status(403).send({result:"please add token with header "})
    }
    console.log("called api",token)
  
}

app.listen(5000)
