// sanity/lib/client.ts

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token, isDev } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation TODO: chnage to true when going live
  token,
  perspective: isDev ? "previewDrafts" : "published",
})