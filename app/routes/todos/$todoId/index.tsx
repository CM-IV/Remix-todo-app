import { Link, useLoaderData, Form, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action = async ({ request, params }: any) => {

    const form = await request.formData();
    const todoId = parseInt(params.todoId);

    if (form.get("_method") === "delete") {

        const todo = await db.todo.findUnique({
            where: { id: todoId }
        })

        if (!todo) throw new Error("Todo not found!")

        await db.todo.delete({ where: { id: todoId } });

        return redirect("/todos")
    }

}

export const loader = async ({ params }: any) => {

    const todoId: number = parseInt(params.todoId);

    const todo = await db.todo.findUnique({
        where: { id: todoId }
    })

    if(!todo) throw new Error("Todo not found!");

    const data = { todo };

    return data;
    
}


function TodoInfo() {
    const { todo } = useLoaderData();

    return (
        <>
            <section className="section">
                <h1 className="title">{todo.title}</h1>
                <p className="subtitle">{todo.description}</p>
                <Form method="post">
                    <input type="hidden" name="_method" value="delete" />
                    <button className="button is-danger">Delete</button>
                </Form>
            </section>
            <section className="section">
                <div className="level">
                    <div className="level-item">
                    <Link
                    to={`/todos/${todo.id}/edit`}
                    className="button"
                    >
                        Edit
                    </Link>
                    <Link
                        to={"/todos"}
                        className="button"
                    >
                        Go Back
                    </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TodoInfo
