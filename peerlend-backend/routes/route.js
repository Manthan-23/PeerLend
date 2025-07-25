import { Router } from "express";

import * as controller from "../controller/appController.js";


const router = Router();

router.route("/signup").post(
    controller.signupUser
);

router.route("/login").post(
    controller.loginUser    
);

router.route("/login-lend").post(
    controller.loginLend    
);



// GET Methods

router.route('/user/:email').get(
    controller.getUser
);

router.route('/user/pin').put(
    controller.setPin
)

router.route('/user/pin-update').put(
    controller.updatePin
)

router.route("/sendOTP").post(
    controller.sendOTP
);

router.route("/verifyOTP").post(
    controller.verifyOTP
);

router.route("/user/basic-details-lend").put(
    controller.updateBasicDetailsLend
);

router.route("/user/prof-details-lend").put(
    controller.updateProfDetailsLend
);

router.route("/user/lending-details-lend").put(
    controller.updateLendingDetailsLend
);

router.route("/user/profile/:upiId").get(
    controller.getLendProfileDetails
);



export default router;

