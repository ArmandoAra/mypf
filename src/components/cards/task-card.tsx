import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

import { Task } from "@prisma/client";
import { TaskButtonDelete } from "../buttons/task-button-delete";
import Link from "next/link";



const TaskCard = ({ task }: { task: Task }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{task.name}</CardTitle>
                <Badge className={clsx({
                    "bg-red-900": task.priority === "urgent",
                    "bg-red-400": task.priority === "high",
                    "bg-yellow-500": task.priority === "medium",
                    "bg-green-500": task.priority === "low",
                })}>{task.priority}</Badge>
                <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{task.priority}</p>
                <p>{new Date(task.createdAt).toLocaleDateString()}</p>
            </CardContent>

            <CardFooter className="flex gap-x-4">
                <TaskButtonDelete taskId={task.id} />
                <Link href={`/task/${task.id}/edit/`}>
                    <Button variant="secondary">Edit</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TaskCard
