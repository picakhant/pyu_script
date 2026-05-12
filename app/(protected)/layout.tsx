import { createSessionClient } from "@/lib/appwrite.server";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;

  try {
    const { account } = await createSessionClient();
    user = await account.get();

    if (!user.labels.includes("ucspStudent")) {
      redirect("/unauthorized");
    }
  } catch (error) {
    redirect("/");
  }

  const githubUsername = user.prefs.github_username || user.name;
  const rowNumber = user.prefs.row_number || "Not Assigned";
  const avatarUrl = `https://github.com/${githubUsername}.png`;
  const userEmail = user.email;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        githubUsername={githubUsername}
        rowNumber={rowNumber}
        avatarUrl={avatarUrl}
        email={userEmail}
      />

      <main className="grow container mx-auto p-4 md:p-8 lg:p-10 animate-fade-in-up">
        {children}
      </main>

      <Footer />
    </div>
  );
}
