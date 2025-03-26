import createApiClient from "./api.service";

class PublisherService {
    constructor(baseUrl = "/api/publishers") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        console.log("📌 Đang xóa nhà xuất bản với ID:", id); // Debugging ID
        return (await this.api.delete(`/${id}`)).data;
    }

    async searchByName(name) {
        return (await this.api.get(`/search?name=${name}`)).data;
    }
}

export default new PublisherService();
