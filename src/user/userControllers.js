const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("./userModel");

exports.addUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = await jwt.sign({_id: newUser._id}, process.env.SECRET);
        res.status(200).send({user: newUser.username, token});
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    };
};

exports.login = async (req, res) => {
    try {
        res.status(200).send({user: req.user.username});
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    };
};

exports.updatePassword = async (res, req) => {
    try {
        const updateUser = await User.updateOne (
            {username: req.user.username}, 
            {password: req.body.password});
        if (updateUser.modifiedCount > 0) {
            res.status(200).send({msg: "Succesfully udpated password"});
        } else {
            throw new Error("Did not update");
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    };
};

// my aprroach
// exports.deleteUser = async (res, req) => {
//     try {
//         const deleteUser = await User.deleteOne (
//             {username: req.user.username});
//         if (deleteUser.modifiedCount > 0) {
//             res.status(200).send({msg: "Succesfully deleted user"});
//         } else {
//             throw new Error("Did not delete");
//         };
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({err: error.message});
//     }
// };

// Andys approach
exports.deleteUser = async (res, req) => {
    try {
        let result;
        if (req.user.username === req.params.username) {
            result = await User.deleteOne({username: req.user.username})
            res.status(200).send({msg: "Succesfully deleted user"});
            if (result && result.deletedCount > 0) {
                res.status(200).send({msg: "Succesfully deleted user"});
            } else {
                throw new Error("Did not delete");
            };
        } else {
            throw new Error("Did not delete");
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};
