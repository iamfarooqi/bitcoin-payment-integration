"use client";
import CoinbasePaymentButton from "@/components/bitcoinPaymentButton.tsx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CoinbasePaymentButton />
    </main>
  );
}
