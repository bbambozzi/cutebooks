package com.acme.controller;

import com.acme.entity.Book;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.util.Optional;

@Path("/books")
public class BookController {

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBook(@Valid Book book) {
        Book.persist(book);
        return Response.status(Response.Status.CREATED).entity(book).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response allBooks() {
        return Response
                .status(Response.Status.OK)
                .entity(Book.listAll())
                .build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookById(@PathParam("id") String id) {
        Optional<Book> optionalBook = Book.findByIdOptional(id);
        Book foundBook = optionalBook.orElseThrow(() -> new NotFoundException("Book not found"));
        System.out.println("Found " + optionalBook.get());
        return Response.ok(foundBook).build();
    }

    @PUT
    @Transactional
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBook(@PathParam("id") String id, @Valid Book newBook) {
        Optional<Book> optBook = Book.findByIdOptional(id);
        Book book = optBook.orElseThrow(() -> new NotFoundException("Book not found"));
        book.setAuthor(newBook.getAuthor());
        book.setTitle(newBook.getTitle());
        book.setLikes(newBook.getLikes());
        return Response.ok(book).build();
    }


    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteBookById(@PathParam("id") String id) {
        Book.deleteById(id);
        return Response.noContent().build();
    }

    @POST
    @Transactional
    @Path("/{id}/like")
    @Produces(MediaType.APPLICATION_JSON)
    public Response likeBook(@PathParam("id") String id) {
        Optional<Book> optional = Book.findByIdOptional(id);
        Book book = optional.orElseThrow(() -> new NotFoundException("Book not found"));
        book.setLikes(book.getLikes() + 1);
        return Response.ok(book).build();
    }
}
