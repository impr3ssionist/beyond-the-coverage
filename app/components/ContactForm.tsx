"use client";

import { useState } from "react";

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  full_name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("Thanks. We will be in touch.");
      setForm(initialState);
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  }

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-light bg-white p-8 shadow-lg"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="full_name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Full name
          </label>
          <input
            id="full_name"
            name="full_name"
            placeholder="Full name"
            value={form.full_name}
            onChange={updateField}
            className="w-full rounded-lg border border-light bg-background p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={updateField}
            className="w-full rounded-lg border border-light bg-background p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={updateField}
          className="w-full rounded-lg border border-light bg-background p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us a little about what you need"
          value={form.message}
          onChange={updateField}
          className="min-h-36 w-full rounded-lg border border-light bg-background p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          Request a Quote
        </button>

        <p className="text-sm text-gray-600">{status}</p>
      </div>
    </form>
  );
}