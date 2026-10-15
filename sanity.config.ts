'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import {muxInput} from "sanity-plugin-mux-input";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import { resolve } from '@/sanity/presentation/resolve'
import { initialValueTemplates } from './sanity/templates/initialValueTemplates'
import { HOMEPAGE_FEATURED_RESOURCES_ID } from './sanity/schemaTypes/documents/homepageFeaturedResources'

// Singleton actions that would create, duplicate or remove the document
const SINGLETON_BLOCKED_ACTIONS = new Set(['delete', 'duplicate', 'unpublish'])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schema.types,
    templates: (prev) => [...prev, ...initialValueTemplates],
  },
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === HOMEPAGE_FEATURED_RESOURCES_ID
        ? prev.filter(({ action }) => !(action && SINGLETON_BLOCKED_ACTIONS.has(action)))
        : prev,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((option) => option.templateId !== HOMEPAGE_FEATURED_RESOURCES_ID)
        : prev,
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    muxInput({ mp4_support: "standard" }),
  ],
})
