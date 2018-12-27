import Group from '../models/group';

const GroupController = {};

GroupController.getAll = async (req, res, next) => {
    try {
        let groups = await Group.find({
        });
        return res.json({
            isSuccess: true,
            group: groups
        });
    } catch (err) {
        return next(err);
    }
};

GroupController.getOneGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        let group = await Group.findOne({
            _id,
          
        });
        if (!group) {
        
            return next(new Error('User is not found'));
           
        }
        return res.json({
            isSuccess: true,
            group
        });
    } catch(e) {
        // if next have param, it will be passed to error handler
        return next(e);
    }
};

GroupController.addGroup = async (req, res, next) => {
    try {
        const { name, lastMessage, author, members } = req.body;

        if (!name) {
            return next(new Error('User is not found'));
        }
        const group = new Group({
            name,
            lastMessage,
            author,
            members
        });
        await group.save();
        return res.json({
            isSuccess: true,
            group
        });
      

    } catch (err) {
        return next(e);
    }
};

GroupController.updateGroup = async (req, res, next) => {
    try {
        const id = req.params.id;
        const group = await Group.findById(id);
        if (!group) {
            return next(new Error('User is not found'));
        }
        group.set(req.body);
        await group.save();
        return res.json({
            isSuccess: true,
            message: 'Update successfully'
        });
    } catch (e) {
        return next(e);
    }
};

GroupController.deleteGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const group = await Group.findById(_id);
        if (!group) {
            return res.status(400).json({
                isSuccess: false,
                message: 'User is not found'
            });
        }
        group.deletedAt = new Date();
        await group.save();
       
        return res.status(200).json({
            isSuccess: true,
            message: 'Deleted user'
        });
    } catch (e) {
       
        return next(e);
    }
};

export default GroupController;
