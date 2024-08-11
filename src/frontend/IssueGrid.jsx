import React from "react";
import { Text, Button } from "@forge/react";
import { DynamicTable, Link } from "@forge/react";

const head = {
  cells: [
    {
      key: "summary",
      content: "Summary",
      isSortable: true,
    },
    {
      key: "createDate",
      content: "Create Date",
      isSortable: true,
    },
    {
      key: "assignee",
      content: "Assignee",
      isSortable: true,
    },
    {
      key: "status",
      content: "Status",
      isSortable: true,
    },
    {
      key: "priority",
      content: "Priority",
      isSortable: true,
    },
  ],
};

const IssueGrid = ({ issues, loading, onIssueRemove }) => {
  const rows = issues
    ? issues.map((issue, index) => ({
        key: `row-${index}-${issue.fields.summary}`,
        cells: [
          {
            key: issue.fields.summary,
            content: <Link>{issue.fields.summary}</Link>,
          },
          {
            key: issue.fields.created,
            content: (
              <Text>{new Date(issue.fields.created).toLocaleDateString()}</Text>
            ),
          },
          {
            key: issue.fields.assignee.displayName,
            content: <Text>{issue.fields.assignee.displayName}</Text>,
          },
          {
            key: issue.fields.status,
            content: <Text>{issue.fields.status.name}</Text>,
          },
          {
            key: issue.fields.priority,
            content: <Text>{issue.fields.priority.name}</Text>,
          },
          {
            key: "remove",
            content: (
              <Button
                appearance="danger"
                onClick={() => onIssueRemove(issue.id)}
              >
                X
              </Button>
            ),
          },
        ],
      }))
    : [];

  return <DynamicTable caption="Related bugs" isLoading={loading} head={head} rows={rows} />;
};

export default IssueGrid;
