const mongoClient= require("mongodb").MongoClient
const state={
    db:null
}
module.exports.connect=(done)=>{
    const url= process.env.DATABASE_URI || "mongodb://localhost:27017"
    const dbname="shop"

    mongoClient.connect(url,{useUnifiedTopology: true,
        useNewUrlParser: true,},(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        done()
    })

    
}

module.exports.get=function(){
    return state.db
}