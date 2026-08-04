import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Small copy-to-clipboard button with a transient "Copied" state.
 *  SSR-safe: renders the idle label on the server, wires clipboard on the client. */
export function CopyButton({
  value,
  label = "Copy",
  className = "btn btn-secondary",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable (insecure context / denied) — no-op */
    }
  }

  return (
    <button type="button" onClick={copy} className={className} data-icon aria-live="polite">
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : label}
    </button>
  );
}
