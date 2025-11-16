"use client";

import { ComponentPreview } from "./component-preview";

// Component example preview - dynamically renders example code
export function ComponentExamplePreview({
  code,
  slug,
}: {
  code: string;
  slug: string;
}) {
  // For now, return the basic component preview
  // In a full implementation, you'd parse and render the example code
  return <ComponentPreview slug={slug} />;
}
