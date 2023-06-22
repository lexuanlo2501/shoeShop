import classNames from "classnames/bind";
import style from "./SignInSignUp.module.scss"

const cx = classNames.bind(style)

function SignInSignUp({children}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("leftSide")}>
                <h1 className={cx("logo")}>
                    <span className={cx('L_1')}>C</span>
                    <span className={cx('L_2')}>D</span>
                    <span className={cx('L_3')}>I</span>
                    <span className={cx('L_4')}>O</span>
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