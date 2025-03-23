import bcrypt from "bcryptjs";


export function hashPassword(password: string, salt: string):Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password.normalize(), salt).then((hash: string) => {
      if (!hash) {
        reject("Unable to hash password");
      }
      resolve(hash.normalize());
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