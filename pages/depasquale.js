import React from "react";
import dynamic from "next/dynamic";
import Head from 'next/head'

export default function Home() {
  const FrankMapNoSSR = dynamic(() => import("../components/FrankMap"), {
    ssr: false
  });

  return (
      <main>
        <div id="map" style={{ height: "100vh", width: "100%" }}>
          <FrankMapNoSSR />
        </div>
      </main>
  );
}