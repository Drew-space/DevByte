import { PricingTable } from "@clerk/nextjs";
import React from "react";

const PricingPage = () => {
  return (
    <section className="py-24">
      <div className="container flex max-w-5xl items-center justify-center">
        <PricingTable />
      </div>
    </section>
  );
};

export default PricingPage;
