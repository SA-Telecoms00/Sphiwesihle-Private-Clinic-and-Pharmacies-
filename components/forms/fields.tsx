"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-xl border bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-muted shadow-soft transition-colors focus:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-1";

function errClass(hasError?: boolean) {
  return hasError ? "border-danger focus:border-danger" : "border-border";
}

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
      {required && (
        <span className="text-danger" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs font-medium text-danger">
      {message}
    </p>
  );
}

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  className?: string;
};

export function TextField({
  label,
  name,
  required,
  error,
  className,
  type = "text",
  ...rest
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(fieldBase, errClass(!!error), "mt-1.5")}
        {...rest}
      />
      <FieldError id={errId} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  required,
  error,
  className,
  children,
  ...rest
}: BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    children: React.ReactNode;
  }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(fieldBase, errClass(!!error), "mt-1.5 appearance-none bg-no-repeat")}
        {...rest}
      >
        {children}
      </select>
      <FieldError id={errId} message={error} />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  required,
  error,
  className,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(fieldBase, errClass(!!error), "mt-1.5 min-h-24 resize-y")}
        {...rest}
      />
      <FieldError id={errId} message={error} />
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  required,
  error,
}: BaseProps) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className="mt-1 h-4.5 w-4.5 shrink-0 rounded border-border text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 accent-brand-600"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-ink-soft">
          {label}
          {required && <span className="text-danger" aria-hidden="true"> *</span>}
        </label>
      </div>
      <FieldError id={errId} message={error} />
    </div>
  );
}

/** Hidden honeypot field for spam bots — real users never see/fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
      <label htmlFor="company">Company (leave blank)</label>
      <input
        id="company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
