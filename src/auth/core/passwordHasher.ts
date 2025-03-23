import bcrypt from "bcryptjs";


export function hashPassword(password: string, salt: string):Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password.normalize(), salt, (error, hash) => {
      if (error) {
        reject("Unable to hash password");
      }
      if (hash) {
        resolve(hash.normalize());
      }
    });
  })
}

export async function comparePasswords({
  userPassword, 
  unhashedPassword,
}: {
  userPassword: string, 
  unhashedPassword: string, 
}):Promise<boolean> {


  return bcrypt.compare(unhashedPassword, userPassword);
}

export function generateSalt() {

  return bcrypt.genSalt(10);
}