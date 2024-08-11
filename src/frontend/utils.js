import { requestJira } from "@forge/bridge";

export const fetchIssuesForIssue = async (issueIdOrKey) => {
  const response = await requestJira(`/rest/api/3/issue/${issueIdOrKey}`);

  const data = await response.json();

  const issueLinks = data.fields.issuelinks;
  const issues = issueLinks
    .map((link) => link.inwardIssue || link.outwardIssue)
    .filter(
      (linkedIssue) =>
        linkedIssue && linkedIssue.fields.issuetype.name === "Bug"
    )
    .map((i) =>
      requestJira(`/rest/api/3/issue/${i.id}`).then((res) => res.json())
    );

  const result = await Promise.all(issues);
  return result;
};
