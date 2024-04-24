import classNames from "classnames/bind";
import style from "./SignInSignUp.module.scss"

const cx = classNames.bind(style)

function SignInSignUp({children}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("leftSide")}>
                <h1 className={cx("logo")}>
                    <span className={cx('L_1')}>H</span>
                    <span className={cx('L_2')}>A</span>
                    <span className={cx('L_3')}>T</span>
                    <span className={cx('L_4')}>T</span>
                </h1>
                {children}
            </div>
            <div className={cx("rightSide")}>
                {/* <img className={cx("img_bg")} src={require("./WallpaperDog-20517606.png")}/> */}
            </div>
        </div>
    );
}

export default SignInSignUp;