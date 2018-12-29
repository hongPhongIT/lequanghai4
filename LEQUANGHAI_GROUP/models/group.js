import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// dùng kiểu const k dùng var nữa a nha
var ObjectId = mongoose.Schema.Types.ObjectId;
let groupSchema = new Schema({
    name: {
    	type: String,
    	required: [ true, 'Name is required field!'],
    	maxlength: [ 255, 'Name is too long!' ]
    },

    lastMessage: {
        type: ObjectId,
    },
// members là một mảng em nghĩ a nên viết kiểu này members: [{ type: ObjectId }]
    members: {
        type: [ObjectId],
    },
    author: {
    	type:  ObjectId,
    },
// chỗ này em nghĩ a k nên để null mà nên để default: ''
    deletedAt: {
        type: Date,
        default: null
    }
    // deletedAt: Date
});

// Phần này em k biết anh dùng nó làm gì? phía trên mình xử lí rồi mà
groupSchema.pre('find', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            deletedAt: null,
        }
    ]
});

groupSchema.pre('findOne', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            deletedAt: null,
        }
    ]
});

groupSchema.post('findOne', function(doc) {
	// doc.version = 1;
  console.log('post find is executing...');
});
/////////***********************************//////

// groupSchema.pre('remove', function (next) {

//     const currentDate = new Date();
//     group.deletedAt= currentDate;
//     next();
//  });



// Or, in Node.js >= 7.6.0:
// schema.pre('save', async function() {
//   await doStuff();
//   await doMoreStuff();
// });
// chỗ này 'groups' anh nhé
let Group = mongoose.model('Group', groupSchema);

export default Group;
