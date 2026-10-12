const fs= require('fs/promises');
const path = require('path');
const bcrypt= require('bcrypt');
const filepath= path.join(process.cwd(), 'data', 'users.json');

const readUsers= async ()=>{
    const data = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data);
}

const writeUSers= async (users)=>{
    await fs.writeFile(filepath, JSON.stringify(users, null, 2));
}

exports.createUsers= async (data)=>{
    const users= await readUsers();
    const exists = users.find((u)=> u.email=== data.email);
    if(exists){
        throw new Error('User already exist!');
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = {id: Date.now(), name: data.name, email: data.email, password: hashedPassword};
    await writeUSers([...users, newUser]);
    return newUser;
};

 exports.findUsersByEmail= async (email)=>{
    const users= await readUsers();
    return users.find((u)=> u.email===email);
 };