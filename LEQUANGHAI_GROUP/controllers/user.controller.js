import User from '../models/user';

const UserController = {};

UserController.getAll = async (req, res, next) => {
    try {
        const users = await User.find({
            // $or: [
            //     {
            //         isDelete: false
            //     },
            //     {
            //         isDelete: null
            //     }
            // ]
        });
        return res.json({
            isSuccess: true,
            users
        });
    } catch (err) {
        return next(err);
    }
};

UserController.getOneUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        let user = await User.findOne({
            _id,
            // $of: [
            //     {
            //         isDelete: false
            //     },
            //     {
            //         isDelete: null
            //     }
            // ]
        });
        if (!user) {
            // Lỗi tự định nghĩa, phải dùng new Error.
            return next(new Error('User is not found'));
            // return res.status(400).json({
            //     isSuccess: false,
            //     message: 'User is not found'
            // });
        }
        return res.json({
            isSuccess: true,
            user
        });
    } catch(e) {
        // if next have param, it will be passed to error handler
        return next(e);
        // return res.status(400).json({
        //     isSuccess: false,
        //     message: e.message,
        //     error: e
        // });
    }
};

UserController.addUser = async (req, res, next) => {
    try {
        const { password, refNames, firstName, lastName, gender, email } = req.body;

        console.log(typeof gender);
        if (!password) {
            return res.status(400).json({
                isSuccess: false,
                error: {
                    message: 'password is required field'
                }
            });
        }
        const user = new User({
            password,
            refNames,
            firstName,
            lastName,
            gender,
            email
        });
        await user.save();
        return res.json({
            isSuccess: true,
            user
        });
        // const firstName = data.firstName;
        // const gender = data.gender;
        // const email = data.email;

    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        });
    }
};

UserController.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                isSuccess: false,
                message: 'Not found user'
            });
        }
        user.set(req.body);
        await user.save();
        return res.json({
            isSuccess: true,
            message: 'Update successfully'
        });
    } catch (e) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        });
    }
};

UserController.deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(400).json({
                isSuccess: false,
                message: 'User is not found'
            });
        }
        user.isDelete = true;
        await user.save();
        // User.deleteOne({
        //     _id
        // });
        return res.status(200).json({
            isSuccess: true,
            message: 'Deleted user'
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            isSuccess: false,
            error: e
        });
    }
};

export default UserController;
