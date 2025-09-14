"use client";

import "./globals.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token && pathname !== "/auth") {
      router.replace("/auth");
    }

    if (token && pathname === "/auth") {
      router.replace("/");
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <body className="">
        <Provider store={store}>
          <section>{children}</section>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
