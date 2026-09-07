"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Info, Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-semibold text-slate-900">
          ¡Mensaje enviado!
        </h3>
        <p className="max-w-sm text-sm text-slate-600">
          Gracias por escribirnos, {name || "estimado cliente"}. Un asesor
          revisará tu mensaje y te contactará pronto.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="text-sm font-medium text-slate-700">
            Nombre completo
          </span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "sending"}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none disabled:opacity-60"
            placeholder="Tu nombre"
          />
        </label>
        <label>
          <span className="text-sm font-medium text-slate-700">
            Correo electrónico
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending"}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none disabled:opacity-60"
            placeholder="correo@ejemplo.com"
          />
        </label>
        <label>
          <span className="text-sm font-medium text-slate-700">
            Teléfono <span className="text-slate-400">(opcional)</span>
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === "sending"}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none disabled:opacity-60"
            placeholder="(504) 0000-0000"
          />
        </label>
        <label>
          <span className="text-sm font-medium text-slate-700">Asunto</span>
          <input
            required
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={status === "sending"}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none disabled:opacity-60"
            placeholder="¿En qué podemos ayudarte?"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Mensaje</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "sending"}
          className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none disabled:opacity-60"
          placeholder="Cuéntanos los detalles de tu consulta"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <Send className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="flex items-start gap-1.5 text-xs text-slate-400">
        <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        Este formulario es una demostración y no envía tu mensaje. Para una
        respuesta real, escríbenos por correo o WhatsApp.
      </p>
    </form>
  );
}
