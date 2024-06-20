import SingleBook from "@/ui/SingleBook";
import {getAllBooks, getBookById} from "@/action/bookActions";

export default async function Home() {
    const books = await getAllBooks();
    return (
        <div className="flex flex-col items-center justify-center p-16 gap-4">
            <h1 className="text-4xl">Cutebooks</h1>
            {books.map((book, idx) => {
                return (<SingleBook
                    key={idx}
                    title={book.title}
                    author={book.author}
                    likes={book.likes}
                    id={book.id}/>)
            })}
        </div>
    );
}
