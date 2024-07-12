const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");
const { verify, verifyAdmin } = require("../auth");

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", movieController.getAllMovies);
router.get("/getMovie/:id", verify, movieController.getMovieById);
router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);
router.post("/addComment/:id", verify, movieController.addMovieComments);
router.get("/getComments/:id", verify, movieController.getMovieComments);

module.exports = router;