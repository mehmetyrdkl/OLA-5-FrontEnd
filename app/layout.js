import "./globals.scss";
import "./styles/footer.scss";
import "./styles/hero.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata = {
  title: "Welcome to Comwell's hotels throughout the country",
  description:
    "Meeting rooms, conference rooms, venues and lovely rooms. Comwell has it all. We aim high, also regarding sustainability, so you get the best experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
