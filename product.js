const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("Error occured");
    console.log(err);
  });
  const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:20
    },
    price:{
        type:Number,
        price:true,
        min:0
    },
    onSale:{
        type:Boolean,
        default:false
    },
    categories:[String],
    qty:{
        online:{
            type:Number,
            default:0
        },
        inStore:{
            type:Number,
            default:0
        },
        size:{
            type:String,
            enum:['S','M','L']
        }
    }

  });

// defining instance method(
// In Mongoose, you can define instance methods on your schema to add custom functionality to your model instances. Instance methods are functions that can be called on individual documents (instances) of your model.)
// productSchema.methods.greet=function(){
//     console.log('Greeting')
//     console.log(`- from${this.name}`)
// }

productSchema.methods.toggleOnSale=function(){
   this.onSale= !this.onSale;
    return this.save();

}

productSchema.methods.addCategory=function(newCat){
  this.categories.push(newCat);
  return this.save()
}

  const Product=mongoose.model('Product',productSchema)

//static model method(thse static model refer to model class itself .it does not refer to individual instance)
productSchema.statics.fireSale=function(){
    return this.updateMany({},{onSale:true,price:0})
}
  const findProduct= async()=>{
   try{
    const foundProduct=await Product.findOne({name:'Mountain Bike'});
    
     if(foundProduct){
        console.log(foundProduct)
        await  foundProduct.toggleOnSale();
        console.log(foundProduct);
        await foundProduct.addCategory('Outdoors')
        console.log(foundProduct)

     } else{
        console.log('Product not found');
     }
   }catch (err){
    console.error("Error in finding product",err)

   }
   
    
  }
  findProduct();
  
  Product.fireSale().then((res)=>{
    console.log(res)
  })

  const bike=new Product({name:"Mountain Bike", price:5000, categories:['cycling','adventure'], size:'S'})
  bike.save()
  .then(data=>{
    console.log("It worked",data)
  })
  .catch(err=>{
    console.log("it failed",err)
  })