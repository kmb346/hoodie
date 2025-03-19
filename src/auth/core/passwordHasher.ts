import crypto from "crypto";

export function hashPassword(password: string, salt: string):Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);
      resolve(hash.toString("hex").normalize());
    })
  })
}

export async function comparePasswords({
  userPassword, 
  unhashedPassword,
  salt
}: {
  userPassword: string, 
  unhashedPassword: string, 
  salt: string
}) {
  const hashedPassword = await hashPassword(unhashedPassword, salt);
  
  return crypto.timingSafeEqual(
    Buffer.from(hashedPassword, "hex"),
    Buffer.from(userPassword, "hex")
  );
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize();
}