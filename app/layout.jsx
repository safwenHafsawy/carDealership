import Navigation from "@/components/navigation";
import "@/styles/global.scss";
import { Andika } from "next/font/google";

export const metadata = {
  title: "Swift Cars",
  description: "Efficient, Fast, and Accessible Mobility.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />

        <main>{children}</main>
      </body>
    </html>
  );
}
