// /sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'

import { saint } from "./documents/saint";
import { virtue } from "./documents/virtue";
import { resource } from "./documents/resource";

import { gradeVariant } from "./objects/gradeVariant";
import { actionCard } from "./objects/actionCard";
import { link } from "./objects/link";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [saint, virtue, resource, gradeVariant, actionCard, link],
}
