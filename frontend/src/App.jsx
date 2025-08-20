import React from "react";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import KPICards from "./components/KPICards";
import KeyFindings from "./components/KeyFindings";
import DataInsight from "./components/DataInsights";
import Recommendations from "./components/Recommendations";
import Roadmap from "./components/Roadmap";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="kpi">
          <KPICards />
        </section>

        <section id="findings">
          <KeyFindings />
        </section>

        <section id="insights">
          <DataInsight />
        </section>

        <section id="recommendations">
          <Recommendations />
        </section>

        <section id="roadmap">
          <Roadmap />
        </section>
      </main>
      <Footer />
    </>
  );
}