import { createAdminClient } from "@/lib/appwrite.server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { account, databases, users } = await createAdminClient();

    const user = await users.get({ userId });
    const userEmail = user.email;

    const checkAllowlist = await databases.listRows({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.ALLOW_USER_COLLECTION_ID!,
      queries: [Query.equal("email", userEmail)], 
    });

    console.log("Allow list is ", checkAllowlist);

    if (checkAllowlist.total === 0) {
      console.log(`Blocked unauthorized email: ${userEmail}`);

      // 🚨 Zero Garbage Policy
      await users.delete({ userId: userId });

      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const allowedUserData = checkAllowlist.rows[0];
    const githubUsername = allowedUserData.github_username;
    const rowNumber = allowedUserData.row_number;

    if (!user.name) {
      await users.updateName({
        userId: userId,
        name: githubUsername,
      });
    }

    await users.updatePrefs({
      userId: userId,
      prefs: {
        github_username: githubUsername,
        row_number: rowNumber,
      },
    });

    await users.updateLabels({
      userId,
      labels: ["ucspStudent"],
    });

    const session = await account.createSession({
      userId: userId,
      secret: secret,
    });

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(session.expire),
    });

    // redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("OAuth Error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
