"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [draftOpened, setDraftOpened] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Emerald Pathways website enquiry");
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`);
    setDraftOpened(true);
    window.location.href = `mailto:goemeraldpathways@gmail.com?subject=${subject}&body=${body}`;
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <p className="form-help">Complete the form to open an email draft. You will send it from your email app.</p>
      <div><label htmlFor="name">Name <span>*</span></label><input id="name" name="name" autoComplete="name" required placeholder="Your Name..." /></div>
      <div><label htmlFor="email">Email Address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required placeholder="Your Email Address..." /></div>
      <div><label htmlFor="message">Message <span>*</span></label><textarea id="message" name="message" required placeholder="Your Message..." /></div>
      <Button className="submit-button" variant="outline" type="submit">Open email draft</Button>
      {draftOpened && <p className="form-note" role="status">The draft is ready in your email app. Please send it there.</p>}
    </form>
  );
}
