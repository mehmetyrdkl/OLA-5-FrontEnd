"use client";

import "./globals.scss";
import "./styles/footer.scss";
import "./styles/hero.scss";

import { useState } from "react";
import { MyContext } from "./MyContext";

// export const metadata = {
//   title: "Welcome to Comwell's hotels throughout the country",
//   description:
//     "Meeting rooms, conference rooms, venues and lovely rooms. Comwell has it all. We aim high, also regarding sustainability, so you get the best experiences",
// };

export default function RootLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);

  const contextValue = {
    sidebar,
    setSidebar,
  };
  return (
    <MyContext.Provider value={contextValue}>
      <html lang="en">
        <body className={sidebar && "overflow-hidden"}>{children}</body>
      </html>
    </MyContext.Provider>
  );
}
