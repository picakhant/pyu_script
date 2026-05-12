// lib/actions/project.action.ts
"use server"; // 🌟 ဒါလေးပါတာနဲ့ ဒီဖိုင်က Server ပေါ်မှာပဲ အလုပ်လုပ်တော့မယ်

import { createSessionClient } from "@/lib/appwrite.server";
import { ID, Permission, Role } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { Query } from "node-appwrite"; // အပေါ်ဆုံး Import နေရာမှာ ဒါလေး သွားထည့်ပေးပါ

export async function submitProjectToVault(params: {
  githubUrl: string;
  demoUrl?: string;
}) {
  try {
    // 🌟 ၁။ User လော့ဂ်အင် ဝင်ထားလား စစ်မယ်
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    // 🌟 ၂။ GitHub URL ကနေ Owner နဲ့ Repo name ကို ဆွဲထုတ်မယ်
    const match = params.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error("Invalid GitHub URL format");

    const owner = match[1];
    const repo = match[2].replace(".git", "");

    // 🌟 ၃။ GitHub API ကို Server ကနေ (Token သုံးပြီး) လှမ်းခေါ်မယ်
    const headers: RequestInit["headers"] = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [repoRes, langRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
      fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers,
      }),
    ]);

    if (!repoRes.ok) throw new Error("Repository not found or is private.");

    const repoData = await repoRes.json();
    const langData = await langRes.json();

    const title = repoData.name;
    const description = repoData.description || "No description provided.";
    const technologiesArray = Object.keys(langData);
    const technologies =
      technologiesArray.length > 0
        ? technologiesArray.join(", ")
        : "Not specified";

    // 🌟 ၄။ Database ထဲ ထည့်မယ့် Data အပြည့်အစုံ ပြင်ဆင်မယ်
    const documentData = {
      user_id: user.$id,
      githubUrl: params.githubUrl,
      title,
      description,
      technologies,
      demoUrl: params.demoUrl || null,
    };

    // 🌟 ၅။ Appwrite Version 25 Syntax အသစ် (TablesDB & createRow)
    const newProject = await databases.createRow({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      rowId: ID.unique(),
      data: documentData,
      permissions: [
        Permission.read(Role.any()), // ဘယ်သူမဆို ဖတ်လို့ရတယ်
        Permission.update(Role.user(user.$id)), // ပိုင်ရှင် (Owner) သာလျှင် ပြင်လို့ရမယ်
        Permission.delete(Role.user(user.$id)), // ပိုင်ရှင် (Owner) သာလျှင် ဖျက်လို့ရမယ်
      ],
    });

    // 🌟 ၆။ Dashboard မှာ Project အသစ် ချက်ချင်းပေါ်လာအောင် Cache ကို ရှင်းလင်းမယ်
    revalidatePath("/dashboard");

    return { success: true, project: JSON.parse(JSON.stringify(newProject)) };
  } catch (error: any) {
    console.error("Error submitting project:", error);
    return {
      success: false,
      error: error.message || "Failed to submit project",
    };
  }
}

// 🌟 THE NEW FETCH FUNCTION (For Dashboard)

export async function getProjects(limit = 12, offset = 0) {
  try {
    const { databases } = await createSessionClient();

    const response = await databases.listRows({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      queries: [
        Query.orderDesc("$createdAt"), // အသစ်တင်တဲ့ကောင် အပေါ်ဆုံးမှာ နေမယ်
        Query.limit(limit), // တစ်ခါခေါ်ရင် ဘယ်နှခု ယူမလဲ (Default: 12)
        Query.offset(offset), // ဘယ်ကနေ စယူမလဲ (Pagination အတွက်)
      ],
    });

    // Serialization Error မတက်အောင် Plain Object ပြောင်းပြီး ပြန်ပို့မယ်
    return JSON.parse(JSON.stringify(response.rows));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Error တက်ရင် Array အလွတ် ပြန်ပေးမယ် (Page ကြီး မပျက်သွားအောင်)
  }
}

// lib/actions/project.action.ts ထဲတွင် အောက်ပါကုဒ်ကို အောက်ဆုံး၌ ထပ်ထည့်ပါ

export async function getProjectById(projectId: string) {
  try {
    const { databases } = await createSessionClient();

    const project = await databases.getRow({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      rowId: projectId,
    });

    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null; // မရှိရင် null ပြန်ပေးမယ်
  }
}

