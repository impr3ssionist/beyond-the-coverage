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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        name="full_name"
        placeholder="Full name"
        value={form.full_name}
        onChange={updateField}
        className="w-full rounded border p-3"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={updateField}
        className="w-full rounded border p-3"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={updateField}
        className="w-full rounded border p-3"
      />
      <textarea
        name="message"
        placeholder="How can we help?"
        value={form.message}
        onChange={updateField}
        className="w-full rounded border p-3 min-h-32"
      />
      <button
        type="submit"
        className="rounded px-5 py-3 border font-medium"
      >
        Request a Quote
      </button>
      <p className="text-sm">{status}</p>
    </form>
  );
}