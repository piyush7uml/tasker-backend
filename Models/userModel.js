import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';



const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, `Firstname is required`]
    },
    lastname: {
        type: String,
        required: [true, `Lastname is required`]
    },
    email: {
        type: String,
        required: [true, `Email is required`],
        unique: true
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minlength: [4, `Password must be atleast 4 character`]
    }

}, { timestamps: true })


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)

})



const User = mongoose.model("User", userSchema)

export default User;