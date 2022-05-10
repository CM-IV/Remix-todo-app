/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />


interface Todo {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}