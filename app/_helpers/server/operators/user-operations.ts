import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../db';

const User = db.User;

export const userOperations  = {
    authenticate,
    getById,
    getCurrent,
    getAll,
    create,
    update,
    delete: _delete
};

async function authenticate({ identifier, password }: { identifier: { phone?: string, email?: string }, password: string }) {
    const user = await User.findOne({
        $or: [
          { 'phone': identifier.phone },
          { 'email': identifier.email }
        ]
      });
      

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'E-mail, phone or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return {
        user: user.toJSON(),
        token
    };
}

async function getById(id: string) {
    try {
        return await User.findById(id);
    } catch {
        throw 'User Not Found';
    }
}

async function getCurrent() {
    try {
        const currentUserId = headers().get('userId');
        return await User.findById(currentUserId);
    } catch {
        throw 'Current User Not Found';
    }
}

async function create(params: any) {
    // validate
    if (await User.findOne({ email: params.email })) {
        throw 'E-mail "' + params.email + '" is already registered';
    }
    if (await User.findOne({phone: params.phone }) ){
        throw 'Phone "' + params.phone + '" is already registered';
    }

    const user = new User(params);

    // hash password
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await user.save();
}

async function getAll() {
    return await User.find();
}


async function update(id: string, params: any) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== params.email && await User.findOne({ email: params.email })) {
        throw 'E-mail "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id: string) {
    await User.findByIdAndDelete(id);
}

