<template>
    <div class="container mt-4">
        <h2>Quản lý Sách</h2>
        <button class="btn btn-primary mb-3" @click="addNewBook">Thêm Sách Mới</button>
        <div class="row">
            <div class="col-md-4">
                <BookList :books="books" v-model:activeIndex="activeIndex" />
            </div>
            <div class="col-md-8">
                <BookCard v-if="activeBook && activeBook.MaSach" :book="activeBook" @deleteBook="deleteBook" />
                <BookForm 
                    v-if="activeBook || isAdding" 
                    :book="activeBook || newBook" 
                    @submit:book="saveBook" 
                    @delete:book="deleteBook" 
                />
            </div>
        </div>
    </div>
</template>

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
            activeIndex: -1,
            isAdding: false,
            newBook: {
                MaSach: "", // Đảm bảo có MaSach trong newBook
                TenSach: "",
                DonGia: 0,
                SoQuyen: 0,
                NamXuatBan: "",
                MaNXB: "",
                NguonGocTacGia: "",
            },
        };
    },
    computed: {
        activeBook() {
            return this.activeIndex !== -1 ? this.books[this.activeIndex] : null;
        },
    },
    async created() {
        await this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            try {
                const booksFromApi = await BookService.getAll();
                this.books = booksFromApi.map(book => ({
                    ...book,
                    MaSach: book.MaSach || book._id, // Đảm bảo luôn có MaSach
                }));
                console.log("📌 Danh sách sách đã tải:", this.books);
            } catch (error) {
                console.error("❌ Lỗi khi tải danh sách sách:", error);
            }
        },
        addNewBook() {
            this.isAdding = true;
            this.activeIndex = -1;
        },
        async saveBook(bookData) {
            try {
                if (bookData.MaSach) {
                    await BookService.update(bookData.MaSach, bookData);
                } else {
                    await BookService.create(bookData);
                }
                this.isAdding = false;
                await this.fetchBooks();
            } catch (error) {
                console.error("❌ Lỗi khi lưu sách:", error);
            }
        },
        async deleteBook(bookId) {
            try {
                if (!bookId) {
                    console.error("❌ Lỗi: ID sách cần xóa không hợp lệ!");
                    return;
                }
                await BookService.delete(bookId);
                await this.fetchBooks();
                this.activeIndex = -1;
                this.isAdding = false;
            } catch (error) {
                console.error("❌ Lỗi khi xóa sách:", error);
            }
        },
    },
};
</script>
