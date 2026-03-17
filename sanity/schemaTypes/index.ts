// /sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'

import { saint } from "./documents/saint";
import { virtue } from "./documents/virtue";
import { resource } from "./documents/resource";
import { resourceCollection } from "./documents/resourceCollection";
import { category } from './documents/category';
import { resourceGroup } from './documents/resourceGroup';

import { gradeVariant } from "./objects/gradeVariant";
import { actionCard } from "./objects/actionCard";
import { link } from "./objects/link";
import { resourceHubLink } from './objects/resourceHubLink';
import { resourceHubCard } from './objects/resourceHubCard';
import { resourceHub } from './objects/resourceHub';
import { resourcePlacementInline } from './objects/resourcePlacementInline';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [saint, virtue, resource, resourceCollection, resourceGroup, category, gradeVariant, actionCard, link, resourceHubLink, resourceHubCard, resourceHub, resourcePlacementInline],
}
