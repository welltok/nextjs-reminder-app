"use client"; // ✅ Required to ensure Redux only runs on the client

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import LayoutWithCheck from "@/lib/store/LayoutWithCheck";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LayoutWithCheck>{children}</LayoutWithCheck>
      </PersistGate>
    </Provider>
  );
}
