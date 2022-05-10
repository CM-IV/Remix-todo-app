import { Link, useLoaderData, Form, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action = async ({ request, params }: any) => {

    const form = await request.formData();
    const todoId = parseInt(params.todoId);

    const title = form.get("title");
    const description = form.get("description");

    const fields = { title, description };

    const todo = await db.todo.findUnique({
        where: { id: todoId }
    })

    if (!todo) throw new Error("Todo not found!");

    await db.todo.update({ 
        where: { id: todoId },
        data: fields
     });

    return redirect(`/todos/${todoId}`);

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

function EditTodo() {
    const { todo } = useLoaderData();

    return (
        <>
            <section className="section">
                <h1 className="title">Edit a todo</h1>
            </section>

            <section className="section">
            <Link
                to={"/todos"}
                className="button"
            >
                Go Back
            </Link>
            </section>

            <section className="section">
                <div className="box">
                <h2 className="subtitle">Update a Todo:</h2>
                    <Form method="post">
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                name="title"
                                className="input"
                                type="text"
                                defaultValue={todo.title}
                                required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <input
                                name="description"
                                className="input"
                                type="text"
                                defaultValue={todo.description}
                                required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="submitButton">
                                <button className="button is-primary" type="submit">
                                Submit
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default EditTodo
