
import { deleteTask } from '@/actions/task-actions'
import { Button } from '../ui/button'



export function TaskButtonDelete({ taskId }: { taskId: number }) {

    return (
        <form action={deleteTask}>
            <input type="hidden" name="id" value={taskId} />
            <Button variant="destructive">Delete</Button>
        </form>
    )
}


