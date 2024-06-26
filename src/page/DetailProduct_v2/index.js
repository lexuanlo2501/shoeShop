import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import SelectActive from '../../components/SelectActive';
import Slider from '../../components/Slider';
import styles from './DetailProduct.module.scss'
import { toast } from 'react-toastify';
import axios from 'axios';
import {priceDiscount, formatPrice, limit} from "../../common"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {  faStar as emptyStar  } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp, faDeleteLeft, faEllipsisVertical, faFloppyDisk, faHeart as faHeartSolid, faPen, faSpinner, faStore, faTrash, faXmark, faStar as starPick  } from '@fortawesome/free-solid-svg-icons';
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
import { Link } from 'react-router-dom';
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
    const [size_Order, setSize_Order] = useState(product_prop?.inventory?.length === 1 ? product_prop?.inventory[0].size : "")
    

    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')

    let isQuickView = Object.keys(product_prop).length
    useEffect(() => {
        const controller = new AbortController()
        if(!isQuickView) {
            axios.get(process.env.REACT_APP_BACKEND_URL+"/shoes/"+paramToObject._id, {signal:controller.signal})
            .then(res => {
                setProduct(res.data)
                setImgMain(res.data.img)
                
                // nếu category = none thì set mặc định (k cần select size khi none size)
                setSize_Order(res.data?.inventory?.length === 1 ? res.data?.inventory[0].size : "")
            })
        }
        else {
            setImgMain(product_prop.img)
        }
        // console.log(paramToObject)

        return () => controller.abort()
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
            // console.log(product_list[indexProd])
            newCart = product_list
        }
        else {
            newCart = [...product_list, productAdd]
        }

        localStorage.setItem('cart', JSON.stringify(newCart));
        // console.log(JSON.parse(product_list))

    }

    // 
    const size_quantiry_select = product?.inventory?.length === 1 ?
    product?.inventory[0].quantity
    :
    product?.inventory?.find(i => i.size === size_Order)?.quantity
    
    let user = JSON.parse(localStorage.getItem('tokens')) || {}

     //comments
     const [comments, setComments] = useState([]);
    useEffect(() =>{
        const controller = new AbortController()

        if(!isQuickView) {
           axios.get(process.env.REACT_APP_BACKEND_URL+`/comments?_productId=${paramToObject._id}`, {signal:controller.signal})
           .then((res)=> {
               setComments(res.data)
               setLoading(false)
               // console.log(product.id)
               // console.log(product)
              
           })
       }
       return () => controller.abort()
    }, [trigger, paramToObject._id])

    //option comment
    const [showoption, setShowoption] = useState(false)
    const [showInput, setShowInput] = useState(false)

    const [saveBtn, setSaveBtn] = useState(true);
    const [valuecomment, setValuecomment] = useState('');
    const [valueAddcomment, setAddValuecomment] = useState('');
    const [admitComment, setAdmitComment] = useState({})
    const [idcomment, setIdcomment] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showAddComment, setShowAddComment] = useState(true);
    const [indexcomment, setIndexComment] = useState(-1);
    const [btnReply, setBtnReply] = useState(true);
    const [inputReply, setInputReply] = useState(false);

    const refinput = useRef();
    const refAddComment = useRef();
    const refInputReply = useRef();

    const handleShowOption = ((idcmt, role, index, accName, value)=> {
       
        // setShowoption(prev => !prev)
        setValuecomment(value)
        setIndexComment(index)
        setIdcomment(idcmt);
      
        if(accName === user.accName && index === indexcomment && idcmt == idcomment ) {
           setShowoption(prev => !prev)
          
        //    alert('ok')
          
        }
        else if (accName === user.accName && idcomment !== idcmt  ) {
            setIdcomment(idcmt);
            setIndexComment(index)
            setShowoption(prev => !prev)
            setValuecomment(value)
            setShowInput(false)

        }
        
       if (role == "admin" ) {
            setIndexComment(index);
            setIdcomment(idcmt);
            
            if(role == "admin" && idcmt == idcomment && index == indexcomment) {
                setShowoption(prev => !prev)
                    setShowInput(false)
                    setValuecomment( value)

            }
            else if (role == "admin" && idcmt!==idcomment && index !== indexcomment) {
                setIndexComment(index);
                setIdcomment(idcmt);
                setShowoption(prev => !prev) 
                setShowInput(false)
                setValuecomment( value)
            }    
        }

    })

    useEffect(() => {
        const controller = new AbortController()

        if(!isQuickView) {
            axios.post(process.env.REACT_APP_BACKEND_URL + `/checkPermitCmt`, {
                product_id: paramToObject._id,
                accName: user.accName
            }, {signal:controller.signal}) 
            .then((res) => {
            //    console.log(res.data)
               setAdmitComment(res.data)
            })
        }

        return () => controller.abort()
    }, [paramToObject._id])

    const  handleChangeComment = ((id_cmt, index) => {

        console.log(id_cmt);
        setShowoption(false);
        
        
        comments.filter(item => {
            if( item.accName == user.accName && item.comment_id == id_cmt)
            {
                setShowInput(prev => !prev)
                setValuecomment(item.value)
            }
       
         return;
      }
    )

         if(user.role == "admin") {
           setIndexComment(index)
            console.log(showoption)
            comments.map((item) => {
                if(id_cmt == item.comment_id && user.role == "admin") {
                
                    setShowInput(prev => !prev)
                    setIdcomment(item.comment_id)
                    setValuecomment(item.value)
                 
                } 
            }) 
          }
    })

    const handleDeleteComment = ((idcomment) => {
        setShowoption(false)

        axios.delete(process.env.REACT_APP_BACKEND_URL+`/comments/${idcomment}`)

        .then(() => {
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
        .then(() => {
            toast.success("Đã xóa bình luận thành công!", {
                autoClose: 2000,
                // theme: "colored",
                theme: "light",
                position: "top-right",
            })
        })
        .catch((error) => {
            console.error(error)
        });
    });

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
       
        setAddValuecomment(refAddComment.current.value)
    });

    const handleAddComment = (() =>  {
    
        if ( numberStar === 0 ) {
            toast.error("Vui lòng đánh giá sao!", {
                autoClose: 2000,
                // theme: "colored",
                theme: "light",
                position: "top-right",
            })
            return;
        }

        if(refAddComment.current.value == '' ) {
            return;
        }
         
        var trimmedStr = refAddComment.current.value.replace(/^\s+|\s+$/g, ' ');
        if(trimmedStr === ' ') {
            return;
        }

        var containsSpecialChars =/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(refAddComment.current.value);
        if(containsSpecialChars) {
            return;
        }

        axios.post(process.env.REACT_APP_BACKEND_URL + `/comments`, {
            value: refAddComment.current.value,
            product_id: paramToObject._id,
            accName: user.accName,
            detailOrderID: admitComment.detailOrder_ID
        })
        .then(res => {
            setTrigger(prev => !prev)
        })
          
        axios.post(process.env.REACT_APP_BACKEND_URL + `/rating`, {
            rating: numberStar,
            detail_order_id: admitComment.detailOrder_ID
        })    
        .then((res) => {
            toast.success(`${res.data}`, {
              autoClose: 2000,
              // theme: "colored",
              theme: "light",
              position: "top-right",
          })
         
            setShowAddComment(prev => !prev)
            setNumberStar(0)

        })
        .catch((error) => {
            console.log(error)
        })
    })


   
    const handleSaveComment = ((idcomment, e) => {
        setLoading(true)
       
       setIdcomment(idcomment)
        axios.patch(process.env.REACT_APP_BACKEND_URL + `/comments/${idcomment}`, {
            value: valuecomment
        })
        .then(()=> {
          
          // console.log(idcomment)
          setTrigger(prev => !prev)
          setLoading(false)
          setShowInput(prev => !prev)
         
        })

    });

    const hanleCloseInput = (() => {
        setShowInput(prev => !prev)
    })

    const handleReply = ((id_cmt, seller_id, accName) => {
        if(user.role =="admin") {
          setIdcomment(id_cmt)
          setBtnReply(prev => !prev);
          setInputReply(prev => !prev);
      }

      else if (accName == seller_id) {
        setBtnReply(prev => !prev);
        setInputReply(prev => !prev);
        setIdcomment(id_cmt)
      }       

    })

    const handleSendReply = ((id_cmt) => {

        if(refInputReply.current.value == '') {
           
            return;
        }
         
        var trimmedStr = refInputReply.current.value.replace(/^\s+|\s+$/g, ' ');
        if(trimmedStr === ' ') {
            
            return;
        }

        var containsSpecialChars =/[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/]+/.test(refInputReply.current.value);
        if(containsSpecialChars) {
           
            return;
        }

        axios.post( process.env.REACT_APP_BACKEND_URL + `/replycomments`, {
            value: refInputReply.current.value,
            comment_id: id_cmt,
         })

       .then (() => {
         setTrigger(prev => !prev);
         refInputReply.current.value = '';

         toast.success("Đã gửi phản hồi thành công!", {
            autoClose: 2000,
            // theme: "colored",
            theme: "light",
            position: "top-right",
        })
       })

    });

    const [numberStar, setNumberStar] = useState(0)
    let arrStar = [1,2,3,4,5]

    const handleDelReply = ((id_cmt) => {
        axios.delete( process.env.REACT_APP_BACKEND_URL + `/replycomments/${id_cmt}`)
        .then(() => {
            setTrigger(prev => !prev)
            toast.success("Đã xóa phản hồi thành công!", {
                autoClose: 2000,
                // theme: "colored",
                theme: "light",
                position: "top-right",
            })
        })
    })

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
                                <div className={cx("status_product")} style={{margin: "13px 0px"}}>
                                    <p>Mã Sản Phẩm: <strong>{product.id}</strong></p>
                                    <p>Đã Bán: <strong>{product.sold}</strong></p>
                                    <p>Tình Trạng: <strong>Còn hàng</strong></p>
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
                                {
                                    // size = none thì không cần show size để select
                                    product?.inventory?.length !== 1
                                    && 
                                    <>
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
                                    </>
                                }
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
                                        console.log(size_Order)
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
                                            if(product?.inventory.length !== 1) {
                                                toast.error("Vui lòng chọn size", {
                                                    autoClose: 2000,
                                                    theme: "colored",
                                                    position: "bottom-right",
                                                })
                                            }
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
                                {
                                    product.seller_id
                                    &&
                                    <>
                                        <div className={cx(["line"])}></div>
                                        <div className={cx("infor_seller")}>
                                            <AvatarAuto nameU={product.seller_id}/>
                                            <div className={cx("go_to_shop")}>
                                                <p>{product.sellerName}</p>
                                                {/* _page=1&_limit=16&_sellerID=lelolo123 */}
                                                <Link to={`/saleHome?_page=1&_limit=${limit}&_sellerID=${product.seller_id}`} onClick={() => {window.scrollTo(0, 0)}}><FontAwesomeIcon icon={faStore}/>Xem Shop</Link>
                                            </div>
                                            <div className={cx("asign_quantity")}>
                                                <p><span>Đánh Giá</span>:</p>
                                                <p><span>Sản Phẩm</span>: {product.amountProdStore}</p>
                                            </div>
                                        </div>
                                    </>
                                }

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
                     <input value={valueAddcomment} ref={refAddComment} onChange={handleOnchageAddComment}/>
                 <button onClick={handleAddComment} className={cx('comments_add-comment-btn')} >Gửi Bình Luận</button>
                    </div>}
                   { admitComment.status == true && showAddComment && <div className={cx("stars")}>
                    {
                        arrStar.map(i => (
                            <FontAwesomeIcon key={i} className={cx("star",{"check":numberStar>=i})} icon={starPick}
                                onClick={() => {
                                        setNumberStar(i)
                                }}
                            />
                        ))
                    }
                    </div>}
                {
                    comments.map((i,index) =>
                     (<div className={cx('comment-item')} key={i.comment_id}>
                       <div className={cx('comment-item_info-user-comment')}>
                        <div className={cx('comment-item_info-user-comment_avatar-name')}>
                            <AvatarAuto nameU={i.fullName}/>

                            <div className={cx('wrapper_star-name')}>
                                <p className={cx('name')}> {i.fullName} </p>

                               
                              { i.rating == 1  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              
                              </div>}
                              {i.rating == 2  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              </div>}

                              { i.rating == 3  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
                              </div>}

                              { i.rating == 4  && <div className={cx('wrapper-star')}> <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-pick')}  icon={starPick} />
                              <FontAwesomeIcon className={cx('star-empty')}  icon={emptyStar} />
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
                            
                           {user.accName==i.accName && user.role !== "admin" && 
                           <Tippy
                           visible={showoption}
                           placement='right'
                           interactive={true}
                           zIndex={0}
                           render={attrs => showoption && idcomment == i.comment_id &&
                             <div className={cx('option')}tabIndex="-1" {...attrs}>
                              <button onClick={ () => handleChangeComment(i.comment_id, index)
                            }
                            
                            ><FontAwesomeIcon icon={faPen}/></button>
                              <button onClick={() =>handleDeleteComment(i.comment_id)}><FontAwesomeIcon icon={faDeleteLeft}/></button>

                             </div>
                           }
                         >
                           <button
                           onClick={ () =>  handleShowOption(i.comment_id, user.role, index, i.accName, i.value)
                        } className={cx('btn-option')}><FontAwesomeIcon icon={faEllipsisVertical}/>
                         </button>
                         </Tippy>
                           }

                           {user.role == "admin" && <Tippy
                           visible={showoption}
                           placement='right'
                           interactive={true}
                           zIndex={0}
                           render={attrs => (showoption &&  user.role == "admin"  && index == indexcomment && idcomment == i.comment_id &&
                             <div className={cx('option')} tabIndex="-1" {...attrs}>
                              <button onClick={ () => handleChangeComment(i.comment_id, index)
                            }
                            
                            ><FontAwesomeIcon icon={faPen}/></button>
                              <button onClick={() =>handleDeleteComment(i.comment_id)}><FontAwesomeIcon icon={faDeleteLeft}/></button>

                             </div>
                           )}
                         >
                           <button onClick={ () =>  handleShowOption(i.comment_id, user.role, index)
                           
                        } className={cx('btn-option')}><FontAwesomeIcon icon={faEllipsisVertical}/>
                         </button>
                         </Tippy>}
                          
                            </p>
                        
                                {!showInput &&<p className={cx('comment-item_info-user-comment_date-coment-comment')}> {i.value} </p>}
                                {showInput && i.comment_id!==idcomment  && user.role !=="admin" && <p className={cx('comment-item_info-user-comment_date-coment-comment')}> {i.value} </p>}
                                {showInput && i.comment_id!==idcomment  && user.role =="admin" && <p className={cx('comment-item_info-user-comment_date-coment-comment')}> {i.value} </p> }
                                {showInput && user.accName==i.accName && i.comment_id == idcomment   &&  
                                <div className={cx('wrapper_edit-comment')}>{<input  onChange={handleOnchange} ref={refinput} value={valuecomment}/>}
                               <div className={cx('wrapper-btn-input')}> {!loading && saveBtn &&<button  onClick={ ()=>handleSaveComment(i.comment_id)} className={cx('btn-save')}><FontAwesomeIcon icon={faFloppyDisk}/></button>}
                               {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                              <button onClick={hanleCloseInput} className={cx('btn-close')}> <FontAwesomeIcon icon = {faXmark}/> </button>
                               </div>
                                </div>}

                                { showInput && user.role=="admin" && indexcomment== index &&  <div style={{display:'flex', flexDirection:'column'}}>{<input  onChange={handleOnchange} ref={refinput} value={valuecomment}/>}
                               <div className={cx('wrapper-btn-input')}> {!loading && saveBtn &&<button onClick={ ()=>handleSaveComment(i.comment_id)} className={cx('btn-save')}><FontAwesomeIcon icon={faFloppyDisk}/></button>}
                               {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                              <button onClick={hanleCloseInput} className={cx('btn-close')}> <FontAwesomeIcon icon = {faXmark}/> </button>
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
                                    
                                       <div className={cx('wrapper_value-reply-del-btn')}>
                                           <li>{i.value}</li>
                                           { user.role == "admin" &&  <button onClick={()=>{handleDelReply(i.id)}} className={cx('btn-del-reply')}><FontAwesomeIcon icon={faTrash} /></button>}
   
                                           {
                                            user.accName == product.seller_id &&<button onClick={()=>{handleDelReply(i.id)}} className={cx('btn-del-reply')}><FontAwesomeIcon icon={faTrash} /></button>
                                           }

                                       </div>
                                       
                                   </div>
                                  )
                                  )}
                            </ul>
                            
                            </div>} 

                            <div className={cx('wrapper_reply')}>
                               {inputReply && idcomment == i.comment_id && user.accName == product.seller_id  && <div className={cx('wrapper-input-send-btn')}> 
                                  <input ref={refInputReply} className={cx('input-reply')} />
    
                                     <button onClick= {() => {handleSendReply(i.comment_id)}} className={cx('btn-send-reply')}>Gửi</button>
                               </div>}

                               {inputReply && idcomment == i.comment_id && user.role == "admin" && <div className={cx('wrapper-input-send-btn')}> 
                                  <input ref={refInputReply} className={cx('input-reply')} />
    
                                     <button onClick= {() => {handleSendReply(i.comment_id)}} className={cx('btn-send-reply')}>Gửi</button>
                               </div>}

                                                 {btnReply && user.role == "admin"  && <button onClick={()=>handleReply(i.comment_id, product.seller_id, i.accName)} className={cx('btn_reply')}><strong>Trả lời</strong></button>}

                                                 {!btnReply && user.role == "admin" && i.comment_id!==idcomment&& <button onClick={()=>handleReply(i.comment_id)} className={cx('btn_reply')}><strong>Trả lời</strong></button>}

                                                
                                                 {
                                                    btnReply && user.accName == product.seller_id&& <button onClick={()=>handleReply(i.comment_id)} className={cx('btn_reply')}><strong>Trả lời</strong></button>
                                                 }

                                                {
                                                   !btnReply && user.accName == product.seller_id&& i.comment_id !== idcomment && <button onClick={()=>handleReply(i.comment_id)} className={cx('btn_reply')}><strong>Trả lời</strong></button>
                                                 }
                                         
                            </div>

                    </div>))
                }
                </div> : (
                    <div className={cx("comments")}>
                        <p><strong>ĐÁNH GIÁ SẢN PHẨM:</strong></p>
                        {admitComment.status == true && showAddComment &&
                   <div className={cx('comments_add-comment')}>
                     <input value={valueAddcomment} ref={refAddComment} onChange={handleOnchageAddComment}/>
                 <button onClick={handleAddComment} className={cx('comments_add-comment-btn')} >Gửi Bình Luận</button>
                    </div>}

                    { admitComment.status == true && showAddComment && <div className={cx("stars")}>
                    {
                        arrStar.map(i => (
                            <FontAwesomeIcon key={i} className={cx("star",{"check":numberStar>=i})} icon={starPick}
                                onClick={() => {
                                        setNumberStar(i)
                                }}
                            />
                        ))
                    }
                    </div>}

                        <p>Chưa có đánh giá sản phẩm</p>
                    </div>
                )}

                    <div className={cx("same_products")} >
                        <div className={cx("same_products__title")} >
                            <h1>sản phẩm tương tự</h1>
                            <p>Các sản phẩm khác được đề xuất dành riêng cho bạn</p>
                        </div>
                    
                    {
                        product?.brand_id && <Carousel_v2 brand={product?.brand_id} categoryID={product?.categoryID}  setTrigger={setTrigger}/>
                    }
                </div>
                </>
            }

            </div>


        </div>
    )
}

export default DetailProduct_v2;