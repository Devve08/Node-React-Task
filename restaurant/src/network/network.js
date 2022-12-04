import axios from "axios";

const BaseURL = "http://localhost:8000/api/";

export const createCategory = data => {
  const res = new Promise((resolve, reject) => {
    axios
      .post(`${BaseURL}categories`, data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const getCategories = () => {
  const res = new Promise((resolve, reject) => {
    axios
      .get(`${BaseURL}categories`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const deleteCategory = id => {
  const res = new Promise((resolve, reject) => {
    axios
      .delete(`${BaseURL}categories/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const getCategoryItems = () => {
  const res = new Promise((resolve, reject) => {
    axios
      .get(`${BaseURL}items`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const deleteCategoryItem = id => {
  const res = new Promise((resolve, reject) => {
    axios
      .delete(`${BaseURL}items/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const updateCategory = (id, data) => {
  const res = new Promise((resolve, reject) => {
    axios
      .patch(`${BaseURL}categories/${id}`, data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const getSingleCategory = (id) => {
  const res = new Promise((resolve, reject) => {
    axios
      .get(`${BaseURL}categories/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const updateItem = (id, categoryItem) => {
  const formData = new FormData();
  if (categoryItem?.file) {
    formData.append("file", categoryItem?.file);
  }
  formData.append("title", categoryItem?.title);
  formData.append("description", categoryItem?.description);
  formData.append("price", categoryItem?.price);
  formData.append("categoryId", categoryItem?.categoryId);
  const res = new Promise((resolve, reject) => {
    axios
      .patch(`${BaseURL}items/${id}`, formData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const getSingleItem = (id) => {
  const res = new Promise((resolve, reject) => {
    axios
      .get(`${BaseURL}items/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};


export const createCategoryItem = categoryItem => {
  const formData = new FormData();
  if (categoryItem?.file) {
    formData.append("file", categoryItem?.file);
  }
  formData.append("title", categoryItem?.title);
  formData.append("description", categoryItem?.description);
  formData.append("price", categoryItem?.price);
  formData.append("categoryId", categoryItem?.categoryId);
  const res = new Promise((resolve, reject) => {
    axios
      .post(`${BaseURL}items`, formData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};
