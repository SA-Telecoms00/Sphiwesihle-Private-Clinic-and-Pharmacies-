import { Container } from "@/components/ui/container";
import { trustItems } from "@/lib/content";

export function TrustStrip() {
  return (
    <div className="border-y border-border bg-bg">
      <Container className="py-6">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              <span className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-brand-50 text-brand-600">
                <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium leading-tight text-ink-soft">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
