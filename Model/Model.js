const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 2;

const PasswordSchema = new mongoose.Schema(
    {
        password: String,
        text: String,
        status:{type: Boolean, default: false},
    })
    PasswordSchema.methods.checkPassword = async function (plainPassword) {
        // console.log(this.password, "this password");
        const matched = await bcrypt.compare(plainPassword, this.password); // this method takes hash and the plain password to match according to the hash
        return matched;
        // decrypt
      };
      PasswordSchema.pre("save", async function (next) {
        // console.log("this is params", params);
        this.password = await bcrypt.hash(this.password, saltRounds);
        // next();
      });
      
const PasswordModel = mongoose.model("PasswordSchema", PasswordSchema);
module.exports = PasswordModel;