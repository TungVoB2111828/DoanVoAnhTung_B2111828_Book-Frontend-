<template>
    <div class="container">
        <h2>Quản lý mượn sách</h2>

        <!-- Nút thêm đơn mượn -->
        <button class="btn btn-primary mb-3" @click="addNewBorrow">+ Thêm đơn mượn</button>

        <div class="row">
            <div class="col-md-4">
                <BorrowList :borrows="borrows" v-model:activeIndex="activeIndex" />
            </div>
            <div class="col-md-8">
                <BorrowCard v-if="activeBorrow" :borrow="activeBorrow" />
                <BorrowForm 
                    v-if="activeBorrow || isAdding" 
                    :borrow="activeBorrow || newBorrow" 
                    @submit:borrow="saveBorrow" 
                    @delete:borrow="deleteBorrow" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import BorrowList from "@/components/BorrowList.vue";
import BorrowCard from "@/components/BorrowCard.vue";
import BorrowForm from "@/components/BorrowForm.vue";
import BorrowService from "@/services/borrow.service.js";

export default {
    components: {
        BorrowList,
        BorrowCard,
        BorrowForm,
    },
    data() {
        return {
            borrows: [],
            activeIndex: -1,
            isAdding: false,
            newBorrow: {
                userId: "",
                bookId: "",
                borrowDate: "",
                returnDate: "",
                status: "",
            },
        };
    },
    computed: {
        activeBorrow() {
            return this.activeIndex !== -1 ? this.borrows[this.activeIndex] : null;
        },
    },
    async created() {
        await this.fetchBorrows();
    },
    methods: {
        async fetchBorrows() {
            try {
                this.borrows = await BorrowService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn mượn:", error);
            }
        },
        addNewBorrow() {
            this.isAdding = true;
            this.activeIndex = -1;
        },
        async saveBorrow(borrowData) {
            try {
                if (borrowData._id) {
                    await BorrowService.update(borrowData._id, borrowData);
                } else {
                    await BorrowService.create(borrowData);
                }
                this.isAdding = false;
                await this.fetchBorrows();
            } catch (error) {
                console.error("Lỗi khi lưu đơn mượn:", error);
            }
        },
        async deleteBorrow(borrowId) {
            try {
                await BorrowService.delete(borrowId);
                await this.fetchBorrows();
                this.activeIndex = -1;
                this.isAdding = false;
            } catch (error) {
                console.error("Lỗi khi xóa đơn mượn:", error);
            }
        },
    },
};
</script>