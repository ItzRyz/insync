import { FormCreateSchedule } from "@/components/schedules/form-create";
import prisma from "@/lib/prisma";
import { ScheduleTemplate } from "@/components/schedules/template";

export const revalidate = 0;

export default async function CreateSchedulesPage() {
    const masterParams = await prisma.masterParam.findMany();

    const categories = masterParams.filter((p) => p.group === "CATEGORY").map(c => ({ code: c.code, name: c.name }));
    const types = masterParams.filter((p) => p.group === "TYPE").map(t => ({ code: t.code, name: t.name }));

    return (
        <ScheduleTemplate title="Create Schedules">
            <FormCreateSchedule categories={categories} types={types} />
        </ScheduleTemplate>
    );
}