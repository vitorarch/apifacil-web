export interface IEndpoints {
  name: string;
  integrationUrl: string;
}

export const setDefaultEndpoints = (integrationId: string): IEndpoints[] => {
  const defaultUrl = "https://apifacil.azurewebsites.net/api/kommo/report"
  return [
    {
      name: "Companies",
      integrationUrl: `${defaultUrl}/companies?i=${integrationId}`
    },
    {
      name: "Leads",
      integrationUrl: `${defaultUrl}/leads?i=${integrationId}`
    },
    {
      name: "Events",
      integrationUrl: `${defaultUrl}/events?i=${integrationId}`
    },
    {
      name: "Pipelines",
      integrationUrl: `${defaultUrl}/pipelines?i=${integrationId}`
    },
    {
      name: "Sources",
      integrationUrl: `${defaultUrl}/sources?i=${integrationId}`
    },
    {
      name: "Status",
      integrationUrl: `${defaultUrl}/status?i=${integrationId}`
    },
    {
      name: "Tasks",
      integrationUrl: `${defaultUrl}/tasks?i=${integrationId}`
    },
    {
      name: "Users",
      integrationUrl: `${defaultUrl}/users?i=${integrationId}`
    }
  ]
}