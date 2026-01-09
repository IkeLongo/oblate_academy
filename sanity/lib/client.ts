// sanity/lib/client.ts

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token, isDev } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: isDev ? "drafts" : "published",
  token,
  timeout: 10000, // ✅ 10 seconds (fail fast)
});

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true,              // ✅ CDN for published content
//   perspective: "published",  // ✅ no drafts by default
//   timeout: 10000,     // keep this
// });