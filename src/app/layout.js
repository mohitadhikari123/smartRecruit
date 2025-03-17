import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Recruit",
  description: "Smart Recruit is an AI-powered hiring platform that automates candidate evaluation through resume analysis, ranking, and AI-generated feedback. It features a user-friendly dashboard, real-time insights, and automated shortlisting to streamline the recruitment process efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
