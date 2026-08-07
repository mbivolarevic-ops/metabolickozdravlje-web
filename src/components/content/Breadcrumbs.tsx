import Link from "next/link";

/**
 * Putanja do trenutne stranice.
 *
 * Poslednja stavka je tekuća stranica i nije link. Renderuje se samo ono što
 * je prosleđeno — nema izmišljenih nivoa.
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Putanja" className="text-sm text-text-muted">
      <ol className="flex list-none flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 && <span aria-hidden="true">›</span>}
            {item.href === undefined ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
