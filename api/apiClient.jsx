class ApiClient {
	constructor() {
		// this.baseURL = "http://127.0.0.1:8000/api/v1/";
		this.baseURL = "https://lichenid.ru/api/v1/";
		this.getFileUrl = "https://lichenid.ru/download/";
		
	}
	
	async request(endpoint, options = {}, uploadMode = false) {
		const url = `${this.baseURL}${endpoint}`;
		const defaultOptions = uploadMode ? { credentials: "include" } : {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: "include"
			};
		
		const response = await fetch(url, { ...defaultOptions, ...options });
		
		if (!response.ok) {
			const error = new Error(`HTTP ${response.status}`);
			error.response = response;
			throw error;
		}
		
		return response.json();
		
	};
	
	
	async downloadObject(objectName, options = {}) {
		const url = `${this.getFileUrl}${objectName}`;
		
		const response = await fetch(url, { ...options });
		
		if (!response.ok) {
			const error = new Error(`HTTP ${response.status}`);
			error.response = response;
			throw error;
		}
		
		return response;
		
	};
	
	
	async getObjectKey (objectName) {
		return this.request(`items/get-key/${objectName}`);
	};
	
	
	async getObjectUrl(objectName) {
		
		const objectKey = await this.getObjectKey(objectName);
		return `${this.getFileUrl}${objectKey}`;
	};
	
	
	async uploadPhoto(file) {
		const formData = new FormData();
		formData.append('photo', file);
		
		return this.request('items/upload-photo', {
			method: 'POST',
			body: formData,
		}, true);
	};
	
	
	async getCollection() {
		const objectName =  await this.request(`items/get-collection`, {
			method: "GET",
		});
		return await this.downloadObject(objectName);
	};
	
	async updateCollection(new_collection) {
		
		const jsonString = JSON.stringify(new_collection);
		const blob = new Blob([jsonString], { type: 'application/json' });
		
		const formData = new FormData();
		formData.append('file', blob, 'collection');
		
		return this.request('items/update-collection', {
			method: 'POST',
			body: formData,
		}, true);
	};
	
	
	async register(data) {
		return this.request('auth/register', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	};
	
	
	async login(data) {
		return this.request('auth/login', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	};
	
	
	async changeEmail(data) {
		return this.request('profile/change-email', {
				method: 'POST',
				body: JSON.stringify(data)
			}
		);
	};
	
	
	async changePassword(data) {
		return this.request('profile/change-password', {
				method: 'POST',
				body: JSON.stringify(data)
			}
		);
	};
	
	
	async logout() {
		return this.request('auth/logout', {
			method: "GET"
		});
	};
	
}

const api = new ApiClient();

export default api;