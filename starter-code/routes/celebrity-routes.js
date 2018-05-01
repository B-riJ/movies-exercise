// copied from index.js
const express = require('express');
const celebrityRouter  = express.Router();
const Celebrity = require("../models/celebrity-model");

/* GET home page. */
celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find()
  .then( responseFromDB => {
    console.log(responseFromDB)
// console.log(responseFromDB);
//celebrities is the object
    res.render('celebrities/list-view', { celebrities: responseFromDB});
  })
  .catch( error => {
    console.log(" Error while displaying:", error );
  })

});

celebrityRouter.get('/add-new', (req, res, next) =>{

  res.render("celebrities/new-view")
})

// create post route
celebrityRouter.post('/create', (req, res, next) =>{
  const celebName = req.body.theName; //theName is grabbed directly from form in new-view.hbs, name ="theName"
  // console.log(celebName)

  const celebOcc = req.body.theOccupation;
  const celebCP = req.body.theCatchPhrase;
  const newCelebrity = new Celebrity ({
    name:celebName,
    occupation: celebOcc,
    catch_phrase: celebCP

  })
  newCelebrity.save()
  .then(() =>{
    res.redirect('/celebrities');
  })
  .catch(err => {
    console.log("error", err)
  })
})

// Edit- get.route
celebrityRouter.get('/edit/:id', (req, res, next) => {
const celebId = req.params.id;
// console.log(celebId)
Celebrity.findById(celebId)
.then(celebrityFromDB => {
  res.render("celebrities/edit-view",{ celebrity: celebrityFromDB })
  })

})

//edit - route 
celebrityRouter.post('/update/:id', (req, res, next) => {
  const celebId = req.params.id;
  const editedName = req.body.editedName;
  const editedOcc = req.body.editedOccupation;
  const editedCP = req.body.editedCatchPhrase;

  // console.log("editedName: ", editedName)
  Celebrity.findByIdAndUpdate(celebId, {
    name: editedName,
    occupation: editedOcc,
    catch_phrase: editedCP
  })
  .then(() => {
  res.redirect(`/celebrities/${celebId}`) //back ticks added to edited celeb route
  })
.catch( error => {
  console.log("Error while updating:". error)
  })

})

// Delete

celebrityRouter.post ('/:theId/delete', (req, res, next) => {
  const celebId = req.params.theId;
  Celebrity.findByIdAndRemove(celebId)
  .then(() => {
    res.redirect("/celebrities");
  })
  .catch( error => {
    console.log("error while deleting: ", error)
  })
})


celebrityRouter.get('/:theID', (req, res, next) => {
  const celebId = req.params.theID;
  // params is looking for whats what after celebrities/

  Celebrity.findById(celebId)
  .then(oneCelebrityFromDb => {
    // console.log(oneCelebrityFromDb)
    res.render('celebrities/details-view',{ celebrity: oneCelebrityFromDb});
  } )
.catch( error =>{
  console.log("error while getting detaisl: ", error)
  })

})

module.exports = celebrityRouter;
