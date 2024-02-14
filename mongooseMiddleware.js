const mongoose=require('mongoose');
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

  const bcrypt = require('bcrypt'); 
  
  const userSchema=new mongoose.Schema({
    //defining the schema for user
    userName:String,
    email:String,
    password:String
  });
 // Define a pre-save middleware to hash the password before saving
 userSchema.pre('save',async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hash = await bcrypt.hash(this.password, salt); // Hash the password with the salt
        this.password = hash; // Set the hashed password
        next();

        
    } catch(err){
        console.log('Error occured',err)
        next(err)
    }
 });


 // Define a method to compare passwords
 userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Compare the candidate password with the stored hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        console.log('Error occurred', err);
        throw err;
    }
}

  const User=mongoose.model('User',userSchema);

  const newUser=new User({
    userName:'johnDoe',
    email: 'john@example.com',
    password:'zxcvbnm'
  })
  newUser.save()
  .then((user)=>{
    console.log('User svaed sucessfully',user)
  })
  .catch(error=>{
    console.log('error saving user', error)
  });