import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import SelectActive from '../../components/SelectActive';
import Slider from '../../components/Slider';
import styles from './DetailProduct.module.scss'
import { toast } from 'react-toastify';
import axios from 'axios';
import {priceDiscount, formatPrice} from "../../common"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp, faDeleteLeft, faEllipsisVertical, faFloppyDisk, faHeart as faHeartSolid, faPen, faPenToSquare, faSpinner, faXmark, faStar as starPick  } from '@fortawesome/free-solid-svg-icons';
import { HashLoader } from 'react-spinners';
import { createAxios } from '../../createInstance';

///////////////////////
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Carousel_v2 from '../../components/Carousel_v2';
import { CartContext } from '../../App';
import AvatarAuto from '../../components/AvatarAuto';
import Tippy from '@tippyjs/react';
// import { CartContext } from '../../components/Layout/HeaderOnly';

// import required modules
/////////////////////////

const cx = classNames.bind(styles)
const axiosJWT = createAxios()

// khi component có prop "product_prop" thì dùng component này để quick view(xem nhanh)
function DetailProduct_v2({product_prop={}}) {

    // context được tạo ở file App.js (mục đích tăng số lượng hiển thị giỏ hàng)
    const cart_context = useContext(CartContext);

    let infor_user = JSON.parse(localStorage.getItem("tokens"))

    const sizeValues = ['36', '37', '38', '39', '40', '41', '42', '43']
    const [product, setProduct] = useState(product_prop)
    const [trigger, setTrigger] = useState(false)


    const [imgMain, setImgMain] = useState("")

    const [showWanr, setShowWanr] = useState(false)
    const [showRefun, setShowRefun] = useState(false)

    
    const [quantity_Order, setQuantity_Order] = useState(1)
   

    

    // const [size_Order, setSize_Order] = useState(sizeValues[0])
    const [size_Order, setSize_Order] = useState("")
    

    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')

    let isQuickView = Object.keys(product_prop).length
    useEffect(() => {
        if(!isQuickView) {
            axios.get(process.env.REACT_APP_BACKEND_URL+"/shoes/"+paramToObject._id)
            .then(res => {
                setProduct(res.data)
                setImgMain(res.data.img)
            })
        }
        else {
            setImgMain(product_prop.img)
        }
        // console.log(paramToObject)


    }, [trigger])

    const addCart = (id_product) => {
        let productAdd = {
            id: id_product,
            size: size_Order,
            quantity: quantity_Order
        }

        if(!Boolean(localStorage.getItem('cart'))) {
            localStorage.setItem('cart', JSON.stringify([]))
        }

        // product in cart
        let product_list = JSON.parse(localStorage.getItem('cart'))

        // TÌM INDEX CỦA SẢN PHẨM ĐÓ MÀ CÙNG SIZE ĐÃ TỒN TẠI TRONG CART
        let indexProd = product_list?.findIndex(i => { return i.id + i.size=== productAdd.id + productAdd.size})
        
        let newCart = []
        if(indexProd !== -1) {
            // THÊM SỐ LƯỢNG VÀO SẢN PHẨM MÀ ĐÃ TỒN TẠI TRONG CART
            product_list[indexProd] = {...product_list[indexProd], quantity:product_list[indexProd].quantity+quantity_Order}
            console.log(product_list[indexProd])
            newCart = product_list
        }
        else {
            newCart = [...product_list, productAdd]
        }

        localStorage.setItem('cart', JSON.stringify(newCart));
        // console.log(JSON.parse(product_list))

    }

    const size_quantiry_select = product?.inventory?.find(i => i.size === size_Order)?.quantity
    
    let user = JSON.parse(localStorage.getItem('tokens')) || {}

     //comments
     const [comments, setComments] = useState([]);
     useEffect(() =>{
       
        axios.get(process.env.REACT_APP_BACKEND_URL+`/comments?_productId=${paramToObject._id}`)
        .then((res)=> {
            setComments(res.data)
            setLoading(false)

            if(comments.length === 0) {
                setShowAddComment(true)
            }
           
        })
}, [trigger])

    //option comment
    const [showoption, setShowoption] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [addCommentBtn, setAddCommentBtn] = useState(false);
    const [saveBtn, setSaveBtn] = useState(true);
    const [valuecomment, setValuecomment] = useState('');
    const [valueAddcomment, setAddValuecomment] = useState('');
    const [admitComment, setAdmitComment] = useState({})
    const [idcomment, setIdcomment] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showAddComment, setShowAddComment] = useState(true);
    const refinput = useRef();
    const refAddComment = useRef();

    const handleShowOption = ((idcmt)=> {
       
        // setShowoption(prev => !prev)
       
       comments.filter((i) => {
        if(i.accName === user.accName && i.comment_id === idcmt) {
            
            setValuecomment( i.value)
            setIdcomment(idcmt);
           setShowoption(prev => !prev)
          


          
        }
        else if (i.accName === user.accName && i.comment_id !== idcmt) {
            setIdcomment(idcmt);
            setValuecomment(i.value)
            setShowInput(false)
        }
       })
        console.log(idcmt)
    })

    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND_URL + `/checkPermitCmt`, {
        product_id: paramToObject._id,
        accName: user.accName
    }) 
    .then((res) => {
       console.log(res.data)
       setAdmitComment(res.data)
    })
    }, [paramToObject._id])

    const  handleChangeComment = ((id_cmt) => {

        // console.log(id_cmt);
        setShowoption(false);
       
      comments.filter(item => {
           if( item.accName == user.accName && item.comment_id == id_cmt)
         {
             setShowInput(prev => !prev)
             setValuecomment(item.value)
         }
      }
    )
    })

    const handleDeleteComment = ((idcomment) => {
        setShowoption(false)

        axios.delete(process.env.REACT_APP_BACKEND_URL+`/comments/${idcomment}`)

        .then((res) => {

            setTrigger(prev => !prev)
         

        
 
        })
        .then(() => {
            setAddValuecomment('')
           
            let currentLength = comments.length - 2
            if(currentLength <= 0) {
                 setShowAddComment(true)
            }
     
            console.log(currentLength)
        })
        .catch((error) => {
            console.error(error)
        });
       
    });

    const handleCloseInput = (() => {
        setShowInput(false)
    })

    const handleOnchange= (() => {   
     setValuecomment(refinput.current.value)
    }) 

    useEffect(() => {
        if(valuecomment == '') {

            setSaveBtn(false)
        }
        else {
            setSaveBtn(true)
        }
        
    },[valuecomment])

    const handleOnchageAddComment = (() => {
        setAddCommentBtn(true)
        setAddValuecomment(refAddComment.current.value)
    });

    const handleAddComment = (() =>  {
    
        axios.post(process.env.REACT_APP_BACKEND_URL + `/comments`, {
              value: refAddComment.current.value,
              product_id: paramToObject._id,
              accName: user.accName
        })

        .then((res) => {
            setTrigger(prev => !prev)
            refAddComment.current.focus();   
            if(comments.length > 0) {
                setShowAddComment(prev => !prev)
            }
           
        })
    
        .catch((error) => {
                 console.log(error)
        })
    })

    useEffect(()=> {
        if (valueAddcomment == '') {
            setAddCommentBtn(false)
            }
    }, [valueAddcomment]);
   
    const handleSaveComment = ((idcomment) => {
        setLoading(true)
        refinput.current.focus();
       
        axios.patch(process.env.REACT_APP_BACKEND_URL + `/comments/${idcomment}`, {
            value: valuecomment
        })
        .then(()=> {
            // console.log(idcomment)
            setTrigger(prev => !prev)
            setLoading(false)
        })
    });
   
    return (
        <div >
           
            <div className={cx("container")}>
            {
                !isQuickView &&
                <div className={cx("container_rounter")}>
                    <ul className={cx("rounter")}>
                        <li><a href="#">Home</a></li>
                        <span> &#62; </span>
                        <li><a href="#">Shoes</a></li>
                        <span> &#62; </span>
                        <li><a href="#"><strong>{product.name}</strong></a></li>
                    </ul>
                </div>
            }

                <div className={cx("row")}>
                    <div className={cx("row_grp1")}>
                    {
                        product.img ?
                        <div className={cx("container_imgs_shoe")}>
                            <div className={cx("img_main")}>
                                <img className={cx(["shoe_img", {"shadow":imgMain===product.img, "quick_view":isQuickView}])} src={process.env.REACT_APP_BACKEND_URL+`/imgs/${imgMain}`} alt="shoe image"/>
                            </div>

                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#333',
                                    '--swiper-pagination-color': '#333',
                                }}
                                modules={[Pagination, Navigation]}
                                navigation={true}
                                slidesPerView={3}
                                spaceBetween={5}
                                pagination={{
                                    clickable: true,
                                }}
                                className="mySwiper"

                                // breakpoints={{
                                //     0:{slidesPerView:1},
                                //     400:{slidesPerView:2},
                                //     639:{slidesPerView:3},
                                //     865:{slidesPerView:4},
                                //     1000:{slidesPerView:5},
                                //     1500:{slidesPerView:6},
                                //     1700:{slidesPerView:7}
                                // }}


                            >
                            {
                                [product.img,...product?.imgs]?.map(img => (

                                    <SwiperSlide key={img}>
                                        <img 
                                            onClick={() => setImgMain(img)}
                                            className={cx("img_sub_slide")} src={process.env.REACT_APP_BACKEND_URL+`/imgs/${img}`} alt="shoe image"
                                        />

                                    </SwiperSlide>
                                ))
                            }
                            </Swiper>
                        </div>
                        :
                         <div style={{ textAlign: '-webkit-center' }}>
                            <HashLoader
                                color="rgba(138, 138, 138, 1)"
                                size={280}
                            />          
                        </div> 

                    }
                        

                       
                    </div>

                    <div className={cx("row_grp2")}>
                        <div className={cx("container_details_shoe")}>
                            <div className={cx("information_product")}>
                                <p className={cx("shoe_name")}
                                >{product.name}</p>
                                <div className={cx("status")} style={{margin: "13px 0px"}}>
                                    <p className={cx("id")}>Mã sản phẩm: <strong>{product.id}</strong></p>
                                    <p className={cx("avalable")}>Tình trạng: <strong>Còn hàng</strong></p>

                                </div>
                                {
                                    !!product.price && 
                                    (
                                        product?.discount_id ?
                                        <>
                                            <p className={cx("shoe_price_old")}>{formatPrice(product.price)}</p>
                                            <p className={cx("shoe_price")}>{formatPrice(priceDiscount(product?.price, product?.discount_id))}</p>
                                            <span className={cx("discount_tag")}>-{product.discount_id}%</span>
                                        </>
                                        :
                                        <p className={cx("shoe_price")}>{formatPrice(product.price)}</p>
                                    )
                                    
                                }

                                {/* <p className={cx("shoe_price")}>{product.price}</p> */}
                            
                            </div>

                        {
                            !isQuickView && 
                            <>
                                <div className={cx(["line"])}></div>
                                <div id="description_shoes"><p className={cx("description")}>{product.description}</p></div>
                            </>
                        }

                            <div className={cx("line")}></div>
                            <div className={cx("option", {"quick_view":isQuickView})}>
                                <div className={cx("size_product")}>
                                    <p className={cx(["select","m-0"])}>Size: </p>
                                    <ul className={cx("button_size")}>
                                        <SelectActive>
                                        {
                                            // sizeValues
                                            product?.inventory?.map(i=>i.size)?.map((item, index) => {
                                                let quantitySize_select = product?.inventory?.find(i => i.size===item)

                                                return (
                                                    Number(quantitySize_select?.quantity) ?
                                                    <span key={index}
                                                        className={cx("btn_size")}
                                                        onClick={() => {
                                                            // console.log(quantitySize_select)
                                                            setSize_Order(item)
                                                        }}
                                                    >
                                                        {item}
                                                    </span>
                                                    :
                                                    <span noActive key={index} className={cx(["btn_size", "noActive"])} onClick={() => {}}><span>x</span></span>
                                                )
                                                

                                            })
                                        }
                                        </SelectActive>
                                    </ul>
                                </div>
                                <div className={cx("quantity_product")}>
                                    <p className={cx(["quantity", "m-0"])}>Số Lượng: </p>
                                    <div className={cx("wrapper")}>
                                        <span className={cx("minus")}
                                            onClick={() => {
                                                setQuantity_Order(pre => 
                                                    Boolean(pre===1) ? pre : pre-1
                                                )
                                            }}
                                        >-</span>
                                        <span className={cx("num")}>{quantity_Order}</span>
                                        <span className={cx("plus")}
                                            onClick={() => {
                                                setQuantity_Order(pre => {
                                                    
                                                    if(pre+1>size_quantiry_select) {
                                                        alert(`Không thể tăng thêm vì chỉ còn ${size_quantiry_select} sản phẩm của size này`)
                                                    }
                                                    return pre<size_quantiry_select ? pre+1 : pre

                                                })
                                                // console.log(product.inventory.find(i => i.size === size_Order))
                                            }}
                                        >+</span>
                                    </div>

                                    <p className={cx("quantity_availabel")}>{product?.inventory?.find(i => i.size === size_Order)?.quantity} sản phẩm sẵn có</p>
                                    <p className={cx("mess_quantity_prod")}>{size_quantiry_select < quantity_Order ? `Size của sản phẩm này không đủ số lượng mà bạn cần. Hiện có ${product?.inventory?.find(i => i.size === size_Order).quantity} sản phẩm` : ""}</p>
                                </div>
                            </div>

                            <div id="btn_grp">
                                {/* <div className={cx("buy_btn_grp")}>
                                    <button className={cx("buy")}>MUA HÀNG</button>
                                </div> */}
                            {
                                !isQuickView &&
                                <div className={cx("buy_btn_grp")}>
                                    <button className={cx("buy")}
                                        onClick={() => {
                                            const user = JSON.parse(localStorage.getItem("tokens"));
                                            axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+"/favorite_list/"+user.accName,{product_id:product.id}, {
                                                headers: {Authorization: infor_user.accessToken}
                                            })
                                            .then(res => {
                                                setTrigger(pre => !pre)
                                                localStorage.setItem("tokens", JSON.stringify({...user, favorite:res.data}))
                                            })
                                        }}
                                    >
                                        YÊU THÍCH {user?.favorite?.includes(product?.id) ?<FontAwesomeIcon icon={faHeartSolid}/>:<FontAwesomeIcon icon={faHeart}/>}
                                    </button>
                                </div>
                            }
                
                                <div className={cx("add_btn_grp")}
                                    onClick={() =>{
                                        if(size_quantiry_select<quantity_Order) {
                                            toast.error("Sản phẩm không đủ số lượng", {
                                                autoClose: 2000,
                                                // theme: "colored",
                                                theme: "light",
                                                position: "bottom-right",
                                            })
                                        }
                                        else if(size_Order) {
                                            addCart(product.id)
                                            cart_context.setCart_context(pre => !pre)
                                            toast.success("Đã thêm vào gỏi hàng", {
                                                autoClose: 2000,
                                                theme: "colored",
                                                position: "bottom-right",
                                            })
                                        }
                                        else {
                                            toast.error("Vui lòng chọn size", {
                                                autoClose: 2000,
                                                theme: "colored",
                                                position: "bottom-right",
                                            })
                                        }
                                       
                                    }}

                                >
                                    <button className={cx("add")}>THÊM VÀO GIỎ HÀNG</button>
                                </div>

                            {
                                !isQuickView && 
                                <>
                                    <div className={cx(["line"])}></div>
                                    <div className={cx(["policy","policy_refund"])}>

                                        <h2 className={cx({"active_policy":showRefun})} onClick={() => {setShowRefun(pre => !pre)}}>
                                            QUY ĐỊNH ĐỔI SẢN PHẨM
                                        {
                                            showRefun ? <FontAwesomeIcon icon={faChevronDown}/> : <FontAwesomeIcon icon={faChevronUp}/>
                                        }
                                        </h2>
                                    {
                                        showRefun &&
                                        <ul >
                                            <li>Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ trước khi quyết định.</li>
                                            <li>Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng là 07 ngày, kể từ ngày mua. Đổi sản phẩm khi mua online là 14 ngày, kể từ ngày nhận hàng.</li>
                                            <li>Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn nguyên tem, hộp, nhãn mác.</li>
                                            <li>Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không giặt tẩy, bám bẩn, biến dạng.</li>
                                            <li>
                                                Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường hợp sản phẩm hết size cần đổi, bạn có thể đổi sang 01 sản phẩm khác:
                                                <br/>- Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị cao hơn, bạn sẽ cần bù khoảng chênh lệch tại thời điểm đổi (nếu có).
                                                <br/>- Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn, chúng tôi sẽ không hoàn lại tiền.
                                            </li>
                                            <li>Trong trường hợp sản phẩm - size bạn muốn đổi không còn hàng trong hệ thống. Vui lòng chọn sản phẩm khác.</li>
                                            <li>Không hoàn trả bằng tiền mặt dù bất cứ trong trường hợp nào. Mong bạn thông cảm.</li>
                                        </ul>
                                    }
                                    
                                    </div>

                                    <div className={cx(["line"])}></div>

                                    <div className={cx("policy")}>
                                        <h2 className={cx({"active_policy":showWanr})} onClick={() => {setShowWanr(pre => !pre)}}>BẢO HÀNH THẾ NÀO ?
                                        {
                                            showWanr ? <FontAwesomeIcon icon={faChevronDown}/> : <FontAwesomeIcon icon={faChevronUp}/>
                                        }

                                        </h2>
                                    {
                                        showWanr &&
                                        <p>
                                            Mỗi đôi giày trước khi xuất xưởng đều trải qua nhiều khâu kiểm tra. Tuy vậy, trong quá trình sử dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, đứt chỉ may,...trong thời gian 6 tháng từ ngày mua hàng, mong bạn sớm gửi sản phẩm nhằm giúp chúng tôi có cơ hội phục vụ bạn tốt hơn. Vui lòng gửi sản phẩm về bất kỳ cửa hàng Ananas nào, hoặc gửi đến trung tâm bảo hành ngay trong trung tâm TP.ĐN trong giờ hành chính:
                                            Địa chỉ: 01 ABC, P.Thanh Bình, Q.Hải Châu , TP. Đà Nẵng.
                                            Hotline: 077 721 6047
                                        </p>
                                    }
                                    
                                    </div>

                                </>
                                
                            }
                                   
                            </div>
                        </div>
                    </div>
                </div>

            {
                !isQuickView && 
                <>
                {
                    product.imgs && <Slider imgs={product?.imgs}/>
                }
                    <div className={cx("line")}></div>
                    <img className={cx('choose_size')} src={require('../../imgData/howto.png')} alt="shoe image"/>
                    <img className={cx('choose_size')} src={require('../../imgData/chart_size.png')} alt="shoe image"/>

                    {comments.length !==0 ? <div className={cx("comments")}> 
                   <p><strong> ĐÁNH GIÁ SẢN PHẨM:</strong> </p>
                   {admitComment.status == true && showAddComment &&
                   <div className={cx('comments_add-comment')}>
                    { <input value={valueAddcomment} ref={refAddComment} onChange={handleOnchageAddComment}/>}
                    { addCommentBtn  && <button onClick={handleAddComment} className={cx('comments_add-comment-btn')} ><FontAwesomeIcon icon={faPenToSquare}/></button>}
                    </div>}
                {
                    comments.map(i =>
                     (<div className={cx('comment-item')} key={i.id}>
                       <div className={cx('comment-item_info-user-comment')}>
                        <div className={cx('comment-item_info-user-comment_avatar-name')}>
                            <AvatarAuto nameU={i.fullName}/>

                            <div className={cx('wrapper_star-name')}>
                                <p className={cx('name')}> {i.fullName} </p>

                                { i.rating == 0  && <div className={cx('wrapper-star')}>
                                <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                                <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                                <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                                <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                                <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              </div>}
                              { i.rating == 1  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              
                              </div>}
                              {i.rating == 2  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              </div>}

                              { i.rating == 3  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              </div>}

                              { i.rating == 4  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={faStar} />
                              </div>}

                              { i.rating == 5  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              </div>}

                        </div>

                         </div>

                       </div>
                       
                     <div className={cx('comment-item_date-comment')}>
                            <p className={cx('comment-item_info-user-comment_comment-date_date')}> {i.date} 
                            
                           {user.accName==i.accName && 
                           <Tippy
                           visible={showoption}
                           placement='right'
                           interactive={true}
                           zIndex={0}
                           render={attrs => ( showoption && i.comment_id == idcomment &&
                             <div className={cx('option')} tabIndex="-1" {...attrs}>
                              <button onClick={ () => handleChangeComment(i.comment_id)
                            }
                            
                            ><FontAwesomeIcon icon={faPen}/></button>
                              <button onClick={() =>handleDeleteComment(i.comment_id)}><FontAwesomeIcon icon={faDeleteLeft}/></button>

                             </div>
                           )}
                         >
                           <button onClick={ () =>  handleShowOption(i.comment_id)
                           
                        } className={cx('btn-option')}><FontAwesomeIcon icon={faEllipsisVertical}/>
                         </button>
                         </Tippy>
                           }
                          
                            </p>
                        
                                {!showInput && <p className={cx('comment-item_info-user-comment_date-coment-comment')}> {i.value} </p>}
                                {showInput && i.comment_id!==idcomment && <p className={cx('comment-item_info-user-comment_date-coment-comment')}> {i.value} </p> }
                                {showInput && user.accName==i.accName &&  i.comment_id == idcomment &&  
                                <div style={{display:'flex', flexDirection:'column'}}>{<input  onChange={handleOnchange} ref={refinput} value={valuecomment}/>}
                               <div className={cx('wrapper-btn-input')}> {!loading && saveBtn &&<button onClick={ ()=>handleSaveComment(i.comment_id)} className={cx('btn-save')}><FontAwesomeIcon icon={faFloppyDisk}/></button>}
                               {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                               <button onClick={handleCloseInput} className={cx('btn-close')}><FontAwesomeIcon icon={faXmark}/></button>
                               </div>
                                </div>}
                            </div>
                         {i.reply.length !==0 && <div className={cx('comment-item_reply-wrapper')}>
                                 <p><strong>Phản hồi</strong></p>
                                 
                                <ul className={cx('comment-item_reply')}>
                              {i.reply.map((i) => 
                                (
                                   <div className={cx('comment-item_reply_reply-date')}>
                                    <div className={cx('wrapper_date-saler')} > 
                                         <p >Người bán</p>
                                             <p className={cx('comment-item_reply_reply-date_date')}>{i.date}</p>
                                    </div>
                                       <li>{i.value}</li>
                                   </div>
                                  )
                                  )}
                            </ul>
                            </div>} 
                    </div>))
                }
                </div> : (
                    <div className={cx("comments")}>
                        <p><strong>ĐÁNH GIÁ SẢN PHẨM:</strong></p>
                        <p>Chưa có đánh giá sản phẩm</p>
                    </div>
                )}

                    <div className={cx("same_products")} >
                        <div className={cx("same_products__title")} >
                            <h1>sản phẩm tương tự</h1>
                            <p>Các sản phẩm khác được đề xuất dành riêng cho bạn</p>
                        </div>
                    
                    {
                        product?.brand_id && <Carousel_v2 brand={product?.brand_id} setTrigger={setTrigger}/>
                    }
                </div>
                </>
            }
            
           


            </div>


        </div>
    )
}

export default DetailProduct_v2;