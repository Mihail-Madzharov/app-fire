import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text, useProductContext } from "@forge/react";
import { fetchIssuesForIssue } from "./utils";
import IssueGrid from "./IssueGrid";

const App = () => {
  const [issues, setIssues] = useState();

  const context = useProductContext();

  useEffect(() => {
    if (context) {
      fetchIssuesForIssue(context.extension.issue.id).then(setIssues);
    }
  }, [context]);

  const handleIssueRemove = (issueId) => {
    setIssues((prevIssues) =>
      prevIssues.filter((issue) => issue.id !== issueId)
    );
  };

  return (
    <>
      <IssueGrid
        issues={issues}
        loading={!issues?.length}
        onIssueRemove={handleIssueRemove}
      />
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
