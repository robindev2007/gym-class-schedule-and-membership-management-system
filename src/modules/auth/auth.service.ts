import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import { generateToken } from "../../utils/jwt";

export const sighup = async (
  name: string,
  email: string,
  password: string,
  role: "ADMIN" | "TRAINER" | "TRAINEE"
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await prisma.user.findFirst({ where: { email } });
    if (userExist) throw new Error("User with this Email already exist");

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, role },
    });

    const token = generateToken({ id: user.id, role: user.role });
    return { data: { user, token } };
  } catch (error: any) {
    return { error: error.message || "Signup error" };
  }
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: { message: "Invalid credentials" } };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: { message: "Invalid credentials" } };

  const token = generateToken({ id: user.id, role: user.role });

  return { data: { user, token } };
};
