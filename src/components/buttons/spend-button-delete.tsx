
import { Button } from '../ui/button'
import { deleteSpend } from '@/actions/spend-actions'


function SpendButtonDelete({ spendId, year, month }: { spendId: number, year: string, month: string }) {

    return (
        <form action={deleteSpend}>
            <input type="hidden" name="id" value={spendId} />
            <input type="hidden" name="year" value={year} />
            <input type="hidden" name="month" value={month} />
            <Button variant="destructive">Delete</Button>
        </form>
    )
}

export default SpendButtonDelete;

