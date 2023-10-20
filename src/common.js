export const limit = 16

export const formatPrice = (price) => {
    if(Number.isInteger(price)) {
        return  price.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    }
    return "Tham số không phải số"
}

export const priceDiscount = (price, discount) => {
    return price - price*(discount/100)
}