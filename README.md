# 🚀 My Journey: Building the PyuScript Vault
## Scroll for reading in Myanmar

As a fourth-year Computer Science student at the University of Computer Studies, Pyay (UCS Pyay), I wanted to create a centralized platform where my peers and fellow students could easily showcase and share their web projects. I’d like to share the journey and the technical challenges I navigated while building this "digital stone pillar" for our community.

---

### 💡 The $0 Scalability Challenge

My primary goal was to build a product capable of handling approximately 700 students with zero infrastructure costs.

*   **Smart Storage Management:** I utilized **Appwrite** for the backend. While the Appwrite Free Tier provides 2GB of storage, my calculations showed that individual project records (stored as JSON) are extremely small (around 1.5KB). Even if 700 students uploaded 5 projects each, the total data would only reach about 5MB, leaving more than 99% of our storage capacity available.
*   **The GitHub "Cheat Code":** To minimize manual data entry, I integrated the **GitHub API** to automatically fetch project titles and tech stacks. By utilizing personal access tokens, the system supports up to 5,000 requests per hour, ensuring the site remains stable even during peak usage.

---

### 🛠️ Handling Large Data with Next.js

To ensure the platform remains performant as the project count grows, I implemented several optimization strategies:

*   **Server Actions & Load More:** Instead of fetching all data at once, I implemented a **Load More** feature. Using **Next.js Server Actions**, data is retrieved in chunks only when a user scrolls, keeping initial page load times extremely fast.
*   **Next.js Cache Strategy:** I leveraged the **Next.js Cache** to minimize redundant data fetching, reducing server load and providing a snappier experience for users.
*   **Dynamic SEO:** I developed a system to generate SEO Meta Tags and **Dynamic Open Graph Images** directly through code for every project. This ensures that when students share their work on social media, it appears with professional, high-quality previews.

---

### 🤝 Pair Programming with AI

Throughout the development of this project, I engaged in **Pair Programming with Gemini AI**. We spent late nights discussing complex logic, refining responsive modals using **React Portals**, and debugging build errors. This collaborative approach allowed me to produce more robust, optimized code and find creative solutions to UI/UX challenges.

---

### ✨ Reflection

"PyuScript Vault" is more than just a technical project to me; it is a bridge between ancient heritage and modern technology. It has been an invaluable experience learning how to combine various tools to create a valuable, zero-cost product for my community.

**Developed by:** Aster
**Affiliation:** University of Computer Studies, Pyay (UCS Pyay)
**Expected Graduation:** 2027


# 🚀 My Journey: Building the PyuScript Vault

ပြည်ကွန်ပျူတာတက္ကသိုလ် (UCS Pyay) က စတုတ္ထနှစ် CS ကျောင်းသားတစ်ယောက်အနေနဲ့၊ ကျွန်တော့်ရဲ့ ပတ်ဝန်းကျင်က သူငယ်ချင်းတွေနဲ့ ကျောင်းသားတွေ ဖန်တီးထားတဲ့ Web Projects လေးတွေကို လွယ်လွယ်ကူကူနဲ့ တစ်စုတစ်စည်းတည်း မျှဝေကြည့်ရှုနိုင်မယ့် နေရာလေးတစ်ခု ဖန်တီးပေးချင်ခဲ့ပါတယ်။ ဒီ Project ကို တည်ဆောက်ခဲ့တဲ့ ကျွန်တော့်ရဲ့ ခရီးစဉ်နဲ့ နည်းပညာပိုင်းဆိုင်ရာ စိန်ခေါ်မှုတွေကို အခုလို ပြန်လည်မျှဝေချင်ပါတယ်-

---

### 💡 The $0 Scalability Challenge

ကျွန်တော့်ရဲ့ အဓိက ရည်မှန်းချက်က ဘာကုန်ကျစရိတ်မှ မရှိဘဲ (Zero-Cost) ကျောင်းသား ၇၀၀ ဝန်းကျင်ကို Handle လုပ်နိုင်မယ့် Product တစ်ခု ဖြစ်ဖို့ပါ။

