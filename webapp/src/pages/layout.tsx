import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full min-h-svh flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col mb-16 px-3 min-h-screen">
        {children ? children : <Outlet />}
      </div>

      <Footer />
    </div>
  );
};
