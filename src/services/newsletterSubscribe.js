const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const getResourceLink = () => {
  const configuredLink = import.meta.env.VITE_NEWSLETTER_RESOURCE_LINK?.trim();

  if (configuredLink) {
    return configuredLink;
  }

  if (typeof window !== "undefined") {
    return `${window.location.origin}/downloads`;
  }

  return "https://cathodepower.com/downloads";
};

export async function subscribeNewsletter({ email, source = "website" }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Newsletter signup is not configured yet. Please contact Cathode Power support."
    );
  }

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        user_email: email,
        to_email: email,
        reply_to: email,
        resource_link: getResourceLink(),
        subscribe_source: source,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("We could not send your confirmation email. Please try again.");
  }

  return { ok: true };
}
