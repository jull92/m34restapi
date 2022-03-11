const Movie = require("./movieModel");

// req and res are standard in express
exports.addMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(200).send({movie: newMovie});
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};

exports.listMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).send({allMovie: movies});
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updateMovie = await Movie.updateOne(
            {[req.body.filterkey]: req.body.filterVal},
            {[req.body.updateKey]: req.body.updateVal}
        );
        if (updateMovie.modifiedCount > 0) {
            res.status(200).send({msg: "Succesfully updated"});
        } else{
            throw new Error("Did not update")
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const deleteMovie = await Movie.deleteOne({
            [req.params.filterKey]: req.params.filterVal,
        });
        if (deleteMovie.deletedCount > 0){
        res.status(200).send({allMovie: movies});
        } else {
            throw new Error("Did not delete")
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};