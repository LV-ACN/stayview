# MCP setup — live Jira (Atlassian) & Figma

The lab **fetches** the workshop story and design through MCP. The Jira ticket and Figma frame are **prepared by the instructor** and listed in **`docs/workshop-config.json`**.

## Participant prerequisites

- Clone **latest `stayview`** (config already contains `jiraIssueKey` and `figmaDesignUrl`)
- **Do not create** a Jira story or Figma file unless you are the instructor
- Confirm you can open the **same issue** and **same Figma link** in your browser (instructor grants access)
- Atlassian Cloud + Figma accounts for **OAuth** in Cursor

Instructor setup: **`workshop/INSTRUCTOR-SETUP-JIRA-FIGMA.md`** (outside this repo folder)

## 1. Wire MCP in the project

**`.cursor/mcp.json`:**

| Server | Endpoint |
|--------|----------|
| `atlassian` | `https://mcp.atlassian.com/v2/mcp` |
| `figma` | `https://mcp.figma.com/mcp` |

Open the **`stayview`** folder as the Cursor workspace.

---

## 2. Atlassian MCP — wire and authenticate (Jira)

1. **File → Open Folder** → **`stayview`**
2. **Cursor Settings → Tools & MCP** → enable **`atlassian`**
3. **Connect** → Atlassian OAuth → select site with the workshop project → **Allow**
4. Smoke test:
   ```
   @docs/workshop-config.json
   Using Atlassian MCP, retrieve the Jira issue in jiraIssueKey and return its summary and description.
   ```

[Troubleshooting & marketplace](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/) — use **Clear All MCP Tokens** if connect fails.

---

## 3. Figma MCP — wire and authenticate

1. Enable **`figma`** → **Connect** → **Allow access**
2. Optional: `/add-plugin figma` for design-to-code skills

[Figma + Cursor setup](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server)

## 4. Verify before Module 1

```
@docs/workshop-config.json
Using Atlassian MCP, retrieve the Jira issue named in jiraIssueKey and summarize acceptance criteria.
```

```
@docs/workshop-config.json
Using Figma MCP, get design context for figmaDesignUrl. Summarize differences vs @components/RoomCard.tsx.
```

If MCP returns “not found” or access denied, ask the instructor to confirm your **Jira/Figma permissions** — not the config file.

## 5. Prompting pattern

Start discovery/plan prompts with **`@docs/workshop-config.json`**, then fetch via **Atlassian + Figma MCP**. Requirements and design do not come from creating new tickets in class.