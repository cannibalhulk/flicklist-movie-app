import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routers/route";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient(); 

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
