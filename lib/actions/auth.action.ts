// lib/actions/auth.action.ts (သို့မဟုတ် သင့်တော်ရာ Action ဖိုင်တစ်ခုတွင်)
"use server";

import { createSessionClient } from "@/lib/appwrite.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession({ sessionId: "current" }); // Appwrite Server ကနေ Session ကို ဖျက်မယ်
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Appwrite ဘက်မှာ Error တက်တက်၊ မတက်တက်... Browser ထဲက Cookie ကိုတော့ အတင်းဖျက်ထုတ်ပါမယ်
    (await cookies()).delete("appwrite-session");

    // Cookie ဖျက်ပြီးတာနဲ့ Landing Page ကို ပြန်လွှတ်မယ်
    redirect("/");
  }
}
