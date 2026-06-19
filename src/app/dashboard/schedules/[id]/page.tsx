import { notFound } from "next/navigation";
import { FormUpdateSchedule } from "@/components/schedules/form-update";
import prisma from "@/lib/prisma";
import { ScheduleTemplate } from "@/components/schedules/template";

export const revalidate = 0;

export default async function UpdateSchedulePage({ params }: { params: { id?: string } }) {
    const { id } = await params;
    if (!id) {
        notFound();
    }
    const schedule = await prisma.schedule.findUnique({
        where: { id },
        include: { type: true, category: true, status: true },
    });
    if (!schedule) {
        notFound();
    }
    const masterParams = await prisma.masterParam.findMany();
    const categories = masterParams
        .filter((p) => p.group === "CATEGORY")
        .map((c) => ({ code: c.code, name: c.name }));
    const types = masterParams
        .filter((p) => p.group === "TYPE")
        .map((t) => ({ code: t.code, name: t.name }));

    return (
        <ScheduleTemplate title="Update Schedule">
            <FormUpdateSchedule
                schedule={schedule}
                categories={categories}
                types={types}
            />
        </ScheduleTemplate>
    );
}
