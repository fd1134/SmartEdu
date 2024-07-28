const express=require("express");


const app=express();


app.get("/",(req,res)=>{
    console.log("aaaaaaaazzzz");
    res.status(200).send("İndex Sayfası");
});

const port=3000;

app.listen(port,()=>{

    console.log(`App Started on port ${port} `);
});