export async function deleteProjectFromVault(projectId: string) {
  try {
    // 🌟 ၁။ လက်ရှိ လော့ဂ်အင်ဝင်ထားတဲ့ User ရဲ့ Session နဲ့ ချိတ်ဆက်မယ် (Security)
    const { databases } = await createSessionClient();

    // 🌟 ၂။ Appwrite Version 25 Syntax အသစ် (deleteRow) ကို သုံးပြီး ဖျက်မယ်
    // Permission စနစ်အရ ပိုင်ရှင် မဟုတ်ရင် ဖျက်ခွင့်ပေးမှာ မဟုတ်ပါဘူး
    await databases.deleteRow({
      databaseId: process.env.APPWRITE_DB_ID!, // မင်းရဲ့ env နာမည်နဲ့ ကိုက်ညီအောင် ပြင်ပေးပါ
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      rowId: projectId,
    });

    // 🌟 ၃။ Dashboard မှာ Card ချက်ချင်း ပျောက်သွားအောင် Cache ကို ရှင်းမယ်
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: error.message || "Failed to delete project",
    };
  }
}

// lib/actions/project.action.ts ထဲတွင် အောက်ပါ Code ကို ထပ်ပေါင်းထည့်ပါ

export async function editProjectInVault(
  projectId: string,
  params: { githubUrl: string; demoUrl?: string },
) {
  try {
    const { databases } = await createSessionClient(); // Owner ပဲ ပြင်ခွင့်ရအောင် Session နဲ့ချိတ်မယ်

    // 🌟 ၁။ GitHub URL အဟောင်းပဲဖြစ်ဖြစ်၊ အသစ်ပဲဖြစ်ဖြစ် Data အသစ် (Latest) ပြန်ဆွဲထုတ်မယ်
    const match = params.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error("Invalid GitHub URL format");

    const owner = match[1];
    const repo = match[2].replace(".git", "");

    const headers: RequestInit["headers"] = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [repoRes, langRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
      fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers,
      }),
    ]);

    if (!repoRes.ok) throw new Error("Repository not found or is private.");

    const repoData = await repoRes.json();
    const langData = await langRes.json();

    const title = repoData.name;
    const description = repoData.description || "No description provided.";
    const technologiesArray = Object.keys(langData);
    const technologies =
      technologiesArray.length > 0
        ? technologiesArray.join(", ")
        : "Not specified";

    // 🌟 ၂။ Appwrite Document ကို Update လုပ်မယ် (Title တွေ Tech တွေပါ Auto ပြောင်းသွားမယ်)
    const updatedProject = await databases.updateRow({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      rowId: projectId,
      data: {
        githubUrl: params.githubUrl,
        demoUrl: params.demoUrl || null,
        title,
        description,
        technologies,
      },
    });

    // 🌟 ၃။ Cache တွေကို ရှင်းလင်းမယ်
    revalidatePath("/dashboard");
    revalidatePath(`/project/${projectId}`);

    return {
      success: true,
      project: JSON.parse(JSON.stringify(updatedProject)),
    };
  } catch (error: any) {
    console.error("Edit Error:", error);
    return {
      success: false,
      error: error.message || "Failed to update project",
    };
  }
}

// lib/actions/project.action.ts ထဲတွင်

export async function getProjectsByUser(userId: string) {
  try {
    const { databases } = await createSessionClient();

    const response = await databases.listRows({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      queries: [
        Query.equal("user_id", userId), // 🌟 ဒီ User ID နဲ့ တူတာကိုပဲ ဆွဲထုတ်မယ်
        Query.orderDesc("$createdAt"),
      ],
    });

    return JSON.parse(JSON.stringify(response.rows));
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return [];
  }
}

// lib/actions/project.action.ts ထဲတွင် ထပ်ပေါင်းထည့်ရန်

export async function searchProjects(
  keyword: string,
  searchType: string = "title",
) {
  try {
    const { databases } = await createSessionClient();

    // 🌟 လုံခြုံရေးအရ searchType သည် 'title' သို့မဟုတ် 'technologies' သာ ဖြစ်ရမည်ဟု သတ်မှတ်ထားခြင်း
    const validSearchType =
      searchType === "technologies" ? "technologies" : "title";

    // 🌟 Appwrite ရဲ့ Full-text Search Index ကို အသုံးပြုခြင်း
    const response = await databases.listRows({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      queries: [
        Query.search(validSearchType, keyword), // 👈 ဒီနေရာက အသက်ပါပဲ
        Query.orderDesc("$createdAt"),
        Query.limit(50), // Search Result ကို အများဆုံး ၅၀ အထိပဲ ပြမယ်
      ],
    });

    return JSON.parse(JSON.stringify(response.rows));
  } catch (error) {
    console.error("Error searching projects:", error);
    return [];
  }
}
