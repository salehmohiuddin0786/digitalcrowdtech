import React, { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";

export const metadata = {
  title: "Order Confirmation | Digital Crowd Technologies",
  description: "Official PhonePe Business purchase receipt and digital software delivery status.",
};

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-400 font-mono text-xs">
          Loading order status...
        </div>
      }
    >
      <OrderConfirmationClient />
    </Suspense>
  );
}
