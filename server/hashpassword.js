import bcrypt from "bcrypt";

async function hash() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  console.log(hashedPassword);
}

hash();