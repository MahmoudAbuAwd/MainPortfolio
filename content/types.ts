/** A single entry in the Resources library (`app/resources/page.tsx`). */
export interface Resource {
  /** Group heading the resource is listed under, e.g. "MLOps". */
  category: string
  /** Display title of the resource. */
  title: string
  /** Short one-line summary shown on the card. */
  description: string
  /** Destination — an external URL or a path to a hosted PDF. */
  url: string
  /** Controls the card icon/label: a downloadable document vs. an external link. */
  type: "pdf" | "link"
}
