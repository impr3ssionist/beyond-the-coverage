"use client";

import { useState } from "react";

type FormState = {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  number_of_employees: string;
  message: string;
};

const initialState: FormState = {
  full_name: "",
  company_name: "",
  email: "",
  phone: "",
  number_of_employees: "",
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
            className="w-full rounded-lg border border-light bg-white p-3 text-[#915EA6] placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="company_name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Company name
          </label>
          <input
            id="company_name"
            name="company_name"
            placeholder="Company name"
            value={form.company_name}
            onChange={updateField}
            className="w-full rounded-lg border border-light bg-white p-3 text-[#915EA6] placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
          className="w-full rounded-lg border border-light bg-white p-3 text-[#915EA6] placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label
          htmlFor="number_of_employees"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Number of Employees
        </label>
        <select
          id="number_of_employees"
          name="number_of_employees"
          value={form.number_of_employees}
          onChange={updateField}
          className="w-full rounded-lg border border-light bg-white p-3 text-[#915EA6] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="" className="text-gray-900">Select number of employees</option>
          <option value="1-10" className="text-[#915EA6]">1-10</option>
          <option value="11-50" className="text-[#915EA6]">11-50</option>
          <option value="51-100" className="text-[#915EA6]">51-100</option>
          <option value="101-250" className="text-[#915EA6]">101-250</option>
          <option value="251-500" className="text-[#915EA6]">251-500</option>
          <option value="500+" className="text-[#915EA6]">500+</option>
        </select>
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
          className="min-h-36 w-full rounded-lg border border-light bg-white p-3 text-[#915EA6] placeholder:text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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