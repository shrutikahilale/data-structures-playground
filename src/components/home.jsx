import React, { useState } from "react";
import InstructionsComponent from "./instructions";
import Playground from "./playground";
import DataStructures from "./data_structures";

export default function Home() {
  const [selectedDs, setSelectedDs] = useState("");
  const [view, setView] = useState("home");

  const navigateToInstructions = (ds) => {
    setSelectedDs(ds);
    setView("instructions");
  };

  const navigateToPlayground = () => {
    setView("playground");
  };

  const navigateToHome = () => {
    setSelectedDs("");
    setView("home");
  };

  return (
    <>
      <header className="header">
        <h1>Welcome to Data Structure Playground!</h1>
        <p>
          Explore and interact with various data structures to deepen your
          understanding.
        </p>
      </header>

      <main className="main-content">
        {view === "home" && (
          <DataStructures navigateToInstructions={navigateToInstructions} />
        )}

        {view === "instructions" && (
          <InstructionsComponent
            ds={selectedDs}
            goToPlayground={navigateToPlayground}
            goBackToList={navigateToHome}
          />
        )}

        {view === "playground" && (
          <Playground ds={selectedDs} goBackToHome={navigateToHome} />
        )}
      </main>
    </>
  );
}
