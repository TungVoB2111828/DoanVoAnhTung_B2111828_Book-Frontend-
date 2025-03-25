<script>
import BookList from "@/components/BookList.vue";
import BookCard from "@/components/BookCard.vue";
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookList,
        BookCard,
        BookForm,
    },
    data() {
        return {
            books: [],
            selectedBook: null,
            showForm: false,
        };
    },
    async created() {
        await this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        },
        selectBook(book) {
            this.selectedBook = book;
            this.showForm = false;
        },
        addNewBook() {
            this.selectedBook = null;
            this.showForm = true;
        },
        async saveBook(bookData) {
            try {
                if (bookData._id) {
                    await BookService.update(bookData._id, bookData);
                } else {
                    await BookService.create(bookData);
                }
                await this.fetchBooks();
                this.showForm = false;
            } catch (error) {
                console.error("Error saving book:", error);
            }
        },
        async deleteBook(bookId) {
            try {
                await BookService.delete(bookId);
                await this.fetchBooks();
                this.selectedBook = null;
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    }
};
</script>

<template>
    <div class="container mt-4">
        <h2>Quản lý Sách</h2>
        <button class="btn btn-primary mb-3" @click="addNewBook">Thêm Sách Mới</button>
        <div class="row">
            <div class="col-md-4">
                <BookList :books="books" @selectBook="selectBook" />
            </div>
            <div class="col-md-4">
                <BookCard v-if="selectedBook" :book="selectedBook" @deleteBook="deleteBook" />
            </div>
            <div class="col-md-4">
                <BookForm v-if="showForm || selectedBook" :book="selectedBook || {}" @saveBook="saveBook" />
            </div>
        </div>
    </div>
</template>
