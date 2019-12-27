import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	created_at: String,
	updated_at: String,
});

UserSchema.static('hash', function (pass: string): string {
	return bcrypt.hashSync(pass, 15);
});

UserSchema.method('setPassword', function(pass: string): void {
	this.password = UserSchema.statics.hash(pass);
});

const User = mongoose.model('User', UserSchema);

export { UserSchema };
export default User;