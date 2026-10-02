"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Emerald Pathways website enquiry");
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`);
    setSent(true);
    window.location.href = `mailto:info@emeraldpathways.com?subject=${subject}&body=${body}`;
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div><label htmlFor="name">Name <span>*</span></label><input id="name" name="name" autoComplete="name" required placeholder="Your Name..." /></div>
      <div><label htmlFor="email">Email Address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required placeholder="Your Email Address..." /></div>
      <div><label htmlFor="message">Message <span>*</span></label><textarea id="message" name="message" required placeholder="Your Message..." /></div>
      <Button className="submit-button" variant="outline" type="submit">Submit</Button>
      {sent && <p className="form-note" role="status">Your email application has been opened with the enquiry ready to send.</p>}
    </form>
  );
}
