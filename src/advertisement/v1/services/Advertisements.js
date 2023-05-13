const Advertisement = require("../models/Advertisement");

const list = (payload) =>{
    if(payload){
        return Advertisement.findById(payload)
    }
    else{
        return Advertisement.find({});
    }
}

const create = (payload) =>{
    const ad = new Advertisement(payload);
    return ad.save();
}
const update = (payload) =>{
    Advertisement.findByIdAndUpdate(payload._id,payload);
}
const remove = (payload) =>{
    Advertisement.findByIdAndRemove(payload._id);
}



module.exports = {
    list,
    create,
    update,
    remove
} 