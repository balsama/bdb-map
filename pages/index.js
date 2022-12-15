import React from "react";
import dynamic from "next/dynamic";
import Head from 'next/head'

export default function Home() {
  const BoundryMapNoSSR = dynamic(() => import("../components/BoundaryMap"), {
    ssr: false
  });

  return (
      <main>
        <Head>
          <title>Big Day Boston Birding Boundary</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@bigdayboston" />
          <meta name="twitter:creator" content="@bigdayboston" />
          <meta name="twitter:description" content="Boundary for the Big Day Boston birding competition." />
          <meta name="twitter:title" content="Big Day Boston Boundary" />
          <meta name="twitter:url" content="https://bigdayboston.com" />
          <meta name="twitter:image:alt" content="Big Day Boston Boundary" />
          <meta name="twitter:image" content="https://bdb-map-nm7si.ondigitalocean.app/screenshot.png" />
          <meta name="description" content="Boundary for the Big Day Boston birding competition." />
        </Head>
        <div id="map" style={{ height: "100vh", width: "100%" }}>
          <BoundryMapNoSSR />
        </div>
      </main>
  );
}