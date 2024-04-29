export const limit = 16

export const formatPrice = (price=0) => {
    if(Number.isFinite(price)) {
        return  price.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    }
    return "Tham số không phải số"
}

export const priceDiscount = (price, discount) => {
    return price - price*(discount/100)
}

export const listColorBC = ['color_4','color_5',
    'color_18','color_13','color_14',
    'color_6','color_21','color_9', 'color_8','color_17',
    'color_28','color_10','color_27',"color_29",'color_11',"color_30",'color_12'
    ,'color_23','color_15','color_1','color_19','color_2',
    'color_20','color_7','color_3','color_22','color_16', 
    'color_24','color_25','color_26'
]
