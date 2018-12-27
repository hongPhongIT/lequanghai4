import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
	gender: Boolean,
    firstName: {
    	type: String,
    	required: [ true, 'firstName is required field!'],
    	maxlength: [ 255, 'firstName is too long!' ]
    },
    lastName: {
    	type: String,
    	required: [ true, 'lastName is required field!'],
    	maxlength: [ 255, 'lastName is too long!' ],
    	trim: true,
    	uppercase: true,
    },
    email: {
    	type: String,
    
    },
    password: {
    	type: String,
    	required: [ true, 'password is required field!'],
    	maxlength: [ 20, 'password is too long!' ]
    },
    refNames: {
    	type: [String],
    	
    },
    age: {
    	type: [String]
    },
    isDelete: {
    	type: Boolean,
    	default: false
    }
    // deletedAt: Date
});
userSchema.pre('find', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});

userSchema.pre('findOne', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});

userSchema.post('findOne', function(doc) {
	// doc.version = 1;
  console.log('post find is executing...');
});


// Or, in Node.js >= 7.6.0:
// schema.pre('save', async function() {
//   await doStuff();
//   await doMoreStuff();
// });
let User = mongoose.model('User', userSchema);

export default User;