const daoReview = require("../daos/reviews");
<<<<<<< Updated upstream
const modelPlace = require('../models/places')
const modelDish = require('../models/dishes')
=======
const modelPlace = require("../models/places");
const modelDish = require("../models/dishes");
const daoPlace = require("../daos/places");
const daoDish = require("../daos/dishes");
>>>>>>> Stashed changes
const userSessions = require("../daos/userSessions");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getReview,
  fetchReviewsByUser,
  findAllByDishId,
  createReview,
  updateReview
};

async function getReview(reviewID) {
  try {
    const reviewObjectId = new ObjectId(reviewID); // Convert userID to ObjectId

    let reviewDocsByID = await daoReview.findOne({ _id: reviewObjectId });
console.log(`reviewDocsByID`, reviewDocsByID)

    return { success: true, data: reviewDocsByID };
  } catch (error) {
    console.error("Error fetching reviews by ID:", error);
    return { success: false, error: error.message }; // Return error object
  }
}

async function fetchReviewsByUser(userID) {
  try {
    const userObjectId = new ObjectId(userID); // Convert userID to ObjectId
    // console.log(`userID`, userID);
    // console.log(`userObjectId`, userObjectId);

    let reviewDocsByUser = await daoReview.find({ user_id: userObjectId });
console.log(`reviewDocsByUser`, reviewDocsByUser)

    return { success: true, data: reviewDocsByUser };
  } catch (error) {
    console.error("Error fetching reviews by user:", error);
    return { success: false, error: error.message }; // Return error object
  }
}

async function findAllByDishId(dishId) {
  return await daoReview.find({ dish_id: dishId });
}

<<<<<<< Updated upstream
=======
async function createDishReview(dish, dishId, userId) {
  return await daoReview.create({
    name: dish.dish,
    comment: dish.comments,
    price: dish.price,
    rating: dish.rating,
    dish_id: dishId,
    user_id: userId,
  });
}
>>>>>>> Stashed changes

// there will be a few steps required to create a review
async function createReview(body) {
  try {
    // destructure the inputs
    const { token, place, cuisine, dishes } = body;

    console.log("dishes", dishes);
    // find user who is adding the review
    let userSessionDoc = await userSessions.findOne({ token });
    console.log(userSessionDoc.user_id);

    // check if theres a place, if not create it
<<<<<<< Updated upstream
    let placeDoc = await modelPlace.findOrCreatePlace(place, cuisine); // returns obj 
    console.log('placeDoc', placeDoc)
    console.log('placeDocId', placeDoc._id)

=======
    let placeDoc = await modelPlace.findOrCreatePlace(place, cuisine); // returns obj

    console.log("placeDoc", placeDoc);
    console.log("placeDocId", placeDoc._id);
>>>>>>> Stashed changes
    // check if theres a dish, if not create it
    // update the dishes with the latest price
    let dishDocs = await Promise.all(
      dishes.map((dish) =>
        modelDish.findOrCreateDish(dish.name, placeDoc._id, dish.price),
      ),
    ); // returns arr

    console.log(dishDocs);

    // create the review
    let reviewDocs = await Promise.all(
      dishes.map(
        (
          dish,
          index, // returns arr
        ) =>
          createDishReview(dish, dishDocs[index]._id, userSessionDoc.user_id),
      ),
    );

    // update the ratings
    let updatedDishDocs = await Promise.all(
      dishDocs.map((dishDoc) => modelDish.updateAvgRating(dishDoc._id)),
    );

    // merge responses
    const data = { placeDoc, dishDocs, updatedDishDocs, reviewDocs };
    console.log(data);
    return { success: true, data };
  } catch (error) {
    console.error("Error in createReview:", error);
    throw { success: false, error };
  }
}
<<<<<<< Updated upstream

async function updateReview(body) {
  try{
      // destructure the inputs
      const { token, dish } = body;
    
      console.log('dish', dish)
      // find user who is adding the review
      let userSessionDoc = await userSessions.findOne({token})
      console.log(`userSession userSessionDoc.user_id`, userSessionDoc.user_id)

      //find dish ID from dish name - for first form only
      let dishID = await modelDish.getDishID(dish.name)
      console.log(`updateReview dish.name`, dish.name )
      console.log(`updateReview dishID`, dishID)

      //find placeID 
      let placeID = await modelDish.getDish(dishID)

    const dishIDObjectId = new ObjectId(dishID); // Convert dishID to ObjectId
    const userObjectId = new ObjectId(userSessionDoc.user_id); // Convert userID to ObjectId

    //find and update doc in reviews collection that matches FIRST makan form
    let updatedReview = await daoReview.updateOne({ dish_id: dishIDObjectId, user_id: userObjectId}, dish);
console.log(`updatedReview`, updatedReview)

   // check if theres a dish, if not create it
    // update the dishes with the latest price
    let dishDocs = await modelDish.findOrCreateDish(dish.name, placeID, dish.price)
 // returns arr
    console.log(`dishDocs in review model`, dishDocs)

    // update the ratings
    let updatedDishDocs = await modelDish.updateAvgRating(dishDoc._id)

    const data = {updatedReview, dishDocs, updatedDishDocs}
    console.log(data)
    return {success : true, data}
  } catch (error) {
    console.error('Error in createReview:', error);
    throw {success : false, error};
  }
}

async function createDishReview(dish, dishId, userId) {
  return await daoReview.create({
    name: dish.dish,
    comment: dish.comments,
    price: dish.price,
    rating: dish.rating,
    dish_id: dishId,
    user_id: userId
  });
}

=======
>>>>>>> Stashed changes
