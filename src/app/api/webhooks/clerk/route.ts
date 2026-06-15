import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "organization.created") {
        const { id, name, slug } = evt.data;
        await prisma.organization.create({
            data: { id, name, slug: slug || id },
        });
    }

    if (eventType === "organizationMembership.created" || eventType === "organizationMembership.updated") {
        const { id, organization, public_user_data, role } = evt.data;

        const userId = public_user_data.user_id;
        const orgId = organization.id;

        const localRole = await prisma.role.findUnique({
            where: { name: role },
        });

        if (!localRole) {
            return NextResponse.json({ error: `Role ${role} belum terdaftar di database lokal` }, { status: 400 });
        }

        await prisma.organizationMembership.upsert({
            where: { id: id },
            update: {
                roleId: localRole.id,
            },
            create: {
                id: id,
                organizationId: orgId,
                userId: userId,
                roleId: localRole.id,
            },
        });
    }

    if (eventType === "organizationMembership.deleted") {
        const { id } = evt.data;
        await prisma.organizationMembership.delete({
            where: { id: id },
        });
    }

    if (eventType === "user.created") {
        const { id, email_addresses } = evt.data;

        if (email_addresses.length > 0) {
            await prisma.userProfile.create({
                data: {
                    id: id,
                    email: email_addresses[0].email_address,
                },
            });
        }
    }

    return NextResponse.json({ success: true });
}