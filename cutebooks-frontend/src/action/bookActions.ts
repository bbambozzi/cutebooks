"use server"

interface Book {
    id: number,
    title: string,
    author: string,
    likes: number,
}

async function getAllBooks(): Promise<Book[]> {
    return await fetch("http://localhost:8080/books", {
        method: "GET",
        cache: "no-cache"
    }).then(ans => ans.json());
}

async function getBookById(id: number): Promise<Book> {
    return await fetch(`http://localhost:8080/books/${id}`, {
        method: "GET"
    }).then(ans => ans.json());
}

async function likeBookById(id: number): Promise<Book> {
    return await fetch(`http://localhost:8080/books/${id}/like`, {
        method: "POST"
    }).then(ans => ans.json());
}

export {getBookById, getAllBooks, likeBookById}