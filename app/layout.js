"use client";

import "./globals.scss";
import "./styles/footer.scss";
import "./styles/hero.scss";

import { useState } from "react";
import { MyContext } from "./MyContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);
  const [loginToken, setLoginToken] = useState("");

  const contextValue = {
    sidebar,
    setSidebar,
    loginToken,
    setLoginToken,
  };

  return (
    <MyContext.Provider value={contextValue}>
      <html lang="en">
        <body className={sidebar ? "overflow-hidden" : ""}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </MyContext.Provider>
  );
}
