const submission = {
  full_name: "Ada Lovelace",
  company_name: "Analytical Engines LLC",
  email: "ada@example.com",
  phone: "555-123-4567",
  number_of_employees: "11-50",
  message: "Please review our current benefits package.",
};

describe("sendContactEmails", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "test_resend_key",
      RESEND_FROM_EMAIL: "noreply@beyondthecoverage.com",
      RESEND_FROM_EMAIL_NEW: "",
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email_123" }),
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it("sends contact notifications to the configured admin emails", async () => {
    const { sendContactEmails } = await import("./send-email");

    const result = await sendContactEmails(
      submission,
      "sam.haas@beyondthecoverage.com, owner@example.com"
    );

    expect(result).toEqual({ success: true });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        body: expect.any(String),
      })
    );

    const [, request] = jest.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(String(request?.body));

    expect(body).toMatchObject({
      from: "noreply@beyondthecoverage.com",
      to: ["sam.haas@beyondthecoverage.com", "owner@example.com"],
      subject: "New Contact Submission from Ada Lovelace",
      reply_to: "ada@example.com",
    });
  });
});
