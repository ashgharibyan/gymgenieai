import { type EmailFormData } from "../types/types";

export function sendEmail(data: EmailFormData) {
  const apiEndpoint = "/api/email";

  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response: EmailFormData) => {
      console.log(response.message);
    })
    .catch((err) => {
      console.log(err);
    });
}
