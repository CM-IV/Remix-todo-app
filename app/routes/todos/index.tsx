import { useLoaderData, Link, Form, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action = async ({ request }: any) => {

    const form = await request.formData();

    const title = form.get("title");
    const description = form.get("description");

    const fields = { title, description };

    const todo = await db.todo.create({ data: fields });

    return redirect(`/todos/${todo.id}`);

}

export const loader = async () => {

  const data = {
    todos: await db.todo.findMany({
        take: 25,
        select: {id: true, title: true, createdAt: true},
        orderBy: {createdAt: "desc"}
    })
  }

  return data;

}

function Todos() {
    const { todos } = useLoaderData();

    return (
        <>
            <section className="section">
                <h1 className="title">Todos Page.</h1>
            </section>

            <section className="section">

                <h2 className="subtitle">Todos:</h2>

                {todos.map((todo: Todo) => {

                return (
                    <div className="box" key={todo.id}>
                        <article className="media">
                            <div className="media-content">
                                <div className="content">
                                    <Link to={`${todo.id}`}>
                                        <h2 className="subtitle">{todo.title}</h2>
                                    </Link>
                                    <hr />
                                    <p>{todo.createdAt.toString().split("T")[0]}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                )

                })}
            </section>

            <section className="section">
                <div className="box">
                <h2 className="subtitle">Add a Todo:</h2>
                    <Form method="post">
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                name="title"
                                className="input"
                                type="text"
                                placeholder="Todo Title"
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
                                placeholder="Todo Description"
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

export default Todos