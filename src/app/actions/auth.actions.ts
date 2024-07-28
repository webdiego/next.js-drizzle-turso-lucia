"use server";
import { SignInSchema, SignUpSchema } from "@/types";
import { generateId } from "lucia";
import db from "@/db";
import { userTable } from "@/db/schema/user";
import { lucia, validateRequest } from "@/lib/lucia/lucia";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";

export const signUp = async (values: {
  username: string;
  password: string;
}) => {
  // Check with Zod if the values are valid
  try {
    SignUpSchema.parse(values);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  // Hash the password
  const hashedPassword = await argon2.hash(values.password);
  // Generate a random ID for the user
  const userId = generateId(15);

  // Insert the user into the database
  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        username: values.username,
        hashedPassword,
      })
      .returning({
        id: userTable.id,
        username: userTable.username,
      });

    // Create a session for the user
    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    // Create a session cookie
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Set the session cookie
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (values: {
  username: string;
  password: string;
}) => {
  // Check with Zod if the values are valid
  try {
    SignInSchema.parse(values);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  // Find the user in the database
  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.username, values.username),
  });

  // If the user is not found, return an error
  if (!existingUser || !existingUser.hashedPassword) {
    return {
      error: "User not found",
    };
  }

  // Verify the password
  const isValidPassword = await argon2.verify(
    existingUser.hashedPassword,
    values.password
  );

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  // Create a session for the user
  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  // Create a session cookie
  const sessionCookie = lucia.createSessionCookie(session.id);

  // Set the session cookie
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: "Logged in successfully",
  };
};

export const signOut = async () => {
  // Validate the request to get the session
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    // Invalidate the session
    await lucia.invalidateSession(session.id);

    // Creates a new cookie with a blank value that expires immediately to delete the existing session cookie.
    const sessionCookie = lucia.createBlankSessionCookie();

    // Set the session cookie as blank
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
