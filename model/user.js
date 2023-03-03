const mongoose =require("mongoose")
const validator= require("validator")
const bcrypt=require("bcryptjs")

const userSchema= mongoose.Schema({
    email:{
        type:String,
        validator:[validator.isEmail,"provaid a valid email"],
        trim:true,
        lowercase:true,
        unique:true,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"password is    required"],
         validate:{
            validator:(value)=>
                validator.isStrongPassword(value,{
                    minLength:6,
                    lowercase:1,
                    Number:1,
                }),
                message:"password value is not strogn enough"
         }
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return value === this.password
            },
            message:"password don't match "
        }
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
      },
      
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
      },
      lastName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
      },
      contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"],
      },
  
      shippingAddress: String,
  
      imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
      status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
      },
      confirmationToken: String,
      confirmationTokenExpires: Date,
  
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
  
},{
    timestamps: true,
})


// hash Password 

userSchema.pre("save",function(next){
    const password = this.password;
    const hashPassword = bcrypt.hashSync(password)

    this.password =hashPassword;
    this.confirmPassword =undefined;
    next()
})

// compare password

userSchema.methods.comparePassword = function (password,hash){
    const isPasswordValid=bcrypt.compareSync(password,hash)
    return isPasswordValid;
}



const User = mongoose.model("User", userSchema);

module.exports = User;
