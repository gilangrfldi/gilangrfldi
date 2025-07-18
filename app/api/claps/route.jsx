import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const clapCount = await kv.get("portfolio-claps");
        return NextResponse.json({ count: clapCount || 0 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch claps" }, { status: 500 });
    }
}

export async function POST() {
    try {
        const newClapCount = await kv.incr("portfolio-claps");
        return NextResponse.json({ count: newClapCount });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update claps" }, { status: 500 });
    }
}
