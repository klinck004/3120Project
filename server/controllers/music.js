var express = require('express');
var router = express.Router();
let Music = require('../models/music');
console.log("Music DB controller loaded!"); /* for dev peace of mind */

// Read list
module.exports.DisplayMusiclist = async (req,res,next)=>{ 
    try{
       const MusicList = await Music.find(); 
       res.render('music/list', {
          title: 'Music List', 
          MusicList: MusicList
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('music/list', {
          error: 'Error on server'
       });
    }
 };
//add a new music
 module.exports.Addmusic = async (req,res,next)=>{
    try{
        res.render('music/add',
        {
            title:'Add new entry'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('music/list',
        {
            error: 'something went wrong'
        });
    }
};
//process the new additions
module.exports.Processmusic = async (req,res,next)=>{
    try{
        let newMusic = Music({
            "title":req.body.title,
            "studio": req.body.studio,
            "year": req.body.year,
            "length": req.body.length
        });
        music.create(newmusic).then(() =>{
            res.redirect('/music')
        })
    }
    catch(error){
        console.error(err);
        res.render('music/list',
        {
            error: 'Error on the server'
        });
    }
};
//edit an existing entry
module.exports.Editmusic = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const musicToEdit = await Music.findById(id);
    res.render('music/edit',
    {
        title:'Edit an existing',
        Music:musicToEdit
    })
}
catch(error){
    console.error(err);
    res.render('music/list',
    {
        error: 'something went wrong'
    });
}
}
//process an existing entry
module.exports.ProcessEditmusic = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedMusic = Music({
            "_id":id,
            "title":req.body.title,
            "studio": req.body.studio,
            "year": req.body.year,
            "length": req.body.length
        });
        Music.findByIdAndUpdate(id,updatedmusic).then(()=>{
            res.redirect('/music')
        });
    }
    catch(error){
        console.error(err);
        res.render('music/list',
        {
            error: 'Error on the server'
        });
    }
}
//delete an entry
module.exports.Deletemusic = (req,res,next)=>{
    try{
        let id = req.params.id;
        Music.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/music')
        })
    }
    catch(error){
        console.error(err);
        res.render('music/list',
        {
            error: 'Something went wrong'
        });
    }
}