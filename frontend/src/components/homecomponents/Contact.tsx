import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // wire this up to your backend endpoint
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-void px-6 py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-violet/20 bg-panel p-10 md:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-violet-soft">
                Get in touch
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">
                Got feedback, or found a bug?
              </h2>
              <p className="mt-4 max-w-sm text-muted">
                We read every message. Tell us what's slowing your semester
                down, and we'll tell you when it's fixed.
              </p>
              <a
                href="mailto:hello@studytracker.app"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-lilac hover:text-violet-soft">
                hello@studytracker.app
                <ArrowUpRight size={16} />
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {sent ? (
                <div className="rounded-xl border border-violet/30 bg-panel2 p-5 text-sm text-lilac">
                  Message sent. We'll reply within a day or two.
                </div>
              ) : (
                <>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-panel2 px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-violet-soft focus:outline-none"
                  />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@university.edu"
                    required
                    className="w-full rounded-xl border border-white/10 bg-panel2 px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-violet-soft focus:outline-none"
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-panel2 px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-violet-soft focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-ink py-3 font-medium text-void transition hover:bg-violet-soft">
                    Send message
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
