import { NextResponse } from "next/server";
import { ghlFetch, GhlApiError, normalizeName } from "@/app/lib/ghl/oblateClient";

export const runtime = "nodejs";
const TARGET_PIPELINE_NAME = "Oblate Academy Community";

type MaybePipeline = {
  id?: string;
  _id?: string;
  name?: string;
  stages?: Array<{ id?: string; _id?: string; name?: string }>;
};

type PipelinesResponse = {
  pipelines?: MaybePipeline[];
  data?: MaybePipeline[] | { pipelines?: MaybePipeline[] };
};

function getPipelineId(pipeline: MaybePipeline): string {
  return pipeline.id || pipeline._id || "";
}

function getStageId(stage: { id?: string; _id?: string }): string {
  return stage.id || stage._id || "";
}

function extractPipelines(payload: PipelinesResponse): MaybePipeline[] {
  if (Array.isArray(payload.pipelines)) return payload.pipelines;
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && Array.isArray(payload.data.pipelines)) return payload.data.pipelines;
  return [];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") || "";

  if (!process.env.DEBUG_SETUP_SECRET) {
    return NextResponse.json(
      { success: false, error: "Missing required env var: DEBUG_SETUP_SECRET" },
      { status: 500 }
    );
  }

  if (!secret || secret !== process.env.DEBUG_SETUP_SECRET) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid or missing secret." },
      { status: 401 }
    );
  }

  const missingEnv = ["GHL_OBLATE_LOCATION_ID", "GHL_OBLATE_API_KEY"].filter(
    (name) => !process.env[name]?.trim()
  );

  if (missingEnv.length > 0) {
    return NextResponse.json(
      { success: false, error: "Missing required environment variables.", missingEnv },
      { status: 500 }
    );
  }

  const locationId = process.env.GHL_OBLATE_LOCATION_ID!.trim();
  try {
    const data = await ghlFetch<PipelinesResponse>(
      `/opportunities/pipelines?locationId=${encodeURIComponent(locationId)}`
    );

    const pipelines = extractPipelines(data);
    if (pipelines.length === 0) {
      return NextResponse.json(
        { success: false, error: "No pipelines returned from GHL for this location." },
        { status: 404 }
      );
    }

    const configuredPipeline = pipelines.find(
      (p) => normalizeName(p.name).toLowerCase() === normalizeName(TARGET_PIPELINE_NAME).toLowerCase()
    );
    if (!configuredPipeline) {
      return NextResponse.json(
        {
          success: false,
          error: "Target pipeline was not found in GHL response.",
          targetPipelineName: TARGET_PIPELINE_NAME,
          availablePipelineNames: pipelines.map((p) => normalizeName(p.name)),
        },
        { status: 404 }
      );
    }

    const stages = (configuredPipeline.stages || []).map((stage) => ({
      id: getStageId(stage),
      name: normalizeName(stage.name),
    }));

    const byName = (name: string) => stages.find((s) => s.name.toLowerCase() === name.toLowerCase())?.id || null;

    const envSuggestions = {
      GHL_OBLATE_STAGE_NEW_INQUIRY_ID: byName("New Inquiry"),
      GHL_OBLATE_STAGE_CONTACTED_ID: byName("Contacted"),
      GHL_OBLATE_STAGE_DONOR_ID: byName("Donor"),
    };

    return NextResponse.json({
      success: true,
      pipeline: {
        id: getPipelineId(configuredPipeline),
        name: normalizeName(configuredPipeline.name),
      },
      stages,
      stageIds: envSuggestions,
      envSuggestions: {
        GHL_OBLATE_LOCATION_ID: locationId,
        GHL_OBLATE_PIPELINE_ID: getPipelineId(configuredPipeline),
        ...envSuggestions,
      },
    });
  } catch (error) {
    if (error instanceof GhlApiError) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch pipelines from GHL.",
          status: error.status,
          details: error.details,
        },
        { status: 502 }
      );
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: "Unexpected server error.", details: message },
      { status: 500 }
    );
  }
}
