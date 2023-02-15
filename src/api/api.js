import axios from 'axios';

const site = 'https://strapi.cleverland.by';

export const getProductCategories = async () => {
    const data = await axios.get(`${site}/api/categories`)
    
    return data.data
}

export const getProducts = async () => {
    const data = await axios.get(`${site}/api/book`)
    
    return data.data
}