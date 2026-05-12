import { Client, Account, Databases, Users, TablesDB } from "node-appwrite";
import { cookies } from "next/headers";

// User တွေ လော့ဂ်အင်ဝင်ပြီးသား အခြေအနေမှာ သုံးမယ့် Client
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  // Next.js ရဲ့ Cookies ထဲကနေ session ကို ယူမယ်
  const cookieStore = cookies();
  const session = (await cookieStore).get("appwrite-session");


  if (!session || !session.value) {
    throw new Error("No session found");
  }

  // Session ရှိရင် Client ကို အသိအမှတ်ပြုပေးလိုက်မယ်
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new TablesDB(client);
    },
  };
}

// မင်းတစ်ယောက်တည်း (သို့) System က နောက်ကွယ်ကနေ လုပ်မယ့် Admin Client
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!); // Admin API Key သုံးထားတယ်

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new TablesDB(client);
    },

    get users() {
      return new Users(client);
    },
  };
}