*   **Smart Storage Management:** Backend အတွက် **Appwrite** ကို သုံးထားပါတယ်။ Appwrite ရဲ့ Free Tier မှာ Storage **2GB** ပဲ ပေးပေမယ့်၊ ကျွန်တော် တွက်ချက်ကြည့်တဲ့အခါ Project record တစ်ခုစီရဲ့ JSON data size က အရမ်းသေးငယ်ပါတယ်။ ကျောင်းသား ၇၀၀ လုံးက Project ၅ ခုစီ တင်ရင်တောင် **5MB** ဝန်းကျင်ပဲ ရှိမှာဖြစ်လို့ ဒီ 2GB Storage ဟာ ကျွန်တော်တို့အတွက် ပိုလျှံနေပါတယ်။
*   **The GitHub "Cheat Code":** Manual ရိုက်ထည့်ရတဲ့ အလုပ်ကို လျှော့ချဖို့ **GitHub API** ကို သုံးပြီး Title နဲ့ Tech Stack တွေကို အလိုလို ဆွဲယူ (Automate) ခိုင်းထားပါတယ်။ တစ်နာရီကို Request **၅,၀၀၀** အထိ ရတဲ့အတွက် ကျောင်းသားတွေ တစ်ပြိုင်နက်တည်း သုံးနေရင်တောင် အေးဆေးပါပဲ။

---

### 🛠️ Handling Large Data with Next.js

ဒေတာတွေ များလာတဲ့အခါ Site ကြီး လေးမသွားအောင် ကျွန်တော် အောက်ပါ နည်းစနစ်တွေကို အသုံးပြုခဲ့ပါတယ်-

*   **Server Actions & Load More:** ဒေတာအားလုံးကို တစ်ခါတည်း ဆွဲမထုတ်ဘဲ **Load More** feature ကို ထည့်သွင်းထားပါတယ်။ Next.js Server Actions ကို သုံးပြီး ကျောင်းသားက Scroll ဆွဲတဲ့အခါမှသာ ဒေတာတွေကို အပိုင်းလိုက် (Chunks) ခေါ်ယူစေတာကြောင့် Page Loading က အမြဲတမ်း မြန်ဆန်နေပါတယ်။
*   **Next.js Cache Strategy:** ဒေတာတွေကို ခဏခဏ Fetch လုပ်မနေဘဲ **Next.js Cache** ကို အထိရောက်ဆုံး အသုံးချထားပါတယ်။ ဒါက Server ရဲ့ Load ကို လျှော့ချပေးသလို User အတွက်လည်း အဆင်ပြေစေပါတယ်။
*   **Dynamic SEO:** Project တစ်ခုချင်းစီအတွက် SEO Meta Tags တွေနဲ့ **Dynamic Open Graph Images** တွေကို Code နဲ့ တိုက်ရိုက် generate လုပ်ထားလို့ Social Media မှာ Share တဲ့အခါမှာလည်း အမိုက်စား ပေါ်နေမှာပါ။

---

### 🤝 Pair Programming with AI

ဒီ Project တည်ဆောက်မှု တစ်လျှောက်လုံးမှာ ကျွန်တော် **Gemini AI** နဲ့ Pair Programming လုပ်ပြီး တည်ဆောက်ခဲ့တာပါ။ ညဉ့်နက်တဲ့အထိ ကုဒ်တွေရဲ့ Logic တွေကို ဆွေးနွေးတာ၊ **React Portals** သုံးပြီး Responsive Modal တွေ ညှိတာ၊ Build Error တွေကို အတူတူ ဖြေရှင်းတာတွေ လုပ်ခဲ့ပါတယ်။ ဒီလို AI နဲ့ တွဲဖက်လုပ်ဆောင်မှုကြောင့် ပိုမိုခိုင်မာပြီး Optimized ဖြစ်တဲ့ Code တွေကို ဖန်တီးနိုင်ခဲ့ပါတယ်။

---

### ✨ Reflection

"PyuScript Vault" ဟာ ကျွန်တော့်အတွက်တော့ Project တစ်ခုထက် ပိုပါတယ်။ နည်းပညာတွေကို အထိရောက်ဆုံး ပေါင်းစပ်ပြီး ကိုယ့် Community အတွက် တန်ဖိုးရှိတဲ့ အရာတစ်ခုကို အခမဲ့ ဖန်တီးနိုင်ခဲ့တဲ့ ကျွန်တော့်ရဲ့ အတွေ့အကြုံကောင်း တစ်ခုပါပဲ။

**Affiliation:** University of Computer Studies, Pyay (UCS Pyay)
**Expected Graduation:** 2027