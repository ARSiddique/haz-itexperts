"use client";
import { useState } from "react";

export default function AssessmentPage() {
  const [sent, setSent] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    await fetch("/api/assessment", { method: "POST", body: JSON.stringify(data) });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Thanks! We’ll reach out shortly.</h1>
        <p className="mt-2 text-slate-600">You’ll also get a copy via email.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold">Free IT Assessment</h1>
      <p className="text-slate-600 mt-2">Tell us a bit about your environment.</p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <input name="name" required placeholder="Your name" className="border rounded-lg px-3 py-2" />
        <input name="email" required type="email" placeholder="Work email" className="border rounded-lg px-3 py-2" />
        <input name="company" placeholder="Company" className="border rounded-lg px-3 py-2" />
        <input name="users" placeholder="# of users/devices" className="border rounded-lg px-3 py-2" />
        <textarea name="notes" placeholder="What problems should we solve first?" className="border rounded-lg px-3 py-2" />
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium w-fit">Submit</button>
      </form>
    </div>
  );
}
