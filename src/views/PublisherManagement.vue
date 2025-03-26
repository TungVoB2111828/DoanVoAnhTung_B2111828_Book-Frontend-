<template>
    <div class="container">
        <h2>Quản lý Nhà Xuất Bản</h2>

        <!-- Nút Thêm Nhà Xuất Bản -->
        <div class="mb-3">
            <button class="btn btn-success" @click="addPublisher">Thêm Nhà Xuất Bản</button>
        </div>

        <div class="row">
            <div class="col-md-4">
                <PublisherList :publishers="publishers" v-model:activeIndex="activeIndex" />
            </div>
            <div class="col-md-8">
                <PublisherCard v-if="activePublisher && activePublisher.MaNXB" 
                    :publisher="activePublisher" 
                    @deletePublisher="deletePublisher"
                />
                <PublisherForm 
                    v-if="activePublisher || isAdding"
                    :publisher="activePublisher || newPublisher"
                    @submit:publisher="savePublisher"
                    @delete:publisher="deletePublisher"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PublisherList from "@/components/PublisherList.vue";
import PublisherCard from "@/components/PublisherCard.vue";
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service.js";

export default {
    components: {
        PublisherList,
        PublisherCard,
        PublisherForm,
    },
    data() {
        return {
            publishers: [],
            activeIndex: -1,
            isAdding: false,
            newPublisher: {
                MaNXB: "", // Đảm bảo có MaNXB
                TenNXB: "",
                DiaChi: "",
                Email: "",
                SoDienThoai: "",
            },
        };
    },
    computed: {
        activePublisher() {
            return this.activeIndex !== -1 ? this.publishers[this.activeIndex] : null;
        },
    },
    async created() {
        await this.fetchPublishers();
    },
    methods: {
        async fetchPublishers() {
            try {
                const publishersFromApi = await PublisherService.getAll();
                this.publishers = publishersFromApi.map(publisher => ({
                    ...publisher,
                    MaNXB: publisher.MaNXB || publisher._id, // Đảm bảo MaNXB luôn có giá trị
                }));
                console.log("📌 Danh sách nhà xuất bản đã tải:", this.publishers);
            } catch (error) {
                console.error("❌ Lỗi khi tải danh sách nhà xuất bản:", error);
            }
        },
        addPublisher() {
            this.isAdding = true;
            this.activeIndex = -1;
        },
        async savePublisher(publisherData) {
            console.log("📌 Đang lưu nhà xuất bản với _id:", publisherData._id);  // Kiểm tra _id
            try {
                if (publisherData._id) {
                    // Gọi API với _id là định danh duy nhất
                    await PublisherService.update(publisherData._id, publisherData);
                } else {
                    // Gọi API tạo mới nhà xuất bản
                    await PublisherService.create(publisherData);
                }
                this.isAdding = false;
                await this.fetchPublishers(); // Tải lại danh sách nhà xuất bản sau khi lưu
            } catch (error) {
                console.error("❌ Lỗi khi lưu nhà xuất bản:", error);
            }
        },

        async deletePublisher(publisherId) {
            console.log("📌 Đang xóa nhà xuất bản với ID:", publisherId); // Ghi log ID
            try {
                if (!publisherId) {
                    console.error("❌ Lỗi: ID nhà xuất bản cần xóa không hợp lệ!");
                    return;
                }
                await PublisherService.delete(publisherId); // Gọi API với publisherId là _id
                this.publishers = this.publishers.filter(publisher => publisher._id !== publisherId); // Loại bỏ nhà xuất bản sau khi xóa
                console.log("🗑️ Nhà xuất bản đã bị xóa!");
                this.activeIndex = -1;
                this.isAdding = false;
            } catch (error) {
                console.error("❌ Lỗi khi xóa nhà xuất bản:", error);
            }
        }
    },
};
</script>
