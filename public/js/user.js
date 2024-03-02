import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
});

const User = mongoose.model('User', userSchema);

export default User;
