"use client";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import { postPanelApi } from "@/lib/panel-client";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await postPanelApi("/site/contact", form);

      if (!result.ok) {
        throw new Error(result.message);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message right now.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "var(--font-dm-sans)",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <main>
      <PageShell>

      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "20%",
            right: "20%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(184,255,53,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <span className="tag">Get In Touch</span>
              <h1
                className="mt-5 text-[#E8E8F0] leading-tight"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                }}
              >
                Have a question<br />
                or idea?<br />
                <span className="gradient-text">Say hello.</span>
              </h1>
              <p className="mt-5 text-[#6B6B80] text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Whether it is a content suggestion, a correction, or just
                feedback on an article, we read every message.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { icon: "o", label: "Response time", value: "Within 48 hours" },
                  { icon: "*", label: "Corrections", value: "We take accuracy seriously" },
                  { icon: "^", label: "Article requests", value: "Always welcome" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span style={{ color: "var(--lime)", fontFamily: "monospace", fontSize: "1.2rem" }}>
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-mono)" }}>
                        {item.label}
                      </p>
                      <p className="text-sm text-[#E8E8F0] font-medium mt-0.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[#1E1E30] p-8" style={{ background: "var(--card)" }}>
                {submitted ? (
                  <div className="py-12 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "rgba(184,255,53,0.15)", border: "1px solid rgba(184,255,53,0.3)" }}
                    >
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <polyline points="5,14 11,20 23,8" stroke="#B8FF35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#E8E8F0] mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                      Message sent!
                    </h3>
                    <p className="text-[#6B6B80] text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      We will get back to you within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#6B6B80] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                          Name
                        </label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} required />
                      </div>
                      <div>
                        <label className="block text-xs text-[#6B6B80] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                          Email
                        </label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#6B6B80] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                        Subject
                      </label>
                      <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle} required>
                        <option value="" disabled>Select a topic...</option>
                        <option value="article-request">Article request</option>
                        <option value="correction">Correction or feedback</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#6B6B80] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                        Message
                      </label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="What's on your mind?" style={{ ...inputStyle, resize: "none" }} required />
                    </div>

                    {error && (
                      <p className="text-xs text-[#FF6B6B]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {error}
                      </p>
                    )}

                    <button type="submit" className="btn-lime w-full py-3.5 rounded-xl text-sm mt-2" disabled={loading}>
                      {loading ? "Sending..." : "Send Message ->"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      </PageShell>
    </main>
  );
}
