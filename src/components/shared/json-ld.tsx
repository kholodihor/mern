export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, safe with JSON.stringify of server data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
