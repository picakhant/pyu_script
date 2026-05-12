import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // ၁။ Browser ဆီကနေ appwrite-session ကို လှမ်းယူမယ်
  const session = request.cookies.get("appwrite-session");

  // ၂။ ငါတို့ ကာကွယ်ချင်တဲ့ Page တွေရဲ့ လမ်းကြောင်းတွေကို သတ်မှတ်မယ်
  const protectedPaths = ["/dashboard", "/profile", "/submit"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // ၃။ ကာကွယ်ထားတဲ့ Page ကို သွားမယ်၊ ဒါပေမဲ့ Cookie မရှိဘူးဆိုရင် -> Homepage ကို ကန်ထုတ်မယ်
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ၄။ (Bonus UX) လော့ဂ်အင် ဝင်ထားပြီးသား User က Homepage ('/') ကို သွားရင် -> Dashboard ကို တန်းပို့ပေးမယ်
  if (request.nextUrl.pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // အကုန်အဆင်ပြေရင် ရှေ့ဆက်သွားခွင့်ပြုမယ်
  return NextResponse.next();
}

// Middleware အလုပ်လုပ်မယ့် လမ်းကြောင်းတွေကို စစ်ထုတ်ခြင်း (Images, API တွေကို မစစ်အောင် ဖယ်ထားတာပါ)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
