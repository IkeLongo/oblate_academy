export const initialValueTemplates = [
  {
    id: "resourceGroupInCollection",
    title: "Resource Group (in Collection)",
    schemaType: "resourceGroup",
    parameters: [{ name: "collectionId", type: "string" }],
    value: ({ collectionId }: { collectionId: string }) => ({
      collection: { _type: "reference", _ref: collectionId },
      isActive: true,
    }),
  },
];
