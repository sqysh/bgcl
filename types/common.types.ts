export interface PageField {
  id: string // Unique identifier
  section: string // Which section it belongs to (for grouping)
  label: string // Display name
  value: string | string[] // The actual content
  type: 'boolean' | 'text' | 'textarea' | 'url' | 'array' | 'image'
}

/**
 * Standard server action return shape used across the studio.
 */
export type ActionResult<T = void> =
  | (void extends T ? { success: true; data?: undefined } : { success: true; data: T })
  | { success: false; error: string }
